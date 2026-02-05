# 🎵 Spotify Clone Backend API

A robust and scalable RESTful API built for a music streaming application (Spotify Clone).  
This backend handles user authentication (User/Artist), music streaming, album management, and secure file uploads.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Secure Signup/Login using JWT stored in HTTP-Only Cookies
- Role-based access control (User / Artist)
- Password hashing using bcrypt

### 🎵 Music Management
- Upload songs with audio files and thumbnails
- Stream music via secure URI

### 💿 Album Management
- Create albums and attach multiple songs
- Mongoose populate (Artist → Album → Songs)

### 🛡️ Security
- Protected routes using middleware
- Environment variable protection

---

## 🛠️ Tech Stack

- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB (Mongoose ODM)
- Authentication: JWT
- File Uploads: Multer

---

## 📂 Folder Structure & Setup

```bash
src/
├── controllers/      # Business logic (Auth, Music, Album)
├── db/               # MongoDB connection
├── middleware/       # Auth & file upload middleware
├── models/           # Mongoose schemas
│   ├── User.js
│   ├── Music.js
│   └── Album.js
├── routes/           # API routes
├── services/         # Storage / helper services
└── app.js            # Express app configuration

```
## ⚙️ Installation & Setup

1. Clone Repository
   ```bash
   git clone https://github.com/your-username/spotify-clone-backend.git
   ````
2. Install Dependencies
 ```bash
   npm install
   ````
3. Environment Variables
    ```bash
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   NODE_ENV=development

   ````
4. Run Server
 ```bash
   npm run dev
   # or
   npm start

   ````
🔌 API Endpoints
 ```bash
| Method | Endpoint  | Description          |
| ------ | --------- | -------------------- |
| POST   | /register | Register user/artist |
| POST   | /login    | Login                |
| POST   | /logout   | Logout               |

   ````

Music (/api/music)
 ```bash
   | Method | Endpoint | Access |
| ------ | -------- | ------ |
| POST   | /upload  | Artist |
| GET    | /        | User   |

   ````
Albums (/api/albums)
 ```bash
  | Method | Endpoint | Access |
| ------ | -------- | ------ |
| POST   | /create  | Artist |
| GET    | /        | Public |
| GET    | /:id     | Public |

   ````

🤝 Contributing
 ```bash
  git checkout -b feature/AmazingFeature
  git commit -m "Add AmazingFeature"
  git push origin feature/AmazingFeature

   ````



