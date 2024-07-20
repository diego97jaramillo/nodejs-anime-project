const express = require('express')
const router = express.Router()
const { readAnimes, readAnimesById, createAnimes, updateAnimes, deleteAnime} = require('./api/animes.js')

router.get('/', readAnimes);
router.get('/:id', readAnimesById );
router.post('/', createAnimes );
router.put('/:id', updateAnimes);
router.delete('/:id', deleteAnime);



module.exports = router;
