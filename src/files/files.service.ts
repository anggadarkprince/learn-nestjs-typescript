import {Injectable, NotFoundException} from '@nestjs/common';
import {v4 as uuid} from 'uuid';
import {InjectRepository} from "@nestjs/typeorm";
import PublicFile from "./entities/public-file.entity";
import {QueryRunner, Repository} from "typeorm";
import {ConfigService} from "@nestjs/config";
import * as S3 from 'aws-sdk/clients/s3';
import PrivateFile from "./entities/private-file.entity";

@Injectable()
export class FilesService {
    private readonly s3;

    constructor(
        @InjectRepository(PublicFile)
        private publicFilesRepository: Repository<PublicFile>,
        @InjectRepository(PrivateFile)
        private privateFilesRepository: Repository<PrivateFile>,
        private readonly configService: ConfigService
    ) {
        this.s3 = new S3({
            endpoint: this.configService.get('S3_ENDPOINT'),
            accessKeyId: this.configService.get('S3_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
            region: this.configService.get('S3_DEFAULT_REGION'),
        });
    }

    async uploadPublicFile(dataBuffer: Buffer, filename: string) {
        const uploadResult = await this.s3.upload({
            Bucket: this.configService.get('S3_BUCKET'),
            Body: dataBuffer,
            Key: `${uuid()}-${filename}`,
            ACL: 'public-read',
        }).promise();

        const newFile = this.publicFilesRepository.create({
            key: uploadResult.Key,
            url: uploadResult.Location
        });
        await this.publicFilesRepository.save(newFile);
        return newFile;
    }

    async deletePublicFile(fileId: number) {
        const file = await this.publicFilesRepository.findOne({id: fileId});
        await this.s3.deleteObject({
            Bucket: this.configService.get('S3_BUCKET'),
            Key: file.key,
        }).promise();
        await this.publicFilesRepository.delete(fileId);
    }

    async deletePublicFileWithQueryRunner(fileId: number, queryRunner: QueryRunner) {
        const file = await queryRunner.manager.findOne(PublicFile, {id: fileId});
        const s3 = new S3();
        await s3.deleteObject({
            Bucket: this.configService.get('S3_BUCKET'),
            Key: file.key,
        }).promise();
        await queryRunner.manager.delete(PublicFile, fileId);
    }

    async uploadPrivateFile(dataBuffer: Buffer, ownerId: number, filename: string) {
        const uploadResult = await this.s3.upload({
            Bucket: this.configService.get('S3_BUCKET'),
            Body: dataBuffer,
            Key: `${uuid()}-${filename}`,
            ACL: 'private'
        }).promise();

        const newFile = this.privateFilesRepository.create({
            key: uploadResult.Key,
            owner: {
                id: ownerId
            }
        });
        await this.privateFilesRepository.save(newFile);
        return newFile;
    }

    public async getPrivateFile(fileId: number) {
        const fileInfo = await this.privateFilesRepository.findOne({id: fileId}, {relations: ['owner']});
        if (fileInfo) {
            const stream = await this.s3.getObject({
                Bucket: this.configService.get('S3_BUCKET'),
                Key: fileInfo.key
            }).createReadStream();

            return {
                stream,
                info: fileInfo,
            }
        }
        throw new NotFoundException();
    }

    public async generatePresignedUrl(key: string) {
        return this.s3.getSignedUrlPromise('getObject', {
            Bucket: this.configService.get('S3_BUCKET'),
            Key: key,
            Expires: 60 * 60 * 24
        })
    }
}
