import { Model } from 'mongoose';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Game } from './schemas/game.schema';
import { CreateGameDTO } from './DTO/create-game.dto';
import { UpdateGameDto } from './DTO/update-game.dto';

type DBWatcher = (game: Game) => void;

@Injectable()
export class DbService implements OnModuleInit {
  private dbWatchers: DBWatcher[] = [];

  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  onModuleInit() {
    this.gameModel.watch().on('change', async ({ documentKey }) => {
      const updatedGame = await this.gameModel.findById(documentKey._id);
      if (!updatedGame) {
        return;
      }
      this.dbWatchers.forEach((watcher) => watcher(updatedGame));
    });
  }

  addWatcher(watcher: DBWatcher) {
    this.dbWatchers.push(watcher);
  }

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

  async updateGame(gameId: string, update: UpdateGameDto): Promise<Game> {
    await this.gameModel.findOneAndUpdate({ gameId }, update);
    return this.getGame(gameId);
  }
}
