import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { normalize, CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async createComment(
    @Body('author_id') authorId: number,
    @Body('post_id') postId: number,
    @Body('text') text: string,
  ) {
    const createdComment = await this.commentsService.createComment(
      authorId,
      postId,
      text,
    );

    return normalize(createdComment);
  }

  @Get()
  async getAllComments() {
    const comments = await this.commentsService.getComments();

    return comments.map(normalize);
  }

  @Get(':id')
  async getOneComment(@Param('id') id: number) {
    const foundComment = await this.commentsService.getComment(id);

    if (!foundComment) {
      throw new NotFoundException('Could not find comment');
    }

    return normalize(foundComment);
  }

  @Patch(':id')
  async updateComment(@Param('id') id: number, @Body('text') text: string) {
    const foundComment = await this.commentsService.getComment(id);

    if (!foundComment) {
      throw new NotFoundException('Could not find comment');
    }

    if (typeof text !== 'string') {
      throw new UnprocessableEntityException(
        'Data should be of a correct type',
      );
    }

    await this.commentsService.updateComment(id, text);

    const updatedComment = await this.commentsService.getComment(id);

    return normalize(updatedComment);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: number) {
    const deleted = await this.commentsService.deleteComment(id);

    if (deleted === 0) {
      throw new NotFoundException('Could not find post');
    }
  }
}
