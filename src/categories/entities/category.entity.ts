import {Column, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import Post from "../../posts/entities/post.entity";

@Entity({name: 'categories'})
class Category {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @ManyToMany(() => Post, (post: Post) => post.categories)
    public posts: Post[];

    @DeleteDateColumn()
    public deletedAt: Date;
}

export default Category;