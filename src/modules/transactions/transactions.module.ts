import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';
import { CategoriesModule } from '../categories/categories.module';
import { TransactionsService } from './services/transactions.service';
import { ValidateTransactionOwnerShipService } from './services/validate-transaction-ownership.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, ValidateTransactionOwnerShipService],
  imports: [BankAccountsModule, CategoriesModule],
})
export class TransactionsModule {}
