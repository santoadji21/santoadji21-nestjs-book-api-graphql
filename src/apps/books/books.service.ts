import { CreateBookInput } from '@/book/dto/create-book.input';
import { UpdateBookInput } from '@/book/dto/update-book.input';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBookInput: CreateBookInput) {
    return this.prisma.book.create({ data: createBookInput });
  }

  findAll() {
    return this.prisma.book.findMany();
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({ where: { id } });
  }

  findByIsbn(isbn: string) {
    return this.prisma.book.findUnique({ where: { isbn } });
  }

  update(id: number, updateBookInput: UpdateBookInput) {
    return this.prisma.book.update({
      where: { id },
      data: updateBookInput,
    });
  }

  remove(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }
}
