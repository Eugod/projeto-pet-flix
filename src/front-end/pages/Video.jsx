/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./video.css";

const API = "http://localhost:3000/";

export default function Video() {
    const { id, titulo } = useParams();
    const [video, setVideo] = useState(null);
    const linkRef = useRef(null);

    const buscarVideo = async () => {
        await axios.get(API + id)
            .then(({ data }) => {
                setVideo(data.resultado);
            }, err => {
                console.error("Video não encontrado", err);
            });
    }

    useEffect(() => {
        buscarVideo();
    }, []);

    const handleKeyPress = (event) => {
        if (event.keyCode === 8) {
            // Backspace
            if (linkRef.current) {
                linkRef.current.click();
            }
        }
    };

    useEffect(() => {
        document.body.addEventListener("keydown", handleKeyPress);

        return () => {
            document.body.removeEventListener("keydown", handleKeyPress);
        };
    }, [video]);

    return (
        <div className="container">
            <h1 className="video-titulo">{titulo}</h1>

            {video && video.length > 0 && video[0].linkvideo && (

                <div>
                    <iframe src={video[0].linkvideo} className="video"></iframe>
                </div>
            )}

            <Link to={"/"} ref={linkRef} className="btn-voltar">
                Voltar
            </Link>
        </div>
    )
}