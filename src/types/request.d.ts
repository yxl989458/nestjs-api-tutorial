import { User } from '@prisma/client';
import { Request } from 'express';

interface CustomRequest extends Request {
  user: Omit<User, 'hash'>;
}
