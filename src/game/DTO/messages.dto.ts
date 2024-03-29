import { DTOBase } from './base.dto';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreatePlayerDTO } from './create-player.dto';

export class MessageDTO extends DTOBase<MessageDTO> {
  @IsString()
  @IsNotEmpty()
  type: string;
}

export class NewGameMessageDTO extends DTOBase<MessageDTO> {
  @IsString()
  @IsNotEmpty()
  type: string;

  @ValidateNested()
  player: CreatePlayerDTO;
}

export class AddPlayerMessageDTO extends DTOBase<AddPlayerMessageDTO> {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsUUID()
  gameId: string;

  @ValidateNested()
  player: CreatePlayerDTO;
}

export class GetGameMessageDTO extends DTOBase<GetGameMessageDTO> {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsUUID()
  gameId: string;

  @IsString()
  @IsNotEmpty()
  sessionId: string;
}

export class PlaceTileMessageDTO extends DTOBase<PlaceTileMessageDTO> {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsUUID()
  gameId: string;

  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  row: number;

  @IsNumber()
  column: number;
}
