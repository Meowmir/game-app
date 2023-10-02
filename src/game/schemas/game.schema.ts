import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Player } from './player-schema';

export type GameDocument = HydratedDocument<Game>;

@Schema({ timestamps: true })
export class Game {
  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  gameId: string;

  @Prop({ required: true })
  turn: number;

  @Prop({ required: true })
  gameBoard: string;

  @Prop({ required: true })
  players: Player[];

  @Prop({ required: false })
  latestTile?: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
