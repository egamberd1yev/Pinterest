import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./config/db.js";
import { UserEntity } from "./models/user.entity.js"
import userRoutes from "./routes/user.routes.js"
import imageRoutes from "./routes/image.routes.js"
import path from "path"
import { fileURLToPath } from "url"

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/images", imageRoutes)


app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000

AppDataSource.initialize()
  .then(()=> {
    console.log("Postgress Connecting Successfully");

    app.listen(PORT, ()=> {
      console.log(`Server running ${PORT}-PORT`);
    });
  })
  .catch((error) => {
    console.error("There was an error connecting.", error);
})