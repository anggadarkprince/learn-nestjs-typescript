import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'logs'})
class Log {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public context: string;

    @Column({type: "text"})
    public message: string;

    @Column()
    public level: string;

    @CreateDateColumn()
    creationDate: Date;
}

export default Log;