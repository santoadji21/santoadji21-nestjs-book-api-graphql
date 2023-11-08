import { BooksResolver } from '@/book/books.resolver';
import { BooksService } from '@/book/books.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { S3Module } from '@/s3/s3.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, S3Module],
  providers: [BooksResolver, BooksService],
})
export class BooksModule {}
