# 📌 Pinterest Clone

Bu Node.js, Express, TypeORM va PostgreSQL yordamida qurilgan, rasm ulashish va foydalanuvchilarni boshqarishga mo'ljallangan backend API loyihasidir. Loyihada xavfsizlik, ma'lumotlarni tozalash (sanitizing) va fayllar bilan to'g'ri ishlash prinsiplariga to'liq amal qilingan.

---

## 🚀 Imkoniyatlar (Features)

* **Foydalanuvchilar Auth tizimi:**
  * `bcrypt` yordamida parollarni xavfsiz hashlash.
  * `JWT (JSON Web Token)` orqali ikki bosqichli token tizimi (`accessToken` 15 daqiqa va `refreshToken` 7 kun).
  * **Xavfsizlik:** `sanitizeUser` funksiyasi orqali parollarni klientga (Postman/Frontend) qaytarishdan oldin butunlay yashirish.
  * Ro'yxatdan o'tishda `findUserByEmail` orqali dublikat foydalanuvchilar tekshiruvi.

* **Rasm yuklash tizimi (Images):**
  * `Multer` kutubxonasi yordamida rasmlarni diskka (uploads papkasiga) xavfsiz yuklash.
  * Rasmlarni o'chirishda ham bazadan, ham server diskidan (`fs.unlinkSync` va `path.resolve`) bir vaqtda tozalash.
  * Ma'lumotlar yaxlitligi (Har bir rasm uni yuklagan `userId` bilan bog'lanadi).

---

## 🛠️ Texnologiyalar (Tech Stack)

* **Backend:** Node.js, Express.js
* **Database ORM:** TypeORM (PostgreSQL)
* **Xavfsizlik & Auth:** JWT (jsonwebtoken), bcrypt
* **Fayllar:** Multer

---

## 📦 Loyihani kompyuterda ishga tushirish (Setup)

### 1. Loyihani klon qiling:
```bash
git clone <sening-github-repo-linkingiz>
cd pinterest-backend
