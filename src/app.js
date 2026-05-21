import express from "express";
import { AppDataSource } from "./config/db.js";
import { UserEntity } from "./models/user.entity.js"

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post("/api/test-user", async (req, res) => {
      try {
        const { username, email, password } = req.body;

        const userRepository = AppDataSource.getRepository(UserEntity);
        
        const newUser = userRepository.create({
          username,
          email,
        });

        await userRepository.save(newUser);

        res.status(201).json({
          message: "User muvaffaqiyatli yaratildi! 🔥",
          data: newUser
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Xatolik yuz berdi", error: error.message });
      }
    });

AppDataSource.initialize()
  .then(()=> {
    console.log("Postgress Connecting Successfully");

    app.listen(PORT, ()=> {
      console.log(`Server running http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("There was an error connecting.", error);
})