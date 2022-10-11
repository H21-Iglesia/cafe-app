

export interface IOrden {
    productos: number[]
    nombre_cliente: string;
    monto_pagado: number;
    fecha: string;
    pagado: boolean
    tipopago_id: number
    estado_id:number
    estado: boolean;
    Nro: number;
}
export class Orden implements IOrden {
    productos: number[]
    nombre_cliente: string;
    monto_pagado: number;
    fecha: string;
    pagado: boolean;
    tipopago_id: number;
    estado_id:number;
    estado: boolean;
    Nro: number;

    constructor() {
        this.productos = []
        this.nombre_cliente = ""
        this.monto_pagado= 0;
        this.fecha = "SIN FECHA";
        this.pagado= false
        this.tipopago_id = 0
        this.estado_id = 1
        this.estado = false
        this.Nro = 0
    }
}
