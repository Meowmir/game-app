import { Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Game } from './schemas/game.schema';
import { CreateGameDTO } from './DTO/create-game.dto';
import { UpdateGameDTO } from './DTO/update-game-d-t.o';
import { Player } from './schemas/player-schema';

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
    const foundGame = await this.gameModel.findOne({ gameId });
    if (!foundGame) {
      throw new NotFoundException(`Invalid ID ${gameId}`);
    }
    return foundGame;
  }

  async updateGame(gameId: string, update: UpdateGameDTO): Promise<Game> {
    await this.gameModel.findOneAndUpdate({ gameId }, update);
    return this.getGame(gameId);
  }
}
