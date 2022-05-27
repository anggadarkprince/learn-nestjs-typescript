import {Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors} from '@nestjs/common';
import {ProductsService} from "./products.service";
import JwtAuthenticationGuard from "../authentication/guards/jwt-authentication.guard";
import CreateProductDto from "./dto/create-product.dto";

@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) {
    }

    @Get()
    getAllProducts() {
        return this.productsService.getAllProducts();
    }

    @Post()
    @UseGuards(JwtAuthenticationGuard)
    async createProduct(@Body() product: CreateProductDto) {
        return this.productsService.createProduct(product);
    }
}
