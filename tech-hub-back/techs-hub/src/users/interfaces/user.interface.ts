import { Document } from "mongoose"
// import { ApiProperty } from '@nestjs/swagger';




export interface User extends Document {
    // @ApiProperty({example: 'Jhoantas', description: 'Nome do usuário'})
    name: string;
    password: string;
    email: string;
    seniority: string;
    age: string;
    technologies: Technologie[];
}

export interface Technologie extends Document {
    name: string,
    knowledge: string
}