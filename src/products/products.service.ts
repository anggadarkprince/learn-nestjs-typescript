import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import Product from "./entities/product.entity";
import {Repository} from "typeorm";
import CreateProductDto from "./dto/create-product.dto";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>
    ) {
    }

    getAllProducts() {
        return this.productsRepository.find();
    }

    async createProduct(product: CreateProductDto) {
        const newProduct = await this.productsRepository.create(product);
        await this.productsRepository.save(newProduct);
        return newProduct;
    }
}
