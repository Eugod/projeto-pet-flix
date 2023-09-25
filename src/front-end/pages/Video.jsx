/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:3000/";

export default function Video() {
    const { id, titulo } = useParams();

    const [video, setVideo] = useState(null);

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

    return (
        <div>
            <h1>{titulo}</h1>
            {
                video &&
                <div>
                    <iframe src={video[0].linkvideo}></iframe>
                </div>
            }
            <Link to={"/"}>
                Voltar
            </Link>
        </div>
    )
}