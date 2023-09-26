/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./home.css";


const API = "http://localhost:3000/";

export default function Home() {
    const [videos, setVideos] = useState(null);
    const [videoAtual, setVideoAtual] = useState(0);
    const linkRef = useRef(null);

    const buscarVideos = async () => {
        await axios.get(API)
            .then(({ data }) => {
                setVideos(data.resultado);
            }, err => {
                console.error("Video não encontrado", err);
            });
    }

    useEffect(() => {
        buscarVideos();
    }, []);

    const proximoVideo = () => {
        if (videoAtual < 9) {
            setVideoAtual(videoAtual + 1);
        } else {
            setVideoAtual(0);
        }
    }

    const videoAnterior = () => {
        if (videoAtual > 0) {
            setVideoAtual(videoAtual - 1);
        } else {
            setVideoAtual(9);
        }
    }

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.keyCode === 37) {
                // Seta pra esquerda
                videoAnterior();
            } else if (event.keyCode === 39) {
                // Seta pra direita
                proximoVideo();
            } else if (event.keyCode === 13) {
                // Enter
                if (linkRef.current) {
                    linkRef.current.click();
                }
            }
        };

        document.body.addEventListener("keydown", handleKeyPress);

        return () => {
            document.body.removeEventListener("keydown", handleKeyPress);
        };
    }, [videoAnterior, proximoVideo]);

    return (
        <div className="container">
            <h1 className="titulo">Vídeos</h1>

            {
                videos &&
                <div>
                    <Link to={`/video/${videos[videoAtual].id}/${videos[videoAtual].titulo}`} ref={linkRef} className="video-container">
                        <img src={videos[videoAtual].capa} className="capa-video" />

                        <div className="titulo-video-container">
                            <h2 className="titulo-video">{videos[videoAtual].titulo}</h2>
                        </div>

                        <div className="video-container-usuario">
                            <img src={videos[videoAtual].fotoperfil} className="img-usuario" />

                            <h3 className="nome-usuario">{videos[videoAtual].nomeperfil}</h3>
                        </div>
                    </Link>
                </div>
            }

            <div className="btn-container">
                <button onClick={videoAnterior} className="btn-anterior">Anterior</button>

                <button onClick={proximoVideo} className="btn-proximo">Próximo</button>
            </div>
        </div>
    );
}