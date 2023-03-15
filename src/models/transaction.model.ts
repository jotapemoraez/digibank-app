import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { AccountModel } from './account.model';

@Entity()
export class TransactionModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  sourceAccount: number;

  @Column('int')
  destinyAccount: number;

  @Column('int')
  amount: number;

  @ManyToOne(() => AccountModel, (account) => account.transactions)
  account:AccountModel;
}
