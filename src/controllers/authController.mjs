import jwt from 'jsonwebtoken'
import Usuario from '../models/usuario.mjs'
const JWT_SECRET= process.env.JWT_SECRET;
let usuarios= []

function generarTokenUsuario(usuario){
    if (!JWT_SECRET){
        throw new Error ('No se ha definido un token');

    }
    return jwt.sign({id: usuario.id, name:usuario.name}, JWT_SECRET, {expiresIn: '1h' });

}

export async function registrarUsuario(req, res){ 
    const {name, email, password} = req.body; 
    const usuarioExistente = usuarios.find(u => u.email === email); 

    if(usuarioExistente){ 
        return res.status(409).send({error: 'El usuario ya existe'});
    }
    const hashedPass= await Usuario.encriptarPassword(password); 
    const nuevoUsuario = new Usuario(Date.now().toString(), name, email, hashedPass); 
    usuarios.push(nuevoUsuario);

    res.status(201).send('Usuario registrado con exito');
}

export async function login (req, res){ //login del usuario
    const {email, password} = req.body; //le voy a pedir el email y pass
    const usuario= usuarios.find(u => u.email === email); //verifico que el usuario este 

    if(!usuario || await usuario.compararPassword(password)){ //si usuario vacio o la contrase;a no es correcta 
        return res.status(401).send({error: 'Usuario o contraseña incorrectos'});//devuelvo error
    }
//sino genero un token 
    const token = generarTokenUsuario(usuario);
    res.json({token});

}