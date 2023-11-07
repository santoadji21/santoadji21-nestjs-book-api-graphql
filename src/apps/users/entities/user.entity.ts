import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from './role.enum';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Role)
  role: Role;
}
