import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AccountModel } from 'src/models/account.model';
import { AccountSchema } from 'src/schemas/account.schema';
import { AccountService } from 'src/services/account.service';

@Controller('/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  public async create(@Body() body: AccountSchema): Promise<AccountModel> {
    return this.accountService.create(body);
  }

  @Get(':id')
  public async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AccountModel> {
    const account = await this.accountService.getOne(id);

    if (!account) {
      throw new NotFoundException(`Could not find account with id ${id}`);
    }

    return account;
  }
  
  @Get()
  public async getAll(): Promise<AccountModel[]> {
    return this.accountService.getAll();
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: AccountSchema,
  ): Promise<AccountModel> {
    await this.accountService.update(id, body);

    return this.accountService.getOne(id);
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
     return await this.accountService.delete(id);
  }
}
