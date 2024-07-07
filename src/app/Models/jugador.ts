import { Estado } from "./estado";
import { Persona } from "./persona";
import { Programa } from "./programa";

export class Jugador {

    idJugador?: number;
    idPersona?: Persona;
    idPrograma?: Programa;
    posicion?: string;
    portero?: boolean;
    estatura?: number;
    peso?: number;
    uniTalla?: string;
    uniNombreEstampado?: string;
    uniNumeroEstampado?: number;
    uniEntreTalla?: string;
    uniEntreNumero?: number;
    autorizacionLlegaSalida?: boolean;
    idEstado?: Estado;
    fecha_creacion?: string;
    fecha_modificacion?: string;
}
