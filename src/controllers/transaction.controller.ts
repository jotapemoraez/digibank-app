import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TransactionModel } from 'src/models/transaction.model';
import { TransactionSchema } from 'src/schemas/transaction.schema';
import { TransactionService } from 'src/services/transaction.service';

@Controller('/transaction')
export class TransactionController {


  @Inject(TransactionService)
  private readonly transactionService: TransactionService;

  @Post()
  public async transfer(@Body() body: TransactionSchema): Promise<TransactionModel> {
    return this.transactionService.transfer(body);
  }

  @Get(':id')
  public async getByAccountId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TransactionModel[]> {
    const transactions = await this.transactionService.getByAccountId(id);

    if (!transactions) {
      throw new NotFoundException(`Could not find a match with id ${id}`);
    }

    return transactions;
  }

  @Get()
  public async getAll(): Promise<TransactionModel[]> {
    return this.transactionService.getAll();
  }

}
