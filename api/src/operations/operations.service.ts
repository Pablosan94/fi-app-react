import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOperationDto } from './dto/create-operation.dto';
import { GetOperationsParams } from './dto/get-operations.params';
import { Operation } from './entities/operation.entity';
import { format, startOfMonth, endOfMonth } from 'date-fns';

@Injectable()
export class OperationsService {
  private readonly logger = new Logger('OperationsService');

  constructor(
    @InjectRepository(Operation)
    private operationRepository: Repository<Operation>,
  ) {}

  async getOperations(query?: GetOperationsParams) {
    try {
      let operations;
      const queryBuilder = this.operationRepository.createQueryBuilder('op');

      if (query.from && query.to) {
        operations = await queryBuilder
          .where('op.date BETWEEN :from AND :to', {
            from: query.from,
            to: query.to,
          })
          .getMany();
      } else if (query.from && !query.to) {
        operations = await queryBuilder
          .where('op.date >= :from', {
            from: query.from,
          })
          .getMany();
      } else {
        const today = new Date();
        const monthStart = format(startOfMonth(today), 'yyyy-MM-dd');
        const monthEnd = format(endOfMonth(today), 'yyyy-MM-dd');
        operations = await queryBuilder
          .where('op.date BETWEEN :from AND :to', {
            from: monthStart,
            to: monthEnd,
          })
          .getMany();
      }

      return operations;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async getOperation(id: number) {
    const operation = await this.operationRepository.findOneBy({ id });
    if (!operation) {
      throw new NotFoundException('Operation not found');
    }

    return operation;
  }

  async addOperation(newOperation: CreateOperationDto) {
    try {
      const operation = this.operationRepository.create(newOperation);
      return await this.operationRepository.save(operation);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async removeOperation(id: number) {
    try {
      const operation = await this.getOperation(id);
      return await this.operationRepository.remove(operation);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
