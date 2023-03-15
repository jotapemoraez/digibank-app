import {  IsInt, IsNumber, IsPositive } from 'class-validator';

export class TransactionSchema {
  
  @IsInt()
  sourceAccount: number;

  @IsInt()
  destinyAccount: number;

  @IsInt()
  amount: number;
}