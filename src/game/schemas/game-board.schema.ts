import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CreateGameBoardDTO } from '../DTO/create-game-board.dto';
import { Player } from './player-schema';

export type GameBoardDocument = HydratedDocument<GameBoard>;

@Schema()
export class Tile {
  @Prop()
  color: string;

  @Prop()
  playerId: string;
}

@Schema()
export class GameBoard implements CreateGameBoardDTO {
  gameBoard: (Tile | null)[][];
}

export const GameBoardSchema = SchemaFactory.createForClass(GameBoard);
