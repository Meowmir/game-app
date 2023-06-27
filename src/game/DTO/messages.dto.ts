import { DTOBase } from './base.dto';
import { IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator';
import { CreatePlayerDTO } from './create-player.dto';

export class MessageDTO extends DTOBase<MessageDTO> {
  @IsString()
  @IsNotEmpty()
  type: string;
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
