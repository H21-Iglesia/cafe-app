export interface IProducto {
  nombre: string;
  precio: string;
  cantidad: number;
  completado: false;
  preparo: string;
  id: number;
  receta_id: number;
}

// export class Orden implements IOrden {
//   cliente: string;
//   estado: boolean;
//   Nro: number;

//   constructor() {
//       this.cliente = ""
//       this.estado = false
//       this.Nro = 0
//   }
// }


const productos: IProducto[] = [

  {
    nombre: 'Cafe americano',
    precio: '25',
    cantidad:0,
    completado: false,
    preparo:"Pendiente",
    id: 0,
    receta_id: 0
  },
  {
    nombre: 'Cafe latte',
    precio: '10',
    cantidad:0,
    completado: false,
    preparo:"Pendiente",
    id: 1,
    receta_id: 0
  },
  {
    nombre: 'Cafe europeo',
    precio: '30',
    cantidad:0,
    completado: false,
    preparo:"Pendiente",
    id: 2,
    receta_id: 0
  },
  {
    nombre: 'Frape de chocolate',
    precio: '25',
    cantidad:0,
    completado: false,
    preparo:"Pendiente",
    id: 3,
    receta_id: 0
  },
  {
    nombre: 'Frape de vainilla',
    precio: '25',
    cantidad:0,
    completado: false,
    preparo:"Pendiente",
    id: 4,
    receta_id: 0
  },
  {
    nombre: 'Frape de caramelo',
    precio: '25',
    cantidad:0,
    completado: false,
    preparo:"Pendiente",
    id: 5,
    receta_id: 0
  },
  {
    nombre: 'Capuchino',
    precio: '25',
    cantidad:0,
    completado: false,
    preparo:"Pendiente",
    id: 6,
    receta_id: 0
  },
  {
    nombre: 'Cafe americano',
    precio: '25',
    cantidad:0,
    completado: false,
    preparo:"Pendiente",
    id: 7,
    receta_id: 0
  },
  {
    nombre: 'Cafe americano',
    precio: '25',
    cantidad:0,
    completado: false,
    preparo:"Pendiente",
    id: 8,
    receta_id: 0
  },


];

export const getProductos = () => productos;

export const getProducto= (id: number) => productos.find(p => p.id === id);