import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CustomRequest } from 'src/types/request';
import { BookmarkService } from './bookmark.service';

@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @UseGuards(AuthGuard)
  @Get('/list')
  getbookmark(@Req() { user }: CustomRequest) {
    return this.bookmarkService.getBookmarks(user);
  }
}
