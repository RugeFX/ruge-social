import { Optional, UUIDV4 } from "sequelize";
import {
  Table,
  Model,
  CreatedAt,
  Column,
  DataType,
  UpdatedAt,
  ForeignKey,
  HasMany,
  BelongsTo,
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

@Table
class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: UUIDV4 })
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
