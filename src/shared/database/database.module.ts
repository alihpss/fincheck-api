import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { BankAccountsRepository } from './repositories/bank-accounts.repositories';
import { CategoriesRepository } from './repositories/categories.repositories copy';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
  ],
  exports: [UsersRepository, CategoriesRepository, BankAccountsRepository],
})
export class DatabaseModule {}
