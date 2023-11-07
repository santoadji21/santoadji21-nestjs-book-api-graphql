import { Field, InputType } from '@nestjs/graphql';
import { Role } from '../entities/role.enum';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Role, { defaultValue: Role.USER })
  role: Role;
}
