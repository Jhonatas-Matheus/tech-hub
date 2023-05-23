import { Body, Controller, Delete, Get, Patch, Post, Query, Req, Request, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create.user.dto";
import { User } from "./interfaces/user.interface";
import {
    ApiOperation,
    ApiResponse,
  } from '@nestjs/swagger';
import { UserSchema } from "./schemas/user.schema";
import { Model } from "mongoose";
import { AuthGuard } from "src/auth/auth.guard";
import { UpdateUserDto } from "./dto/update.user.dto";
import { CreateTechnologieDto } from "src/technologies/dto/creaete.technologie.dto";




@Controller('user')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 201, description: 'User created.', type: CreateUserDto })
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto)
    }
    @UseGuards(AuthGuard)
    @Get()
    async findAll(@Query() technologie: any): Promise<User[]> {
        if(Object.entries(technologie).length === 0){
            return this.usersService.findAll();
        }else{
            return this.usersService.findAllWithFillter(technologie.technologie)
        }
    }
    @UseGuards(AuthGuard)
    @Post('tech')
    async addTechnologie(@Body() createTechnologieDto:CreateTechnologieDto, @Request() req){
        const {sub: id} = req.user
        createTechnologieDto = {...createTechnologieDto, user: id}
        return this.usersService.addTechnologie(id, createTechnologieDto)
    }
    @UseGuards(AuthGuard)
    @Delete('tech/:id')
    async removeTechnologie(@Request() req){
        const {id: idTech} = req.params
        const {sub: idUser} = req.user
        this.usersService.removeTechnologie(idTech, idUser)
    }
    @UseGuards(AuthGuard)
    @Patch()
    async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto){
        const {sub: userId} = req.user
        const response = await this.usersService.updateProfileInfo(userId, updateUserDto)
        return response
    }
}