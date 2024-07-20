const { json } = require('express');
const fs = require('fs'); //importamos el modulo de filesystem de node para manejar los archivos
const { title } = require('process');
require('dotenv').config();
const { RUTAANIMES, RUTAESTUDIOS } = process.env;

const readDB = () => {
    const animes = fs.readFileSync(RUTAANIMES);
    const animePar = JSON.parse(animes);
    return animePar
}

const readEstudios = () => {
    const estudios = fs.readFileSync(RUTAESTUDIO);
    const estudioPar = JSON.parse(estudios);
    return estudioPar
}



const createAnimes = ( req, res) => {
    let animes = readDB();
    let estudio = readEstudios();
    console.log(estudio, typeof req.body.estudioId);
    estudio = estudio.find((element) => element.id === parseInt(req.body.estudioId))
    if (estudio) {
        const newAnime = {
            id: animes.length + 1,
            title: req.body.title || 'no se encontro',
            genre: req.body.genre,
            estudioId: parseInt(req.body.estudioId)
        };
        animes.push(newAnime);
        fs.writeFileSync(RUTAANIMES, JSON.stringify(animes, null, 2));
        res.status(201).json({
            "message": "Anime creado exitosamente",
            "anime": newAnime
          });
    } else {
        res.status(400).json({message: 'La peticion no esta bien estructurada.'})
    }
}

const readAnimes = (req, res) => {
    const animePar = readDB()
    res.status(200).json({"animes": animePar});
};

const readAnimesById = (req, res) => {
    let animePar = readDB();
    animePar = animePar.filter((element) => element.id === parseInt(req.params.id));
    if (animePar.length === 0) {
        res.status(404).json({message: "Anime no encontrado"})
    }
    res.status(200).json({"anime": animePar})
}

const updateAnimes = (req, res) => {
    let animePar = readDB();
    let estudio = readEstudios();
    let index = animePar.findIndex((element) => element.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({message: 'no se pudo encontrar'})

    estudio = estudio.find((element) => element.id === parseInt(req.body.estudioId))
    if (estudio) {
        animePar[index] = {
            ...animePar[index],
            title: req.body.title,
            genre: req.body.genre,
            estudioId: req.body.estudioId
        }

        fs.writeFileSync(RUTAANIMES, JSON.stringify(animePar, null, 2))
        res.status(200).json({message : 'actualizado correctamente' })
    }

}


const deleteAnime = (req, res) => {
    let animePar = readDB();
    let index = animePar.findIndex((element) => element.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({message: 'no se pudo encontrar'})
    animePar.splice(index, 1)
    fs.writeFileSync(RUTAANIMES, JSON.stringify(animePar, null, 2))
    res.status(200).json({message : 'anime eliminado correctamente' })
}


module.exports = { readAnimes, readAnimesById, createAnimes, updateAnimes, deleteAnime};
