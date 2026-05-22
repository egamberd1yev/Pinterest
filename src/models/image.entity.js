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
    }
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      nullable: false,
    }
  }
})