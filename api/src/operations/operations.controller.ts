import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateOperationDto } from './dto/create-operation.dto';
import { GetOperationsParams } from './dto/get-operations.params';
import { OperationsService } from './operations.service';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Get()
  getOperations(@Query() query?: GetOperationsParams) {
    return this.operationsService.getOperations(query);
  }

  @Get(':id')
  getOperation(@Param('id', ParseIntPipe) id: number) {
    return this.operationsService.getOperation(id);
  }

  @Post()
  addOperation(@Body() body: CreateOperationDto) {
    return this.operationsService.addOperation(body);
  }

  @Delete(':id')
  removeOperation(@Param('id', ParseIntPipe) id: number) {
    return this.operationsService.removeOperation(id);
  }
}
