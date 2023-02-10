import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize/dist';
import { Post } from './post.model';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [SequelizeModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService, JwtService],
  exports: [PostsService],
})
export class PostsModule {}
