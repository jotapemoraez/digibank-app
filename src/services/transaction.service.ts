import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountModel } from 'src/models/account.model';
import { TransactionModel } from 'src/models/transaction.model';
import { AccountSchema } from 'src/schemas/account.schema';
import { TransactionSchema } from 'src/schemas/transaction.schema';
import { Repository } from 'typeorm';
import { AccountService } from './account.service';


@Injectable()
export class TransactionService {


    constructor(private readonly accountService: AccountService,
    @InjectRepository(TransactionModel) private model: Repository<TransactionModel>,
    ) {}
   
    public async transfer(transaction:TransactionSchema): Promise<TransactionModel> {

        var source = await this.accountService.getOne(transaction.sourceAccount);
        
        if (!source) {
            throw new NotFoundException(`Could not find account with number ${transaction.sourceAccount}`);
        }
        
        var destiny = await this.accountService.getOne(transaction.destinyAccount);

        if (!destiny) {
            throw new NotFoundException(`Could not find account with number ${transaction.destinyAccount}`);
        }

        if (source.balance - transaction.amount >= 0) {
            this.updateAccounts(source, transaction, destiny);
        } else {
            throw new BadRequestException(`Not enough balance from source account ${source.id} `)
        }

        return this.model.save(transaction);

    }

    private updateAccounts(source: AccountModel, body: TransactionSchema, destiny: AccountModel) {
        const updatedSource = <AccountSchema>({
            firstName: source.firstName,
            lastName: source.lastName,
            balance: source.balance - body.amount,
            age: source.age,
            email: source.email
        });

        const updatedDestiny = <AccountSchema>({
            firstName: destiny.firstName,
            lastName: destiny.lastName,
            balance: destiny.balance + body.amount,
            age: destiny.age,
            email: source.email
        });

        this.accountService.update(source.id, updatedSource);
        this.accountService.update(destiny.id, updatedDestiny);
    }

    public async getByAccountId(id: number): Promise<TransactionModel[]> {
        const transactions = await this.model.find({ where: { sourceAccount:id } });
    
        if (!transactions) {
          throw new NotFoundException(`Could not find transactions for account ${id}`);
        }
    
        return transactions;
      }

    public async getAll(): Promise<TransactionModel[]> {
        return this.model.find();
    }
}
