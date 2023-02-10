import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'posts',
})
export class Post extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.INTEGER)
  author_id: number;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  published: boolean;
}
