import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Owner } from '../schemas/owner.schema';
import { CreateOwnerDto } from '../dto/create-owner.dto';

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
}
