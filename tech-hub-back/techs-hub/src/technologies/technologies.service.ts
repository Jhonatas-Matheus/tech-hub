import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { Technologie } from "src/users/interfaces/user.interface";
import { CreateTechnologieDto } from "./dto/creaete.technologie.dto";


@Injectable()
export class TechnologiesService {
    constructor(
        @Inject('TECH_MODEL')
        private techModel: Model<Technologie>
    ){}
    async createTechnologies (createTechnologieDto: CreateTechnologieDto) {
        const createdTechnologie = new this.techModel(createTechnologieDto)
        return createdTechnologie.save()
    }
    async excludeTechnologie (technologieId: string, userId: string){
        const currentTech = await this.techModel.findById(technologieId).populate('user')
            if(!currentTech){
                throw new NotFoundException()
            }
            if(currentTech.get('user').id === userId){
                await this.techModel.findByIdAndDelete(technologieId)
            }
    }
}