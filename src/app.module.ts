import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { VideoCardModule } from './video-card/video-card.module';

@Module({
  imports: [UserModule, AuthModule, VideoCardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
