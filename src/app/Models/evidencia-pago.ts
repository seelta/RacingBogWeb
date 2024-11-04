export class EvidenciaPago {

    cantidad?: number;
    urlEvidencia?: string;
    fechaCargueEvidencia?: string;  // Fecha en formato ISO (como string)
    detalleEvidencia?: string;
    fechaPago?: string;  // Fecha en formato ISO (como string)
    validaPago?: boolean | null;  // Puede ser true, false o null
    usuarioValidaPago?: number;
    fechaValidaPago?: string | null;  // Puede ser una fecha o null
    idMensualidad?: number;

    constructor(data?: Partial<EvidenciaPago>) {
        Object.assign(this, data);
    }

}
