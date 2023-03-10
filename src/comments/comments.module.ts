import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize/dist';
import { CommentsController } from './comments.controller';
import { Comment } from './comments.model';
import { CommentsService } from './comments.service';

@Module({
  imports: [SequelizeModule.forFeature([Comment])],
  controllers: [CommentsController],
  providers: [CommentsService, JwtService],
})
export class CommentsModule {}
