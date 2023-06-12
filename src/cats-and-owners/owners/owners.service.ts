import { Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Owner } from '../schemas/owner.schema';
import { CreateOwnerDto, updateOwnerDto } from '../dto/create-owner.dto';
import { Cat } from '../schemas/cat.schema';
import { updateCatDto } from '../dto/create-cat.dto';

@Injectable()
export class OwnersService {
  constructor(@InjectModel(Owner.name) private ownerModel: Model<Owner>) {}
  async create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    const createdOwner = new this.ownerModel(createOwnerDto);

    await createdOwner.validate();

    return createdOwner.save();
  }

  async findAll(): Promise<Owner[]> {
    return this.ownerModel.find().exec();
  }

  async getOwner(ownerID: string): Promise<Owner> {
    const foundOwner = await this.ownerModel.findById(ownerID);
    if (!foundOwner) {
      throw new BadRequestException(`Invalid ID ${ownerID}`);
    }
    return foundOwner;
  }

  async editOwner(ownerID: string, update: updateOwnerDto): Promise<Owner> {
    await this.ownerModel.findByIdAndUpdate(ownerID, update);
    return this.getOwner(ownerID);
  }

  async deleteOwner(ownerID: string): Promise<Owner> {
    const foundOwner = await this.ownerModel.findByIdAndDelete(ownerID);
    if (!foundOwner) {
      throw new NotFoundException(`Invalid ID ${ownerID}`);
    }
    return foundOwner;
  }
}
