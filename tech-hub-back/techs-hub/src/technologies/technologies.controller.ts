import { Controller, Post } from "@nestjs/common";
import { TechnologiesService } from "./technologies.service";
import { CreateTechnologieDto } from "./dto/creaete.technologie.dto";




@Controller('tech')
export class TechnologiesController{
    constructor(
        private technologiesService: TechnologiesService
    ){}
    @Post()
    async createTechnologie (createTechnologieDto: CreateTechnologieDto){
        const technologieCreated = await this.technologiesService.createTechnologies(createTechnologieDto)
        return technologieCreated
    }
}