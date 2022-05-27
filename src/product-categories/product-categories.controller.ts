import {Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors} from '@nestjs/common';
import {ProductCategoriesService} from "./product-categories.service";
import JwtAuthenticationGuard from "../authentication/guards/jwt-authentication.guard";
import CreateProductCategoryDto from "./dto/create-product-category.dto";

@Controller('product-categories')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductCategoriesController {
    constructor(private readonly productsService: ProductCategoriesService) {
    }

    @Get()
    getAllProducts() {
        return this.productsService.getAllProductCategories();
    }

    @Post()
    @UseGuards(JwtAuthenticationGuard)
    async createProduct(@Body() productCategory: CreateProductCategoryDto) {
        return this.productsService.createProductCategory(productCategory);
    }
}
