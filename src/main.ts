import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from "morgan"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const morganFormat =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
  app.use(morgan(morganFormat))
  await app.listen(6215);
}
bootstrap();
