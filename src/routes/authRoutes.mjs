import express from 'express'
import { registrarUsuario, login } from '../controllers/authController.mjs'

const router = express.Router();

router.post('/registrar', registrarUsuario);

router.post('/login', login);

export default router;
