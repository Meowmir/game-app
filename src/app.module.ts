import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { dbUri, dbName, dbUser, dbPass } from './secrets.init';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    MongooseModule.forRoot(dbUri, {
      dbName,
      user: dbUser,
      pass: dbPass,
    }),
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
