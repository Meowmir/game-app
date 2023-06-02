import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
  getHello(): string {
    return 'Hello World!';
  }
}
