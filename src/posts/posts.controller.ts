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
import { postDto } from 'src/dto/post.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';

import { normalize, PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(@Body() post: postDto, @Req() request) {
    const bearerToken = request.headers.authorization.slice(7);
    const loggedUser = this.jwtService.decode(bearerToken);
    const author_id = loggedUser['id'];

    const createdPost = await this.postsService.createPost({
      ...post,
      author_id,
    });

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

  @Roles(Role.MANAGER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':id')
  async updatePost(
    @Param('id') id: number,
    @Body('published') published: string,
  ) {
    const foundPost = await this.postsService.getPost(id);

    if (!foundPost) {
      throw new NotFoundException('Could not find post');
    }

    if (pending && typeof pending !== 'boolean') {
      throw new UnprocessableEntityException(
        'Data should be of a correct type',
      );
    }

    await this.postsService.updatePost(id, published);

    const updatedPost = await this.postsService.getPost(id);

    return normalize(updatedPost);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    const deleted = await this.postsService.deletePost(id);

    if (deleted === 0) {
      throw new NotFoundException('Could not find post');
    }
  }
}
