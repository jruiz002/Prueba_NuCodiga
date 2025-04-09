const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

//Importo los modelos de la DB
require("./models/factura")
require("./models/detalleFactura")

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/test", require("./routes/testRoutes"))
app.use("/invoice", require("./routes/facturaRoutes"))

const PORT = process.env.PORT || 5000;

// Se sincroniza la base de datos y se espera a que se resuelva la promesa para que el server empiece a recibir requests
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
});