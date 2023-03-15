import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from 'src/controllers/account.controller';
import { TransactionController } from 'src/controllers/transaction.controller';
import { AccountModel } from 'src/models/account.model';
import { TransactionModel } from 'src/models/transaction.model';
import { AccountService } from 'src/services/account.service';
import { TransactionService } from 'src/services/transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountModel, TransactionModel])],
  controllers: [AccountController, TransactionController],
  providers: [AccountService, TransactionService],
})
export class DigiBankModule {}
