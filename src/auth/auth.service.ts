import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup({ password, email }: AuthDto) {
    const hashCode = await hash(password);
    try {
      const user = this.prisma.user.create({
        data: {
          hash: hashCode,
          email,
        },
        // select: {
        //   id: true,
        //   email: true,
        //   createdAt: true,
        //   updatedAt: true,
        //   hash: false,
        //   firstName: true,
        //   lastName: true,
        // },
      });
      delete (await user).hash;
      return user;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw err;
    }
  }
  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');
    const pwMatches = await verify(user.hash, dto.password);
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    delete user.hash;
    const jwtStr = await this.jwtService.signAsync(user);
    return {
      token: jwtStr,
    };
  }
}
