import { IsNotEmpty, IsString } from 'class-validator';
import { DTOBase } from './base.dto';

export class CreatePlayerDTO extends DTOBase<CreatePlayerDTO> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @IsString({ each: true })
  placeableTiles: string[];
}
