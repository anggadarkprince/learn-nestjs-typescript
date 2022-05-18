import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import User from "./entities/user.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import CreateUserDto from "./dto/create-user.dto";
import {FilesService} from "../files/files.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly filesService: FilesService
    ) {}

    async getById(id: number) {
        const user = await this.usersRepository.findOne({ id });
        if (user) {
            return user;
        }
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }

    async getByEmail(email: string) {
        const user = await this.usersRepository.findOne({ email });
        if (user) {
            return user;
        }
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }

    async create(userData: CreateUserDto) {
        const newUser = await this.usersRepository.create(userData);
        await this.usersRepository.save(newUser);
        return newUser;
    }

    async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
        const user = await this.getById(userId);
        if (user.avatar) {
            await this.usersRepository.update(userId, {
                ...user,
                avatar: null
            });
            await this.filesService.deletePublicFile(user.avatar.id);
        }
        const avatar = await this.filesService.uploadPublicFile(imageBuffer, filename);
        await this.usersRepository.update(userId, {
            ...user,
            avatar
        });
        return avatar;
    }

    async deleteAvatar(userId: number) {
        const user = await this.getById(userId);
        const fileId = user.avatar?.id;
        if (fileId) {
            await this.usersRepository.update(userId, {
                ...user,
                avatar: null
            });
            await this.filesService.deletePublicFile(fileId)
        }
    }
}
