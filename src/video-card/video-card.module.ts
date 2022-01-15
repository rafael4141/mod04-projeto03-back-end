import { Module } from '@nestjs/common';
import { VideoCardService } from './video-card.service';
import { VideoCardController } from './video-card.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [VideoCardController],
  providers: [VideoCardService, PrismaService],
})
export class VideoCardModule {}
