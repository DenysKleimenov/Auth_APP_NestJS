import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';

export const normalize = ({ id, author_id, post_id, text }) => ({
  id,
  author_id,
  post_id,
  text,
});

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment)
    private commentModel: typeof Comment,
  ) {}

  createComment(comment) {
    return this.commentModel.create({
      ...comment,
    });
  }

  getComments() {
    return this.commentModel.findAll();
  }

  getComment(id: number) {
    return this.commentModel.findByPk(id);
  }

  updateComment(id: number, text: string) {
    return this.commentModel.update(
      { text },
      {
        where: {
          id,
        },
      },
    );
  }

  deleteComment(id: number) {
    return this.commentModel.destroy({
      where: {
        id,
      },
    });
  }
}
