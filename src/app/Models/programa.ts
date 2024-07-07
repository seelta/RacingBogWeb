import { Profesor } from "./profesor";

export class Programa {

    idPrograma?: number;
    nombrePrograma?: string;
    descripcion?: string;
    idProfesor?: Profesor;
    baner?: string;
    costoAfiliacion?: number;
    incluyeAfiliacion?: string;
    costoMensualidad?: number;
    recargo?: number;
    incluyeMensualidad?: string;
    horario?: string;
}
