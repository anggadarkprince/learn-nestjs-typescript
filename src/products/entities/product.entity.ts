import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import ProductCategory from '../../product-categories/entities/product-category.entity';
import { CarProperties } from '../types/car-properties.interface';
import { BookProperties } from '../types/book-properties.interface';

@Entity({name: 'products'})
class Product {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @ManyToOne(() => ProductCategory, (category: ProductCategory) => category.products)
    public category: ProductCategory;

    @Column({
        type: 'json'
    })
    public properties: CarProperties | BookProperties;
}

export default Product;