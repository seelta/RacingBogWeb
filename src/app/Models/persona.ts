import { DepMuniExpedicion } from "./dep-muni-expedicion";
import { TipoDocumento } from "./tipo-documento";
import { TipoPersona } from "./tipo-persona";

export class Persona {

    idPersona!: number;
    nombres?: string;
    apellidos?: string;
    idTipoDocumento?: TipoDocumento;
    idDepMuniExpedicion?: DepMuniExpedicion;
    fechaNacimiento?: string;
    sexo?: number;
    correo?: string;
    celular?: number;
    direccionRecidencia?: string;
    barrio?: string;
    estrato?: number;
    idTipoPersona?: TipoPersona;

    constructor(init?: Partial<Persona>) {
        Object.assign(this, init);
      }

}
