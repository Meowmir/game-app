import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Game } from './schemas/game.schema';

@Injectable()
export class DbService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}
  async create(createGameDto: any): Promise<Game> {
    const createdGame = new this.gameModel(createGameDto);
    return createdGame.save();
  }

  async getGame(gameId: string): Promise<Game> {
    const foundGame = await this.gameModel.findById(gameId);
    if (!foundGame) {
      throw new BadRequestException(`Invalid ID ${gameId}`);
    }
    return foundGame;
  }
}
