/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import ElephantFacade from "./elephant.js";
const elephantFacade = new ElephantFacade();

class VideosFacade {
    async conectarDatabase() {
        try {
            await elephantFacade.conectarDatabase();
        } catch (erro) {
            console.error("Erro ao conectar ao banco de dados:", erro);
        }
    }

    async desconectarDatabase() {
        try {
            await elephantFacade.desconectarDatabase();
        } catch (erro) {
            console.error("Erro ao desconectar do banco de dados:", erro);
        }
    }

    async buscarTodosVideos() {
        try {
            const comando = "SELECT * FROM videos";

            const resultado = await elephantFacade.client.query(comando);

            return resultado.rows;
        } catch (erro) {
            console.error(erro);

            return [];
        }
    }

    async buscarVideoAtual(id) {
        try {
            const comando = `SELECT * FROM videos WHERE id = ${id}`;

            const resultado = await elephantFacade.client.query(comando);

            return resultado.rows;
        } catch (erro) {
            console.error(erro);

            return [];
        }
    }
}

export default VideosFacade;