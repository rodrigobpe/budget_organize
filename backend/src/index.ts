import { app } from "./app";
import { config } from "dotenv";

config()

const server = app
const PORT = process.env.PORT || 8001

server.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
})
