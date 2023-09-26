/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


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
        <div>
            <h1>Vídeos</h1>

            {
                videos &&
                <div>
                    <Link to={`/video/${videos[videoAtual].id}/${videos[videoAtual].titulo}`} ref={linkRef}>
                        <img src={videos[videoAtual].capa} />
                        <h2>{videos[videoAtual].titulo}</h2>
                        <div>
                            <img src={videos[videoAtual].fotoperfil} />
                            <h3>{videos[videoAtual].nomeperfil}</h3>
                        </div>
                    </Link>
                </div>
            }

            <div>
                <button onClick={videoAnterior}>Anterior</button>
                <button onClick={proximoVideo}>Próximo</button>
            </div>
        </div>
    );
}