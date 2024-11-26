import express from "express";
import routes from "./src/routes/postRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.static("uploads"))

routes(app)
// app.use(express.static('src/public'));

app.listen(PORT, () => {
    console.log(`App is listening in ${PORT} port `);
    console.log(`\x1b[34m -> http://localhost:${PORT}/posts \x1b[0m`);
});

// Adicionador de ID 🚓
// function adderIds() {
//     let id = 1
//     posts.forEach(post => {
//         post.id = id;
//         id ++
//     });
// };

// adderIds(); 

// function searchPostForId(id) {
//     return posts.findIndex((post) => {
//         return post.id === Number(id);
//     });
// };


// app.get("/posts/:id", (req, res) => {
//     const index = searchPostForId(req.params.id);
//     res.status(200).json(posts[index]);
// });