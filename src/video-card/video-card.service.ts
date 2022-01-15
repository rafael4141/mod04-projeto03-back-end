import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateVideoCardDto } from './dto/create-video-card.dto';
import { UpdateVideoCardDto } from './dto/update-video-card.dto';

@Injectable()
export class VideoCardService {
  constructor(private database: PrismaService) {}
  async create(createVideoCardDto: CreateVideoCardDto) {
    await this.database.videoCard.create({
      data: { ...createVideoCardDto },
    });
    return { msg: 'Success' };
  }

  async findAll() {
    return await this.database.videoCard.findMany();
  }

  async findOne(id: string) {
    return await this.database.videoCard.findUnique({ where: { id: id } });
  }

  async update(id: string, updateVideoCardDto: UpdateVideoCardDto) {
    await this.database.videoCard.update({
      where: { id: id },
      data: { ...updateVideoCardDto },
    });
    return { msg: 'success' };
  }

  async remove(id: string) {
    const movieExist = await this.database.videoCard.findUnique({
      where: { id },
    });

    if (!movieExist) {
      throw new NotFoundException('movie with entered ID not found');
    } else {
      await this.database.videoCard.delete({
        where: { id },
      });
    }

    return { message: 'ID was found and deleted' };
  }
}
