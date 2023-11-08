import { BooksService } from '@/book/books.service';
import { CreateBookInput } from '@/book/dto/create-book.input';
import { UpdateBookInput } from '@/book/dto/update-book.input';
import { Book } from '@/book/entities/book.entity';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { S3Service } from '@/s3/s3.service';
import { decodeBase64Image } from '@/utils//decodeBase64Image';
import { ConflictException, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Book)
@UseGuards(JwtAuthGuard)
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly s3Service: S3Service,
  ) {}

  @Mutation(() => Book)
  @Mutation(() => Book)
  async createBook(
    @Args('createBookInput') createBookInput: CreateBookInput,
  ): Promise<Book> {
    // Destructure imageBase64 from createBookInput
    const { imageBase64, ...bookData } = createBookInput;

    // Check if ISBN already exists
    const existingBook = await this.booksService.findByIsbn(bookData.isbn);
    if (existingBook) {
      throw new ConflictException('ISBN already exists');
    }

    // If imageBase64 is provided, upload the image to S3
    if (imageBase64) {
      const { buffer, extension } = decodeBase64Image(imageBase64);
      const filename = `book-images/${
        bookData.isbn
      }-${Date.now()}.${extension}`;
      const imageUrl = await this.s3Service.uploadImageToS3(
        buffer,
        filename,
        extension,
      );
      bookData.image = imageUrl;
    }
    return this.booksService.create(bookData);
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
