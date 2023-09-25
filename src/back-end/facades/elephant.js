/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

class ElephantFacade {
    async conectarDatabase() {
        try {
            this.client = new pg.Client(process.env.DATABASE);

            await this.client.connect();

            console.log("Conexão com o banco de dados ElephantSQL estabelecida.");
        } catch (erro) {
            console.error("Erro ao conectar ao banco de dados ElephantSQL.");
        }
    }

    async desconectarDatabase() {
        try {
            await this.client.end();

            console.log("Conexão com o banco de dados ElephantSQL encerrada.");
        } catch (erro) {
            console.error("Erro ao desconectar do banco de dados ElephantSQL.");
        }
    }
}

export default ElephantFacade;