import { CreatePlayerDTO } from './create-player.dto';
import {
  IsJSON,
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

  @IsJSON()
  gameBoard: string;

  @ValidateNested()
  players: CreatePlayerDTO[];
}
