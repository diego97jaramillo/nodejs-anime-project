const express = require('express');
const router = express.Router();
const {readDirectores, createDirectores, readDirectoresById, updateDirectores, deleteDirector} = require('./api/directores')

router.get("/", readDirectores);
router.get('/:id', readDirectoresById);
router.post('/', createDirectores);
router.put('/:id', updateDirectores);
router.delete('/:id', deleteDirector);

module.exports = router;
