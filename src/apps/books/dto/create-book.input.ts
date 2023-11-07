import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
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
