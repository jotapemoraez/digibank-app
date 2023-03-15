import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DigiBankModule } from './modules/digibank.module';

@Module({
  imports: [DigiBankModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
