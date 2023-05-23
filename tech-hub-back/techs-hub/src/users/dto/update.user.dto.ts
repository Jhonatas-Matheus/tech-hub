export class UpdateUserDto {
    readonly name: string | undefined;
    readonly password: string | undefined;
    readonly email: string | undefined;
    readonly seniority: string | undefined;
    readonly age: number | undefined;
    readonly technologies: Technologie[] | undefined;
}
export interface Technologie {
    readonly name: string,
    readonly knowledge: string
}