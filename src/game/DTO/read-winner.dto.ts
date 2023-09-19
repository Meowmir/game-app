import { DTOBase } from './base.dto';
import { IsBoolean, IsString } from 'class-validator';

export class ReadWinnerDto extends DTOBase<ReadWinnerDto> {
  @IsString()
  name: string;

  @IsBoolean()
  isP1: boolean;
}
