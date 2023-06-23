import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Owner } from './owner.schema';
import { CreateCatDto } from '../dto/create-cat.dto';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat implements CreateCatDto {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: Owner;

  /* If there are multiple owners:
  *
  * @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }] })
owner: Owner[];
* */
}

export const CatSchema = SchemaFactory.createForClass(Cat);
