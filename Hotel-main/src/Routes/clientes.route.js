const {express} = require("express");

const rutaCliente = express();

const cliente = require("../src/clientes.controllers");


rutaCliente.get("/:dni",cliente.buscarCliente);

rutaCliente.get("/",cliente.totalCliente);


rutaCliente.post("/",cliente.crearCliente);

rutaCliente.delete("/:dni", cliente.borrarCliente);


module.exports = {rutaCliente}