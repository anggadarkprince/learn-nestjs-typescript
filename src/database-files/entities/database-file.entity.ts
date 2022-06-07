import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'database_files'})
class DatabaseFile {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    filename: string;

    @Column({type: 'blob'})
    data: Uint8Array;
}

export default DatabaseFile;