import { DTOBase } from './base.dto';
import {
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreatePlayerDTO } from './create-player.dto';
import { Player } from '../schemas/player-schema';

export class UpdateGameDTO extends DTOBase<UpdateGameDTO> {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  state?: string;

  @IsNumber()
  @IsOptional()
  turn?: number;

  @IsJSON()
  @IsOptional()
  gameBoard?: string;

  @ValidateNested()
  @IsOptional()
  players?: CreatePlayerDTO[];

  @IsString()
  @IsOptional()
  winner?: Player;
}
