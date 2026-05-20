import { EntitySchema } from "typeorm";

export const UserEntity = new EntitySchema({
  name: "User", //klasssss name
  tableName: "users", //postgress table name
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    username: {
      type: "varchar",
      length: 50,
      unique: true,
      nullable: false,
    },
    email: {
      type: "varchar",
      length: 100,
      unique: true,
      nullable: false,
    },
    password: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    role: {
      type: "enum",
      enum: ["user", "admin"],
      default: "user",
      nullable: false
    },
    createdAt: {
      name: "created_at",
      type: "timestamp",
      createdDate: new Date(), //Auto current time addition
    }
  }
})