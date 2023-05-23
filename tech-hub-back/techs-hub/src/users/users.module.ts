import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { usersProviders } from "./users.providers";
import { HashingHelper } from "src/hashing.service";
import { TechnologiesService } from "src/technologies/technologies.service";
import { TechnologiesModule } from "src/technologies/technologies.module";





@Module({
    imports: [DatabaseModule, TechnologiesModule],
    controllers: [UsersController],
    providers: [
        UsersService,
        ...usersProviders,
        HashingHelper,
    ],
    exports:[UsersService, HashingHelper]
})
export class UsersModule { }