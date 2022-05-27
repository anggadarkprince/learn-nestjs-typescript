import {
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import {Transform} from "class-transformer";
import User from "../../users/entities/user.entity";
import Category from "../../categories/entities/category.entity";
import Comment from "../../comments/entities/comment.entity";

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

    @Index('post_authorId_index')
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

    @OneToMany(() => Comment, (comment: Comment) => comment.post)
    public comments?: Comment[];
}

export default Post;