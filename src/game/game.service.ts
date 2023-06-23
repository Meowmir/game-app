import { Injectable } from '@nestjs/common';

import { DbService } from './db.service';

@Injectable()
export class GameService {
  constructor(private dbService: DbService) {}

  onEvent(data: any): Promise<string> {
    console.log('Received data', data);
    // this.dbService.getGame()...
    return Promise.resolve('Hello World');
  }
}
