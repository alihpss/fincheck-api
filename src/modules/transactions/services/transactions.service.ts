import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateTransactionOwnerShipService } from './validate-transaction-ownership.service';
import { ValidateBankAccountOwnerShipService } from 'src/modules/bank-accounts/services/validateBankAccountOwnerShip.service';
import { ValidateCategoryOwnerShipService } from 'src/modules/categories/services/validate-category-ownership.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionType } from '../entities/Transaction';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionRepo: TransactionsRepository,
    private readonly validateBankAccountOwnerShipService: ValidateBankAccountOwnerShipService,
    private readonly validateCategoryOwnerShipService: ValidateCategoryOwnerShipService,
    private readonly validateTransactionOwnerShipService: ValidateTransactionOwnerShipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, date, name, type, value } =
      createTransactionDto;

    await this.validateEntitiesOwnerShip({ userId, categoryId, bankAccountId });

    return this.transactionRepo.create({
      data: {
        date,
        name,
        type,
        value,
        bankAccountId,
        categoryId,
        userId,
      },
    });
  }

  findAllByUserId(
    userId: string,
    filters: {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: TransactionType;
    },
  ) {
    return this.transactionRepo.findMany({
      where: {
        userId,
        bankAccountId: filters.bankAccountId,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        },
        type: filters.type,
      },
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { bankAccountId, categoryId, date, name, type, value } =
      updateTransactionDto;

    await this.validateEntitiesOwnerShip({
      userId,
      bankAccountId,
      categoryId,
      transactionId,
    });

    return this.transactionRepo.update({
      where: {
        id: transactionId,
        userId,
      },
      data: {
        date,
        name,
        type,
        value,
      },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnerShip({ userId, transactionId });

    await this.transactionRepo.delete({
      where: {
        id: transactionId,
      },
    });

    return null;
  }

  private async validateEntitiesOwnerShip({
    bankAccountId,
    categoryId,
    userId,
    transactionId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
  }) {
    await Promise.all([
      transactionId &&
        this.validateTransactionOwnerShipService.validate(
          userId,
          transactionId,
        ),
      bankAccountId &&
        this.validateBankAccountOwnerShipService.validate(
          userId,
          bankAccountId,
        ),
      categoryId &&
        this.validateCategoryOwnerShipService.validate(userId, categoryId),
    ]);
  }
}
