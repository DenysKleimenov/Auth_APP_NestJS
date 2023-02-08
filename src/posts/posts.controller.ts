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

import { normalize, PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(
    @Body('title') title: string,
    @Body('author_id') author_id: number,
    @Body('description') description: string,
  ) {
    const createdPost = await this.postsService.createPost(
      title,
      author_id,
      description,
    );

    return normalize(createdPost);
  }

  @Get()
  async getAllPosts() {
    const posts = await this.postsService.getPosts();

    return posts.map(normalize);
  }

  @Get(':id')
  async getOnePost(@Param('id') id: number) {
    const foundPost = await this.postsService.getPost(id);

    if (!foundPost) {
      throw new NotFoundException('Could not find post');
    }

    return normalize(foundPost);
  }

  @Patch(':id')
  async updatePost(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    const foundPost = await this.postsService.getPost(id);

    if (!foundPost) {
      throw new NotFoundException('Could not find post');
    }

    if (
      (title && typeof title !== 'string') ||
      (description && typeof description !== 'string')
    ) {
      throw new UnprocessableEntityException(
        'Data should be of a correct type',
      );
    }

    await this.postsService.updatePost(id, title, description);

    const updatedPost = await this.postsService.getPost(id);

    return normalize(updatedPost);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    const deleted = await this.postsService.deletePost(id);

    if (deleted === 0) {
      throw new NotFoundException('Could not find post');
    }
  }
}
