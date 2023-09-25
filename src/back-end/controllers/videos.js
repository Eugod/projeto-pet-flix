/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import VideosFacade from "../facades/videos.js";
const videosFacade = new VideosFacade();

export const buscarTodosVideos = async (req, res) => {
    videosFacade.conectarDatabase();

    const resultado = await videosFacade.buscarTodosVideos();

    res.status(200).send({ resultado });

    videosFacade.desconectarDatabase();
}

export const buscarVideoAtual = async (req, res) => {
    const { id } = req.params;

    videosFacade.conectarDatabase();

    const resultado = await videosFacade.buscarVideoAtual(id);

    res.status(200).send({ resultado });

    videosFacade.desconectarDatabase();
}
