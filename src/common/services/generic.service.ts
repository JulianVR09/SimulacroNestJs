import { Injectable, NotFoundException } from "@nestjs/common";
import { Document, Model } from "mongoose";

@Injectable()
export class GenericService <T extends Document>{
    constructor(private readonly model: Model<T>){}

    async create(createDto: Partial<T>): Promise<T> {
        return await this.model.create(createDto);
    };

    async findAll(): Promise<T[]> {
        return await this.model.find().exec();
    };

    async findById(id: string): Promise<T>{
        const element = await this.model.findById(id).exec();
        if(!element){
            throw new NotFoundException(`Element with id ${id} not found`);
        }
        return element;
    }

    async updateById(id: string, updateDto: Partial<T>): Promise<T>{
        const elementUpdate = await this.model.findByIdAndUpdate(id, updateDto, {new: true}).exec();
        if(!elementUpdate){
            throw new NotFoundException(`Element with id ${id} not found`);
        }
        return elementUpdate;
    }

    async deleteById(id: string): Promise<T>{
        const elementDelete = await this.model.findByIdAndDelete(id).exec();
        if(!elementDelete){
            throw new NotFoundException(`Element with id ${id} not found`);
        }
        return elementDelete;
    }
}