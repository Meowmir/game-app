import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { DTOBase } from './base.dto';
import { ReadWinnerDto } from './read-winner.dto';

export class ReadGameDTO extends DTOBase<ReadGameDTO> {
  @IsString()
  @IsNotEmpty()
  state: string;

  @IsUUID()
  gameId: string;

  @IsNumber()
  turn: number;

  // @ValidateNested()
  gameBoard: (ReadTileDTO | null)[][];

  @ValidateNested()
  players: ReadPlayerDTO[];

  @IsBoolean()
  @IsOptional()
  isP1?: boolean;

  @IsOptional()
  winner?: ReadWinnerDto[];
}

export class ReadTileDTO extends DTOBase<ReadTileDTO> {
  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  playerName: string;

  @IsBoolean()
  isP1: boolean;
}

export class ReadPlayerDTO extends DTOBase<ReadPlayerDTO> {
  @IsString()
  @IsNotEmpty()
  name: string;
}
