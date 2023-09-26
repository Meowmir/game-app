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

export class GameErrorDTO extends DTOBase<GameErrorDTO> {
  @IsString()
  @IsNotEmpty()
  error: string;
}

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
  winner?: string;

  @IsOptional()
  latestTile?: LatestTileDTO | null;
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

export class LatestTileDTO extends DTOBase<LatestTileDTO> {
  @IsNumber()
  @IsNotEmpty()
  column: number;

  @IsNumber()
  @IsNotEmpty()
  row: number;

  @IsBoolean()
  isP1: boolean;
}

export class ReadPlayerDTO extends DTOBase<ReadPlayerDTO> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString({ each: true })
  placeableTiles: string[];
}
