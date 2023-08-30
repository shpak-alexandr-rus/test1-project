import { Module } from '@nestjs/common';
import { CategoryController } from './categories.controller';
import { CategoryService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [CategoryController, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
