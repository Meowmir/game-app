import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { DTOBase } from './base.dto';

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

  @IsString()
  @IsOptional()
  winner?: string;
}

export class ReadTileDTO extends DTOBase<ReadTileDTO> {
  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  playerName: string;
}

export class ReadPlayerDTO extends DTOBase<ReadPlayerDTO> {
  @IsString()
  @IsNotEmpty()
  name: string;
}
