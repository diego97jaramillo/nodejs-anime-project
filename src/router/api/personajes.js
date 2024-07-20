const fs = require('fs'); //importamos el modulo de filesystem de node para manejar los archivos
require('dotenv').config();
const { RUTAPERSONAJES, RUTAANIMES } = process.env;

const animesBD = () => {
    const animes = fs.readFileSync(RUTAANIMES);
    const anime = JSON.parse(animes);
    return anime
}
const readDB = () => {
    const personajesArray = fs.readFileSync( RUTAPERSONAJES);
    const personajes = JSON.parse(personajesArray);
    return personajes
}


const createPersonaje = (req, res) => {
    let  personaje = readDB();
    let animes = animesBD();
    console.log(animes);
    animes = animes.find((element) => element.id === parseInt(req.body.animeId))
    console.log(animes);
    if (animes) {
        const newPersonaje = {
            id: personaje.length + 1,
            name: req.body.name,
            animeId: parseInt(req.body.animeId)
        };
        personaje.push(newPersonaje);
        fs.writeFileSync(RUTAPERSONAJES, JSON.stringify(personaje, null, 2));
        res.status(201).json({
            "message": "personaje creado exitosamente",
            "personaje": newPersonaje
          });
    } else if ( animes === undefined ) {
        res.status(404).json({message: 'No se encontró el anime.'})
    }else {
        res.status(400).json({message: 'La peticion no esta bien estructurada.'})
    }
}

const readPersonajes = (req, res) => {
    const personaje = readDB()
    res.status(200).json({"Personaje": personaje});
};

const readPersonajesById = (req, res) => {
    let personajes = readDB();
    personajes = personajes.find((element) => element.id === parseInt(req.params.id));
    if (personajes === undefined) {
        res.status(404).json({message: "Personaje no encontrado"})
    }
    res.status(200).json({"Personaje": personajes})
}

const updatePersonajes = (req, res) => {
    let personajes = readDB();
    let animes = animesBD();
    let index = personajes.findIndex((element) => element.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({message: 'no se pudo encontrar'})

    animes = animes.find((element) => element.id === parseInt(req.body.animeId))
    console.log(animes);
    if (animes === undefined) {
        res.status(404).json({mensaje: "ese id de anime no existe"})
    }
    personajes[index] = {
        ...personajes[index],
        name: req.body.name,
        animeId: req.body.animeId
    }

    fs.writeFileSync(RUTAPERSONAJES, JSON.stringify(personajes, null, 2))
    res.status(200).json({message : 'actualizado correctamente' })

}


const deletePersonaje = (req, res) => {
    let personajes = readDB();
    let index = personajes.findIndex((element) => element.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({message: 'no se pudo encontrar'})
    personajes.splice(index, 1)
    fs.writeFileSync(RUTAPERSONAJES, JSON.stringify(personajes, null, 2))
    res.status(200).json({message : 'personaje eliminado correctamente' })
}




module.exports = { readPersonajes, createPersonaje, readPersonajesById, updatePersonajes, deletePersonaje };
