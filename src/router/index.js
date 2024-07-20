const express = require('express');
const router = express.Router();
const animesRouter = require('./animeRouter');
const estudiosRouter = require('./estudiosRouter');
const directoresRouter = require('./directoresRouter');
const personajesRouter = require('./personajesRouter');

router.use('/animes', animesRouter );
router.use('/estudios', estudiosRouter );
router.use('/directores', directoresRouter );
router.use('/personajes', personajesRouter );

module.exports = router;
