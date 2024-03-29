export interface IProducto {
    nombre: string;
    precio: string;
    cantidad: number;
    stock: number;
    completado: boolean;
    preparo: string;
    id: number;
  }
  
  export class Producto implements IProducto {
    nombre: string;
    precio: string;
    cantidad: number;
    stock: number;
    completado: boolean;
    preparo: string;
    id: number;
    constructor() {
        this.nombre = ""
        this.precio = ""
        this.cantidad = 0
        this.stock = -1
        this.completado = false
        this.preparo = ""
        this.id =0
    }
  }