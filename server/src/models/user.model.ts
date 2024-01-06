import { Optional } from "sequelize";
import {
  Table,
  Model,
  CreatedAt,
  Column,
  UpdatedAt,
  ForeignKey,
  HasMany,
  BelongsTo,
  DefaultScope,
  Scopes,
  PrimaryKey,
  IsUUID,
} from "sequelize-typescript";
import Role from "./role.model";
import Post from "./post.model";

export interface UserAttributes {
  id: string;
  username: string;
  password: string;
  role: number;
  avatarUrl: string;
}

type UserCreationAttributes = Optional<UserAttributes, "id" | "avatarUrl" | "role">;

@DefaultScope(() => ({
  attributes: { exclude: ["password"] },
}))
@Scopes(() => ({
  withPassword: {
    attributes: { include: ["password"] },
  },
  withRelations: {
    include: [Role, Post],
  },
}))
@Table
class User extends Model<UserAttributes, UserCreationAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column
  password!: string;

  @ForeignKey(() => Role)
  @Column({ defaultValue: 1, allowNull: false })
  roleId!: number;

  @Column({ defaultValue: "default.png" })
  avatarUrl!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @BelongsTo(() => Role)
  role!: Role;

  @HasMany(() => Post)
  posts!: Post[];
}

export default User;
