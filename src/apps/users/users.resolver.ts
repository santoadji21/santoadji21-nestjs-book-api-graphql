import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from '@/user/users.service';
import { User } from '@/user/entities/user.entity';
import { CreateUserInput } from '@/user/dto/create-user.input';
import { UpdateUserInput } from '@/user/dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const user = this.usersService.findByEmail(createUserInput.email);
    if (user) {
      throw new ConflictException(
        'User with email ' + createUserInput.email + ' already exists',
      );
    }
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    const user = this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User with id ' + id + ' not found');
    }
    return user;
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
