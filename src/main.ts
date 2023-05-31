import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();

/* Importing NestFactory and AppModule. The factory is a function that builds something. The module is like an ikea couch, pieces that
fit together.

then its ASYNC which means it is waiting for something, or more that it is not running at the time.. the code can continue while
the async is doing its shit.

then there a function called bootstrap, which returns a promise<void>... which just means that it could return completion or failure

inside the function there is an await call (the function is waiting for this to be done) to the factory to create the appmodule,
assigned to a variable called app.

and then the app is listening for incoming requests on (port 3000) and waiting for the server to terminate

lastly, outside the function, the code calls the function bootstrap
*/
