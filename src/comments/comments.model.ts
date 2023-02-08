import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'comments',
})
export class Comment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.INTEGER)
  author_id: number;

  @Column(DataType.INTEGER)
  post_id: number;

  @Column
  text: string;
}
