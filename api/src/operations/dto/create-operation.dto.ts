import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateOperationDto {
  @IsNumber()
  amount: number;
  @IsDateString()
  date: string;
  @IsString()
  concept: string;
}
