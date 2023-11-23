class Jugador {

    constructor ( id = String , name= String , posicion = String, suspendido= Boolean, lesionado= Boolean ){
        this.id= id;
        this.name= name;
        this.position= position;
        this.suspended= suspended;
        this.injured= injured;


         
         if (position === 'GK' || position === 'DF'|| position === 'MD' || position === 'FW') {
            this.position = position;
        } else {
            throw new Error("La posición solo puede ser 'WD' o 'GW'");
        }
    }
}
export default Jugador;
