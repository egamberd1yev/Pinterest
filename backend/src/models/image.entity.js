import { EntitySchema } from "typeorm";

export const ImageEntity = new EntitySchema({
  name: "Image",
  tableName: "images",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
      length: 255,
      nullable: true, // Qisqacha nom (qidiruv uchun)
    },
    description: {
      type: "text", // varchar o'rniga text qildik, xohlagancha uzun yozish uchun
      nullable: true,
    },
    tags: {
      type: "simple-array", // TypeORM o'zi ["tabiat", "qora", "mashina"] massivini string qilib bazaga yozadi
      nullable: true,
    },
    filename: {
      type: "varchar",
      length: 255,
    },
    filepath: {
      type: "varchar",
      length: 500,
    },
    mimetype: {
      type: "varchar",
      length: 100,
    },
    size: {
      type: "int",
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "user_id" }, 
      nullable: false,
    },
    // category: {
    //   type: "many-to-one",
    //   target: "Category", // Buning uchun alohida Category entity ochishing kerak bo'ladi
    //   joinColumn: { name: "category_id" },
    //   nullable: true,
    // }
  } 
});