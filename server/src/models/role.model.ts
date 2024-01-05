import { Optional } from "sequelize";
import { Table, Model, Column, CreatedAt, UpdatedAt, HasMany } from "sequelize-typescript";
import User from "./user.model";

export interface RoleAttributes {
  id: number;
  name: string;
}

type RoleCreationAttributes = Optional<RoleAttributes, "id">;

@Table
class Role extends Model<Role, RoleCreationAttributes> {
  @Column
  name!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @HasMany(() => User)
  users!: User[];
}

export default Role;
