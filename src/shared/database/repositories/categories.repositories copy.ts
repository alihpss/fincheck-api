import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany(findMany: Prisma.CategoryFindManyArgs) {
    return this.prismaService.category.findMany(findMany);
  }
}
