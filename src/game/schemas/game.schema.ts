import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { GameBoard } from './game-board.schema';
import { Player } from './player-schema';

export type GameDocument = HydratedDocument<Game>;

@Schema()
export class Game {
  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  gameId: string;

  @Prop({ required: true })
  turn: number;

  @Prop({ required: true })
  gameBoard: GameBoard;

  @Prop({ required: true })
  players: Player[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
