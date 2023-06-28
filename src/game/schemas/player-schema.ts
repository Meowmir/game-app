import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreatePlayerDTO } from '../DTO/create-player.dto';

export type PlayerDocument = HydratedDocument<Player>;

@Schema()
export class Player implements CreatePlayerDTO {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  sessionId: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
