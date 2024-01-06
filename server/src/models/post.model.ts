import { Optional } from "sequelize";
import {
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  Table,
  IsUUID,
  PrimaryKey,
  DefaultScope,
  Scopes,
} from "sequelize-typescript";
import User from "./user.model";

export interface PostAttributes {
  id: string;
  ownerId: string;
  title: string;
  body: string;
}

type PostCreationAttributes = Optional<PostAttributes, "id" | "title">;

@Scopes(() => ({
  withRelations: {
    include: [User],
  },
}))
@Table
class Post extends Model<PostAttributes, PostCreationAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @Column({ allowNull: true, defaultValue: "Untitled post" })
  title!: string;

  @Column({ type: DataType.TEXT })
  body!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  ownerId!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @BelongsTo(() => User)
  user!: User;
}

export default Post;
