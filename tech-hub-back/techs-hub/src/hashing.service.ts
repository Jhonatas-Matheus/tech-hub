import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
@Injectable()
export class HashingHelper{
    async hashData(data: string, salt: number): Promise<string>{
        return bcrypt.hash(data,salt)
    }
    async compareData(plainData:string, hashData:string): Promise<boolean>{
        return bcrypt.compare(plainData, hashData)
    }
}