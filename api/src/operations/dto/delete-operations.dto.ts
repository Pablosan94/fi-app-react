import { IsArray, IsNumber, IsPositive } from 'class-validator';

export class DeleteOperationsDto {
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { each: true },
  )
  @IsPositive({ each: true })
  @IsArray()
  operationIds: number[];
}
