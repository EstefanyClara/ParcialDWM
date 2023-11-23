import express from 'express'
import { getJugadores, altaJugador, bajaJugador, modificarJugador, convocarJugador, listarConvocados } from '../controllers/jugadoresControllers.mjs';

const router = express.Router();

router.get('/', getJugadores);

router.post('/', altaJugador);

router.delete('/:id', bajaJugador);

router.put('/:id', modificarJugador);

router.post('/convocar/:id', convocarJugador);

router.get('/convocados', listarConvocados);

export default router;