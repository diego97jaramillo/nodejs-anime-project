const fs = require('fs'); //importamos el modulo de filesystem de node para manejar los archivos
require('dotenv').config();
const { RUTADIRECTORES } = process.env;

const readDB = () => {
    const directores = fs.readFileSync(RUTADIRECTORES);
    const directorPar = JSON.parse(directores);
    return directorPar
}

const createDirectores = (req, res) => {
    let directores = readDB();
    const newDirector = {
        id: directores.length + 1,
        name: req.body.name
    };
    directores.push(newDirector);
    fs.writeFileSync(RUTADIRECTORES, JSON.stringify(directores, null, 2));
    res.status(201).json({
        "message": "director creado exitosamente",
        "director": newDirector
      });
}

const readDirectores = (req, res) => {
    const directoresPar = readDB()
    res.status(200).json({"directores": directoresPar});
};

const readDirectoresById = (req, res) => {
    let directoresPar = readDB();
    directoresPar = directoresPar.filter((element) => element.id === parseInt(req.params.id));
    if (directoresPar.length === 0) {
        res.status(404).json({message: "director no encontrado"})
    }
    res.status(200).json({"director": directoresPar})
}

const updateDirectores = (req, res) => {
    let directorPar = readDB();
    let index = directorPar.findIndex((element) => element.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({message: 'no se pudo encontrar'});
    directorPar[index] = {
        ...directorPar[index],
        name: req.body.name
    };

    fs.writeFileSync(RUTADIRECTORES, JSON.stringify(directorPar, null, 2));
    res.status(200).json({message : 'actualizado correctamente' });
}


const deleteDirector = (req, res) => {
    let directores = readDB();
    let index = directores.findIndex((element) => element.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({message: 'no se pudo encontrar'})
    directores = directores.filter((element) => element.id !== parseInt(req.params.id))
    fs.writeFileSync(RUTADIRECTORES, JSON.stringify(directores, null, 2))
    res.status(200).json({message : 'director eliminado correctamente' })
}

module.exports = { readDirectores, createDirectores, readDirectoresById, updateDirectores, deleteDirector};
