import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity({name: 'users'})
class User {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({ unique: true })
    public email: string;

    @Column()
    public name: string;

    @Column()
    public password: string;

    @Column({ nullable: true })
    public phoneNumber?: string;

    @CreateDateColumn({name: 'created_at'})
    created_at: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updated_at: Date;
}

export default User;