import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private database: PrismaService) {}
  async create(userData: CreateUserDto): Promise<User> {
    if (userData.password !== userData.password_confirmation) {
      throw new UnauthorizedException(
        'Password and password confirmation are not compatible',
      );
    }
    const userExists = await this.database.user.findUnique({
      where: { email: userData.email },
    });

    if (userExists) {
      throw new ConflictException('This email is already registered');
    }

    const heels = 10;
    const passwordHash = await bcrypt.hash(userData.password, heels);

    delete userData.password_confirmation;

    const user = await this.database.user.create({
      data: {
        ...userData,
        password: passwordHash,
      },
    });

    delete user.password;
    return user;
  }

  async findMany(): Promise<any[]> {
    const user = await this.database.user.findMany();
    const userNoPass = user.map(({ password, ...resto }) => resto);
    return userNoPass;
  }

  async findUnique(id: string): Promise<User> {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User with the given id was not found');
    }

    delete user.password;
    return user;
  }

  async update(id: string, userData: UpdateUserDto): Promise<User> {
    const user = await this.database.user.update({
      data: userData,
      where: { id: id },
    });

    delete user.password;

    return user;
  }

  async delete(id: string): Promise<{ message: string }> {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User with the given id was not found');
    } else {
      await this.database.user.delete({
        where: { id },
      });
    }

    return {
      message: 'id was found and deleted successfully',
    };
  }

  async addList(userData: User, videoCardId: string) {
    const videoCard = await this.database.videoCard.findUnique({
      where: { id: videoCardId },
    });

    if (!videoCard) {
      throw new NotFoundException('Video card not found');
    }

    const userVideoCard = await this.database.user.findUnique({
      where: { id: userData.id },
      include: {
        videoCards: true,
      },
    });

    const userVideoCardArray = userVideoCard.videoCards;
    let foundVideoCard = false;

    userVideoCardArray.map((movie) => {
      if (movie.id === videoCardId) {
        foundVideoCard = true;
      }
    });

    if (foundVideoCard) {
      await this.database.user.update({
        where: { id: userData.id },
        data: {
          videoCards: {
            disconnect: {
              id: videoCard.id,
            },
          },
        },
        include: {
          videoCards: true,
        },
      });

      return { message: 'Video card removed to cart' };
    } else {
      await this.database.user.update({
        where: { id: userData.id },
        data: {
          videoCards: {
            connect: {
              id: videoCard.id,
            },
          },
        },
        include: {
          videoCards: true,
        },
      });

      return { message: 'Video card added to cart' };
    }
  }

  async seeList(user: User) {
    return await this.database.user.findMany({
      where: { id: user.id },
      include: { videoCards: true },
    });
  }
}
