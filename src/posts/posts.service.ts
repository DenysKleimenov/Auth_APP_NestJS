import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';

export const normalize = ({ id, author_id, title, description, pending }) => ({
  id,
  author_id,
  title,
  description,
  pending,
});

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
  ) {}

  createPost(title: string, author_id: number, description: string) {
    return this.postModel.create({
      title,
      author_id,
      description,
    });
  }

  getPosts() {
    return this.postModel.findAll();
  }

  getPost(id: string) {
    return this.postModel.findByPk(id);
  }

  updatePost(id: string, title: string, description: string) {
    return this.postModel.update(
      { title, description },
      {
        where: {
          id,
        },
      },
    );
  }

  deletePost(id: string) {
    return this.postModel.destroy({
      where: {
        id,
      },
    });
  }
}
