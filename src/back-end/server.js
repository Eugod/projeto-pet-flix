/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import routerVideos from "./routes/videos.js"

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use("/", routerVideos);

app.listen(port, () => {
    console.log(`Servidor disponível na porta ${port}`)
})