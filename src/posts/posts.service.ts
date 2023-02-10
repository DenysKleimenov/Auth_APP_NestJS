import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';

export const normalize = ({
  id,
  author_id,
  title,
  description,
  published,
}) => ({
  id,
  author_id,
  title,
  description,
  published,
});

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
  ) {}

  createPost(post) {
    return this.postModel.create({ ...post });
  }

  getPosts() {
    return this.postModel.findAll();
  }

  getPost(id: number) {
    return this.postModel.findByPk(id);
  }

  updatePost(id: number, published: string) {
    return this.postModel.update(
      { published },
      {
        where: {
          id,
        },
      },
    );
  }

  deletePost(id: number) {
    return this.postModel.destroy({
      where: {
        id,
      },
    });
  }
}
