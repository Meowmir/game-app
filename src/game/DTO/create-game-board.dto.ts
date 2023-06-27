import { IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator';
import { DTOBase } from './base.dto';

export class CreateGameBoardDTO extends DTOBase<CreateGameBoardDTO> {
  @ValidateNested()
  gameBoard: (CreateTileDto | null)[][];
}

export class CreateTileDto {
  @IsString()
  @IsNotEmpty()
  color: string;

  @IsUUID()
  playerId: string;
}
