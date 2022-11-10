import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './entities/operation.entity';
import { OperationsController } from './operations.controller';
import { OperationsService } from './operations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Operation])],
  controllers: [OperationsController],
  providers: [OperationsService],
})
export class OperationsModule {}
