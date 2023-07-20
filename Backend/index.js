import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import  express from 'express';
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path, { dirname } from "path"
import { fileURLToPath } from 'url';


dotenv.config()
const app = express();


    
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({ origin: ["http://localhost:5173","http://localhost:3001"], credentials: true }))
// app.use(cors({ origin: "http://localhost:3001", credentials: true }))


mongoose.connect(process.env.DB_URI).then(()=>{
    app.listen(3000, ()=>{
        console.log("ça marche!!!");
    })
})
app.get('/',(req,res)=>{
    res.send("kif kif ça marche aussi !!!")
});

app.use('/api', userRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/images', express.static(path.join(__dirname,'images')));

// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import express from "express";
// import userRoutes from "./routes/userRoutes.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";
// import { userAuthValidation } from "./middelwares/auth.js";

// dotenv.config();
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(cors({ origin: "http://localhost:3001", credentials: true }));

// // Middleware pour la validation de l'authentification
// app.use(userAuthValidation);

// mongoose
//   .connect(process.env.DB_URI)
//   .then(() => {
//     app.listen(3000, () => {
//       console.log("Le serveur est en écoute sur le port 3000 !");
//     });
//   })
//   .catch((error) => {
//     console.error("Erreur de connexion à la base de données :", error);
//   });

// app.get("/", (req, res) => {
//   res.send("Le serveur est en ligne !");
// });

// app.use("/api", userRoutes);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use("/images", express.static(path.join(__dirname, "images")));
