import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
    @ApiProperty({example: 'Jhoantas', description: 'Nome do usuário'})
    readonly name: string;
    @ApiProperty({example: 'senha1234', description: 'Senha do usuário'})
    readonly password: string;
    @ApiProperty({example: 'jhon123@mail.com', description: 'Nome do usuário'})
    readonly email: string;
    @ApiProperty({example: 'Pleno', description: 'Senioridade do usuário'})
    readonly seniority: string;
    @ApiProperty({example: 24, description: 'Idade do usuário'})
    readonly age: number;
    @ApiProperty({example: {
        name: 'React',
        knowledge: 'Basic'
    }, description: 'Tecnologias que o usuário domina e seus níveis de conhecimento'})
    readonly technologies: Technologie[];
}

export interface Technologie {
    readonly name: string,
    readonly knowledge: string
}