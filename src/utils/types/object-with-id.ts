import { IsNumber } from 'class-validator';

class ObjectWithId {
    @IsNumber()
    id: number;
}

export default ObjectWithId;