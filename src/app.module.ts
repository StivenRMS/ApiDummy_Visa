import { Module } from '@nestjs/common';
import { DummyDataController } from './service/dummy-data.controller';
import { DummyDataService } from './service/dummy-data.service';

@Module({
  imports: [],
  controllers: [DummyDataController],
  providers: [DummyDataService],
})
export class AppModule {}
