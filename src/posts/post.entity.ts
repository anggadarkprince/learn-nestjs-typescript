import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Transform} from "class-transformer";
import User from "../users/entities/user.entity";
import Category from "../categories/entities/category.entity";

@Entity({name: 'posts'})
class Post {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public title: string;

    @Column()
    public content: string;

    @Column({ nullable: true })
    @Transform(({value}) => {
        if (value !== null) {
            return value;
        }
    })
    public category?: string;

    @ManyToOne(() => User, (author: User) => author.posts)
    @JoinColumn({ name: "author_id" })
    public author: User;

    @ManyToMany(() => Category, (category: Category) => category.posts)
    @JoinTable({
        name: "post_categories",
        joinColumn: {
            name: "post_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "category_id",
            referencedColumnName: "id"
        }
    })
    public categories: Category[];
}

export default Post;