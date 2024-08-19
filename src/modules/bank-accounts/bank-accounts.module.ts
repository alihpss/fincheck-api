import { Module } from '@nestjs/common';
import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountsService } from './services/bank-accounts.service';
import { ValidateBankAccountOwnerShipService } from './services/validateBankAccountOwnerShip.service';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, ValidateBankAccountOwnerShipService],
  exports: [ValidateBankAccountOwnerShipService],
})
export class BankAccountsModule {}
