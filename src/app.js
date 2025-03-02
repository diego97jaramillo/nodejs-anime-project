const express = require('express'); //acá importamos el modulo Express
require('dotenv').config(); //acá importamos la configuración de entorno del proyecto
const router = require('./router/index.js'); //estamos importando el router desde la carpeta router
const errorServerHandler = require('./middlewares/errorHandler.js')
const app = express();

const { PORT } = process.env;

app.use(express.json())
app.use(router);
app.use(errorServerHandler);

app.listen(PORT , () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});


