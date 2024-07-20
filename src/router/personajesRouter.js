const express = require('express');
const router = express.Router();
const {readPersonajes, createPersonaje, readPersonajesById, updatePersonajes, deletePersonaje} = require('./api/personajes');

router.get('/', readPersonajes)
router.get('/:id', readPersonajesById);
router.post('/', createPersonaje);
router.put('/:id', updatePersonajes);
router.delete('/:id', deletePersonaje);

module.exports = router
