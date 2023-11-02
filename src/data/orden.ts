
export interface IOrden {
    productos: number[]
    nombre_cliente: string;
    monto_pagado: number;
    pagado: boolean
    tipopago_id: number
    estado_id:number
    estado: boolean;
}
export class Orden implements IOrden {
    productos: number[]
    nombre_cliente: string;
    monto_pagado: number;
    pagado: boolean;
    tipopago_id: number;
    estado_id:number;
    estado: boolean;
    
    constructor() {
        this.productos = []
        this.nombre_cliente = ""
        this.monto_pagado= 0;
        this.pagado= true
        this.tipopago_id = 1
        this.estado_id = 1
        this.estado = false

    }
}
