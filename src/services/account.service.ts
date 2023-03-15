import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountModel } from 'src/models/account.model';
import { AccountSchema } from 'src/schemas/account.schema';
import { Repository } from 'typeorm';


@Injectable()
export class AccountService {

    constructor(
    @InjectRepository(AccountModel) private model: Repository<AccountModel>,
    ) {}
   
    public async create(body: AccountSchema): Promise<AccountModel> {
        return this.model.save(body);
    }
    
    public async getOne( id: number): Promise<AccountModel> {
        const account = await this.model.findOne({ where: { id } });
      
        return account;
    }

    public async getAll(): Promise<AccountModel[]> {
        return this.model.find();
    }
    
    public async update(id: number, body: AccountSchema): Promise<AccountModel> {
        const account = await this.model.findOne({ where: { id } });
    
        if (!account) {
            throw new NotFoundException(`Could not find a match with id ${id}`);
        }
    
        await this.model.update({ id }, body);
    
        return this.model.findOne({ where: { id } });
    }
    
    public async delete(id: number): Promise<string> {
        const account = await this.model.findOne({ where: { id } });
    
        if (!account) {
            throw new NotFoundException(`Could not find account with id ${id}`);
        }
    
        await this.model.delete(id);
    
        return `Account with id ${id} was successfully deleted`;
    }
}
