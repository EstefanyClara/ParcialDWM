import fs from 'fs';
import Jugador from "../models/jugador.mjs";

let jugadores = [];

fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    jugadores = JSON.parse(data);
});

let jugadoresConvocados = [];

let mdPlayer= false;
let gkPLayer = false;
let dfPlayer = false;
let fwPlayer = false;


// Obtener los jugadores 
export function getJugadores(req, res){
    res.json(jugadores);
}
//para dar de alta un jugador 
export function altaJugador(req, res) {
    const nuevoJugador = new Jugador(req.body.id, req.body.name, req.body.position, req.body.suspended, req.body.injured);
    jugadores.push(nuevoJugador);
    res.status(201).send('Jugador agregado correctamente');
    
}

//para dar de baja un jugador
export function bajaJugador(req, res) {
    const { id }= req.params;
    const jugador = jugadores.find(j => j.id === id);
    if (jugador){
        jugadores = jugadores.filter(j => j.id !== id);
        res.status(200).send('Jugador eliminado correctamente');
    }else{
        res.status(404).send('Jugador no encontrado');
    }
}
export function modificarJugador(req, res) {
    const { id }= req.params;
    const jugador = jugadores.find(j => j.id === id);
    if (jugador){
        const {position, suspended, injured } = req.body;
        jugador.position = position;
        jugador.suspended = suspended;
        jugador.injured = injured;
        res.status(200).send('Jugador modificado correctamente');
    }else{
        res.status(404).send('Jugador no encontrado');
    }
}
//CONVOCAR JUGADORES
export function convocarJugador(req, res) {
    const { id }= req.params;
    const jugador = jugadores.find(j => j.id === id); // lo busco 
    const jugadorNoConvocado = jugadoresConvocados.find( j=> j.id === id); //verifico que el jugador ya no haya sido convocado 
    if (jugador && jugador.injured == false && jugador.suspended == false && !jugadorNoConvocado){
        jugadoresConvocados.push(jugador);
        res.status(200).send('Jugador convocado correctamente');
        if(jugador.position == GK || jugador.position == DF || jugador.position == MD || jugador.position == FW) {
            if(jugador.position == GK){
                gkPlayer = true;
            }else if(jugador.position == DF){
                dfPlayer = true;
            }else if(jugador.position == MD){
                mdPlayer = true;
            }else if(jugador.position == FW){
                fwPlayer = true;
            } // se que lo hice medio turbio 
        }
    }else if(jugador){
        res.status(200).send('El jugador no cumple con las condiciones para ser convocado');
    }else{
        res.status(404).send('Jugador no encontrado');
    }
}

//LISTAR JUGADORES CONVOCADOS
export function listarConvocados(req, res){
    if(jugadoresConvocados.length == 22 && gkPLayer == true && dfPlayer== true && mdPlayer== true && fwPlayer== true){
        res.json(jugadoresConvocados);
    }else{
        res.status(404).send('No se han convocado 22 jugadores');
    }
}
