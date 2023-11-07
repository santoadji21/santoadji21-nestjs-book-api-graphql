import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

// Map the Prisma enum to the GraphQL enum
registerEnumType(Role, {
  name: 'Role', // This is the name of the GraphQL enum type you will use in your schema
});
