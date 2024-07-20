const express = require('express')
const router = express.Router()
const {readEstudios, createEstudios, readEstudiosById, updateEstudios, deleteEstudio} = require('./api/estudios.js')

router.get('/', readEstudios);
router.get('/:id', readEstudiosById);
router.post('/', createEstudios);
router.put('/:id', updateEstudios);
router.delete('/:id', deleteEstudio);




module.exports = router;
