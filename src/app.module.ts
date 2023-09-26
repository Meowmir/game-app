import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { dbUri, dbName, dbUser, dbPass } from './secrets.init';
import { GameModule } from './game/game.module';
import { CLIENT_ROOT_DIR } from './global.constants';

@Module({
  imports: [
    MongooseModule.forRoot(dbUri, {
      dbName,
      user: dbUser,
      pass: dbPass,
    }),
    GameModule,
    ServeStaticModule.forRoot({
      rootPath: CLIENT_ROOT_DIR,
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
