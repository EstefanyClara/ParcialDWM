import express from 'express';
import 'dotenv/config';
import authRoutes from './src/routes/authRoutes.mjs'
import verificarToken from './src/middlewares/authMiddleware.mjs';
import jugadoresRoutes from './src/routes/jugadoresRoutes.mjs'
import errorHandler from './src/middlewares/errorMiddleware.mjs';

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(verificarToken);

app.use('/jugadores', jugadoresRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log (`Servidor corriendo en el puerto ${PORT}`);
});
