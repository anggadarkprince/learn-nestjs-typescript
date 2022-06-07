import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import Category from "./entities/category.entity";
import {Repository} from "typeorm";
import CategoryNotFoundException from "./exceptions/category-not-found.exception";
import CreateCategoryDto from "./dto/create-category.dto";
import UpdateCategoryDto from "./dto/update-category.dto";

@Injectable()
export class CategoriesService {
    /**
     * Not presented in documentation.
     *
     * @ignore
     */
    constructor(@InjectRepository(Category) private categoriesRepository: Repository<Category>) {
    }

    /**
     * A method that fetches the categories from the database.
     *
     * @returns A promise with the list of categories
     */
    getAllCategories() {
        return this.categoriesRepository.find({relations: ['posts']});
    }

    /**
     * A method that fetches a category with a given id. Example:
     * @example
     * const category = await categoriesService.getCategoryById(1);
     */
    async getCategoryById(id: number) {
        const category = await this.categoriesRepository.findOne(id, {
            relations: ['posts'],
            withDeleted: true
        });
        if (category) {
            return category;
        }
        throw new CategoryNotFoundException(id);
    }

    async createCategory(category: CreateCategoryDto) {
        const newCategory = await this.categoriesRepository.create(category);
        await this.categoriesRepository.save(newCategory);
        return newCategory;
    }

    /**
     * See the [definition of the UpdateCategoryDto file]{@link UpdateCategoryDto} to see a list of required properties.
     */
    async updateCategory(id: number, category: UpdateCategoryDto) {
        await this.categoriesRepository.update(id, category);
        const updatedCategory = await this.categoriesRepository.findOne(id, {relations: ['posts']});
        if (updatedCategory) {
            return updatedCategory
        }
        throw new CategoryNotFoundException(id);
    }

    /**
     * A method that deletes a category from the database.
     *
     * @param id An id of a category. A category with this id should exist in the database
     */
    async deleteCategory(id: number) {
        const deleteResponse = await this.categoriesRepository.softDelete(id);
        if (!deleteResponse.affected) {
            throw new CategoryNotFoundException(id);
        }
    }

    /**
     * @deprecated Use deleteCategory instead
     */
    async deleteCategoryById(id: number): Promise<void> {
        return this.deleteCategory(id);
    }

    async restoreDeletedCategory(id: number) {
        const restoreResponse = await this.categoriesRepository.restore(id);
        if (!restoreResponse.affected) {
            throw new CategoryNotFoundException(id);
        }
    }
}
