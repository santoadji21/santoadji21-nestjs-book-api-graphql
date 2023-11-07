import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  author: string;

  @Field()
  isbn: string;

  @Field(() => Float, { nullable: true })
  rating?: number;

  @Field({ nullable: true })
  image?: string;

  @Field()
  releaseDate: Date;
}
