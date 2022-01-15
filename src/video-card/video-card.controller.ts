import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VideoCardService } from './video-card.service';
import { CreateVideoCardDto } from './dto/create-video-card.dto';
import { UpdateVideoCardDto } from './dto/update-video-card.dto';

@Controller('video-card')
export class VideoCardController {
  constructor(private readonly videoCardService: VideoCardService) {}

  @Post('create')
  create(@Body() createVideoCardDto: CreateVideoCardDto) {
    return this.videoCardService.create(createVideoCardDto);
  }

  @Get('find-all')
  findAll() {
    return this.videoCardService.findAll();
  }

  @Get('find-unique/:id')
  findOne(@Param('id') id: string) {
    return this.videoCardService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVideoCardDto: UpdateVideoCardDto,
  ) {
    return this.videoCardService.update(id, updateVideoCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoCardService.remove(id);
  }
}
