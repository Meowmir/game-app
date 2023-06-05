import { CreateOwnerDto } from './create-owner.dto';

export interface CreateCatDto {
  name: string;

  age: number;

  breed: string;

  owner: CreateOwnerDto;
}
