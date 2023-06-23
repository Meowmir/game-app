import mongoose, { Model, Types } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from '../schemas/cat.schema';
import { CreateCatDto, updateCatDto } from '../dto/create-cat.dto';
import { Owner } from '../schemas/owner.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}
  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(name?: string): Promise<Cat[]> {
    const filters = name ? { name: { $regex: name } } : {};

    return this.catModel.find(filters).populate('owner').exec();
  }

  async getCat(catID: string): Promise<Cat> {
    const foundCat = await this.catModel.findById(catID);
    if (!foundCat) {
      throw new BadRequestException(`Invalid ID ${catID}`);
    }
    return foundCat;
  }

  async editCat(catID: string, update: updateCatDto): Promise<Cat> {
    await this.catModel.findByIdAndUpdate(catID, update);
    return this.getCat(catID);
  }

  async deleteCat(catID: string): Promise<Cat> {
    const foundCat = await this.catModel.findByIdAndDelete(catID);
    if (!foundCat) {
      throw new NotFoundException(`Invalid ID ${catID}`);
    }
    return foundCat;
  }
}
