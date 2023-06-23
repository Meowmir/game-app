import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CreateOwnerDto } from '../dto/create-owner.dto';

export type OwnerDocument = HydratedDocument<Owner>;

@Schema()
export class Owner implements CreateOwnerDto {
  @Prop({ required: true })
  name: string;
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
