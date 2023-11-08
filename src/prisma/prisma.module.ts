import { PrismaService } from '@/prisma/prisma.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Export PrismaService so it can be injected into other modules
})
export class PrismaModule {}
