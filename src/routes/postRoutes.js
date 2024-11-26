import express from "express";
import multer from "multer";
import cors from "cors";
import { listPosts, newPost, uploadImg, putNewPost } from "../controllers/postControllers.js";

const corsOptions = { 
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};

const storage = multer.diskStorage({ // Config multer for windows
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));
    // Route of the get all posts
    app.get("/posts", listPosts);
    // Route of the create a new post
    app.post("/posts", newPost) 
    // Route of the create imgs with multer
    app.post("/uploads", upload.single("image"),uploadImg)

    app.put("/uploads/:id", putNewPost)
}

export default routes