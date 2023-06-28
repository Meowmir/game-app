import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { Game, GameSchema } from './schemas/game.schema';
import { DbService } from './db.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
  ],
  providers: [DbService, GameService, GameGateway],
})
export class GameModule {}
