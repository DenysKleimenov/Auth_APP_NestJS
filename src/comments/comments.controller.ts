import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Req,
  NotFoundException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { commentDto } from 'src/dto/comment.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';

import { normalize, CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async createComment(@Body() comment: commentDto, @Req() request) {
    let author_id = null;

    if (request.headers.authorization) {
      const bearerToken = request.headers.authorization.slice(7);
      const loggedUser = this.jwtService.decode(bearerToken);
      author_id = loggedUser['id'];
    }

    const createdComment = await this.commentsService.createComment({
      ...comment,
      author_id,
    });

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

  @UseGuards(AuthGuard('jwt'))
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

  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  async deleteComment(@Param('id') id: number) {
    const deleted = await this.commentsService.deleteComment(id);

    if (deleted === 0) {
      throw new NotFoundException('Could not find post');
    }
  }
}
