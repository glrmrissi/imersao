import fs from "fs";
import { getAllPosts, createPost, attPutPost} from "../models/postModels.js";
import generateDescriptionWithGemini from "../services/geminiService.js"

export async function listPosts(req, res) {
    const resultPosts = await getAllPosts();
    res.status(200).json(resultPosts);
}

export async function newPost(req, res) {
    const newBody = req.body;
    try {
        const postCreated = await createPost(newBody);
        res.status(200).json(postCreated);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Error":"req error"});
    }
}

export async function uploadImg(req, res) {
    const newBody = {
        description: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try {
        const postCreated = await createPost(newBody);
        const imgAtt = `uploads/${postCreated.insertedId}.png`;
        fs.renameSync(req.file.path, imgAtt);
        res.status(200).json(postCreated);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Error":"req error"});
    }
}

export async function putNewPost(req, res) {
    const id = req.params.id;
    const urlImage = `http://localhost:3000/${id}.png`
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const description = await generateDescriptionWithGemini(imgBuffer);
        const newBody = {
            description: description,
            imgUrl: urlImage,
            alt: req.body.alt
        };
        const postCreated = await attPutPost(id, newBody);
        res.status(200).json(postCreated);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Error":"req error"});
    }
}