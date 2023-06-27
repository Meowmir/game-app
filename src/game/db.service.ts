import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Game } from './schemas/game.schema';
import { CreateGameDTO } from './DTO/create-game.dto';

@Injectable()
export class DbService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  // CREATE GAME
  async create(createGameDto: CreateGameDTO): Promise<Game> {
    const createdGame = new this.gameModel(createGameDto);
    return createdGame.save();
  }

  // GET GAME
  async getGame(gameId: string): Promise<Game> {
    const foundGame = await this.gameModel.findById(gameId);
    if (!foundGame) {
      throw new BadRequestException(`Invalid ID ${gameId}`);
    }
    return foundGame;
  }
}
