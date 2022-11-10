import { IsDateString, IsOptional } from 'class-validator';

export class GetOperationsParams {
  @IsOptional()
  @IsDateString()
  from: string;
  @IsOptional()
  @IsDateString()
  to: string;
}
