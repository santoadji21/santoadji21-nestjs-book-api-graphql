import { PrismaModule } from '@/prisma/prisma.module';
import { UsersResolver } from '@/user/users.resolver';
import { UsersService } from '@/user/users.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
