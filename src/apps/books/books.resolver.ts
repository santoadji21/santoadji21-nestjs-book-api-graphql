import { ConflictException, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { BooksService } from './books.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';

@Resolver(() => Book)
@UseGuards(JwtAuthGuard)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation(() => Book)
  createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    const book = this.booksService.findByIsbn(createBookInput.isbn);
    if (book) {
      throw new ConflictException('ISBN already exists');
    }
    return this.booksService.create(createBookInput);
  }

  @Query(() => [Book], { name: 'books' })
  findAll() {
    return this.booksService.findAll();
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.findOne(id);
  }

  @Mutation(() => Book)
  updateBook(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
  ) {
    return this.booksService.update(id, updateBookInput);
  }

  @Mutation(() => Boolean)
  removeBook(@Args('id', { type: () => Int }) id: number) {
    return this.booksService
      .remove(id)
      .then(() => true)
      .catch(() => false);
  }
}
