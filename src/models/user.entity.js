import { EntitySchema } from "typeorm";

export const UserEntity = new EntitySchema({
  name: "User", 
  tableName: "users", 
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
    refreshToken: {        // ← qo'shildi
      type: "varchar",
      length: 500,
      nullable: true,      // ← login qilmagan userda bo'lmaydi
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {           // ← qo'shildi
      type: "timestamp",
      updateDate: true,
    },
  }
})