import { Injectable } from '@nestjs/common';
import { CustomRequest } from 'src/types/request';

@Injectable()
export class BookmarkService {
  getBookmarks(user: CustomRequest['user']) {
    return user;
  }
}
