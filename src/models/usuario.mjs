import bcrypt from 'bcryptjs';
class Usuario {
    constructor(id, nombre, email, passwordHash){
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.passwordHash = passwordHash;
    }


    static async hashPassword(password){
        return await bcrypt.hash(password, 10);
    } 

    async comparePassword(password){
        return await bcrypt.compare(password, this.passwordHash);
    }
}
export default Usuario;
