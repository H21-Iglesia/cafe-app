export interface Producto {
  nombre: string;
  precio: string;
  cantidad: number;
  completado: false;
  preparo: string;
  id: number;
}

const productos: Producto[] = [

  {
    nombre: 'Cafe americano',
    precio: '25',
    cantidad:0,
    completado: false,
    preparo:"",
    id: 0
  },
  {
    nombre: 'Cafe latte',
    precio: '10',
    cantidad:0,
    completado: false,
    preparo:"",
    id: 1
  },
  {
    nombre: 'Cafe europeo',
    precio: '30',
    cantidad:0,
    completado: false,
    preparo:"",
    id: 2
  },
  {
    nombre: 'Frape de chocolate',
    precio: '25',
    cantidad:0,
    completado: false,
    preparo:"",
    id: 3
  },
  {
    nombre: 'Frape de vainilla',
    precio: '25',
    cantidad:0,
    completado: false,
    preparo:"",
    id: 4
  },
  {
    nombre: 'Frape de caramelo',
    precio: '25',
    cantidad:0,
    completado: false,
    preparo:"",
    id: 5
  },
  {
    nombre: 'Capuchino',
    precio: '25',
    cantidad:0,
    completado: false,
    preparo:"",
    id: 6
  },
  {
    nombre: 'Cafe americano',
    precio: '25',
    cantidad:0,
    completado: false,
    preparo:"",
    id: 7
  },
  {
    nombre: 'Cafe americano',
    precio: '25',
    cantidad:0,
    completado: false,
    preparo:"",
    id: 8
  },


];

export const getProductos = () => productos;

export const getProducto= (id: number) => productos.find(p => p.id === id);