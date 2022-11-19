import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
  // controllers: [AppController, CatsController],
  // providers: [AppService, CatsService],
})
export class AppModule {}
