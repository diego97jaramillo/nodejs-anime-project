const fs = require('fs'); //importamos el modulo de filesystem de node para manejar los archivos
require('dotenv').config();
const { RUTAESTUDIOS } = process.env;

const readDB = () => {
    let estudios = fs.readFileSync(RUTAESTUDIOS);
    estudios = JSON.parse(estudios);
    return estudios
}


const readEstudios = (req, res) => {
    let estudioPar = readDB()
    res.status(200).json({"estudio": estudioPar});
};

const createEstudios = (req, res) => {
    let estudios = readDB();
    const newEstudio = {
        id: estudios.length + 1,
        name: req.body.name
    };
    estudios.push(newEstudio);
    fs.writeFileSync(RUTAESTUDIOS, JSON.stringify(estudios, null, 2));
    res.status(201).json({
        "message": "estudio creado exitosamente",
        "estudio": newEstudio
      });
}

const readDirectores = (req, res) => {
    const directoresPar = readDB()
    res.status(200).json({"directores": directoresPar});
};

const readEstudiosById = (req, res) => {
    let estudiosPar = readDB();
    estudiosPar = estudiosPar.find((element) => element.id === parseInt(req.params.id));
    console.log(estudiosPar);
    if (estudiosPar === undefined) {
        res.status(404).json({message: "estudio no encontrado"})
    }
    res.status(200).json({"director": estudiosPar})
}

const updateEstudios = (req, res) => {
    let estudios = readDB();
    let index = estudios.findIndex((element) => element.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({message: 'no se pudo encontrar'});
    estudios[index] = {
        ...estudios[index],
        name: req.body.name
    };

    fs.writeFileSync(RUTAESTUDIOS, JSON.stringify(estudios, null, 2));
    res.status(200).json({message : 'actualizado correctamente' });
}


const deleteEstudio = (req, res) => {
    let estudios = readDB();
    let index = estudios.findIndex((element) => element.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({message: 'no se pudo encontrar'})
    estudios = estudios.filter((element) => element.id !== parseInt(req.params.id))
    fs.writeFileSync(RUTAESTUDIOS, JSON.stringify(estudios, null, 2))
    res.status(200).json({message : 'estudios eliminado correctamente' })
}


module.exports = { readEstudios, createEstudios, readEstudiosById, updateEstudios, deleteEstudio };
