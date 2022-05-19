import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn, OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {Exclude} from "class-transformer";
import Address from "./address.entity";
import Post from "../../posts/post.entity";
import PublicFile from "../../files/entities/public-file.entity";
import PrivateFile from "../../files/entities/private-file.entity";

@Entity({name: 'users'})
class User {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({ unique: true })
    public email: string;

    @Column()
    public name: string;

    @Column()
    @Exclude()
    public password: string;

    @Column({ name: "phone_number", nullable: true })
    public phoneNumber?: string;

    @JoinColumn()
    @OneToOne(() => PublicFile, {
        eager: true,
        nullable: true
    })
    public avatar?: PublicFile;

    @OneToOne(() => Address, {
        eager: true, // duplicate alias relation address_id need to be change another or using strategy
        cascade: true
    })
    @JoinColumn({ name: "address_id" })
    public address: Address;

    @OneToMany(() => Post, (post: Post) => post.author)
    public posts?: Post[];

    @OneToMany(() => PrivateFile, (file: PrivateFile) => file.owner)
    public files?: PrivateFile[];

    @CreateDateColumn({name: 'created_at'})
    created_at: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updated_at: Date;
}

export default User;