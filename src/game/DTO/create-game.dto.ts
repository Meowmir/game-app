import { CreatePlayerDTO } from './create-player.dto';
import { CreateGameBoardDTO } from './create-game-board.dto';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { DTOBase } from './base.dto';

export class CreateGameDTO extends DTOBase<CreateGameDTO> {
  @IsString()
  @IsNotEmpty()
  state: string;

  @IsUUID()
  gameId: string;

  @IsNumber()
  turn: number;

  @ValidateNested()
  gameBoard: CreateGameBoardDTO;

  @ValidateNested()
  players: CreatePlayerDTO[];
}
