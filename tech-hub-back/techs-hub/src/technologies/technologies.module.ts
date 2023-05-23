import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { technologiesProviders } from "./technologies.providers";
import { TechnologiesService } from "./technologies.service";





@Module({
    imports: [DatabaseModule],
    controllers: [

    ],
    providers: [
        ...technologiesProviders,
        TechnologiesService
    ],
    exports:[
        ...technologiesProviders,
        TechnologiesService
    ]
})
export class TechnologiesModule { }