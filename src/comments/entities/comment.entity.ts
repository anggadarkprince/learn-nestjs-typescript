import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '../../users/entities/user.entity';
import Post from '../../posts/entities/post.entity';

@Entity({name: "comments"})
class Comment {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public content: string;

    @ManyToOne(() => Post, (post: Post) => post.comments)
    public post: Post;

    @ManyToOne(() => User, (author: User) => author.posts)
    public author: User;
}

export default Comment;