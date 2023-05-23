import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Technologie, User } from "./interfaces/user.interface";
import { CreateUserDto } from "./dto/create.user.dto";
import { HashingHelper } from "src/hashing.service";
import { UpdateUserDto } from "./dto/update.user.dto";
import { TechnologiesService } from "src/technologies/technologies.service";
import { CreateTechnologieDto } from "src/technologies/dto/creaete.technologie.dto";


@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<User>,
        private hashing: HashingHelper,
        private technologiesService: TechnologiesService
    ){}
    async create(createUserDto: CreateUserDto): Promise<User>{
        const userFound = await this.findOneByEmail(createUserDto.email)
        if(userFound){
            throw new ConflictException('Email already exists.')
        }
        createUserDto = {...createUserDto, password: await this.hashing.hashData(createUserDto.password,9)}
        const {technologies, ...rest} = createUserDto
        const userCreated = await this.userModel.create(rest)
        await Promise.all( createUserDto.technologies.map(async (tech)=>{
            const currentTech = await this.technologiesService.createTechnologies({...tech, user: userCreated._id});
            userCreated.technologies.push(currentTech)
        }))
        const userSaved = await userCreated.save()
        return userSaved
    }
    async updateProfileInfo(userId: string, updateUserDto: UpdateUserDto){
        const updatedUser = await this.userModel.findByIdAndUpdate(userId,updateUserDto,{new: true})
        return updatedUser
    }
    async addTechnologie(userID: string, createTechnologieDto:CreateTechnologieDto){
        const currentUser = await this.userModel.findByIdAndUpdate(userID)
        const currentTech = await this.technologiesService.createTechnologies(createTechnologieDto)
        currentUser.technologies.push(currentTech)
        return await currentUser.save()
    }
    async removeTechnologie(techId: string, userId:string){
        const currentUser = await this.userModel.findByIdAndUpdate(userId).populate('technologies')
        const currentUserTechs = currentUser.get('technologies')
        const filtredTechs = currentUserTechs.filter((tech)=> tech.id !== techId)
        currentUser.technologies = filtredTechs
        currentUser.save()
        await this.technologiesService.excludeTechnologie(techId, userId)
    }
    async findAll(): Promise<User[]> {
        return this.userModel.find().populate('technologies')
    }
    async findOneByEmail(email:string): Promise<User | undefined>{
        const userFound = await this.userModel.findOne({email: email})
        return userFound
    }
    async findAllWithFillter(filter:string) : Promise<User[]>{
        return this.userModel.find({'technologies.name': filter})
    }
}