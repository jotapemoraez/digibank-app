import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { TransactionModel } from './transaction.model';

@Entity()
export class AccountModel {
  @PrimaryGeneratedColumn()
  id: number; //identifies the account 

  @Column({ length: 60 })
  firstName: string;

  @Column({ length: 60 })
  lastName: string;

  @Column('int')
  age: number;

  @Column('double')
  balance: number;

  @Column({ length: 255 })
  email: string;

  @OneToMany(() => TransactionModel, (transaction) => transaction.account)
    transactions: TransactionModel[]

}
