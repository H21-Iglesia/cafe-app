<template>
  <ion-page color="light">
    <ion-header mode="md">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button router-link="/home" router-direction="back">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title slot="end">CREAR PEDIDO</ion-title>
        <ion-item color="primary">
          <ion-input placeholder="Buscar" ref="myInput" autofocus @IonInput="BuscarProductosFiltro($event.target.value.toString())" @click="$event.target.value = '';BuscarProductosFiltro('') " >
          </ion-input>
        </ion-item>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <ion-list >
        <div v-for="producto in productosfiltrados" :key="producto.id" >
          <item-producto  class="list" @cantidad="productos[producto.id].cantidad=$event" :p="producto"></item-producto>
        </div>
      </ion-list>

    </ion-content>

    <ion-footer mode="md">
      <ion-toolbar color="light">

        <ion-item color="light">
          <ion-label>Cliente: </ion-label>
          <ion-input @click="$event.target.value = nombre" @IonInput="nombre=$event.target.value.toString()">
          </ion-input>
        </ion-item>
        <ion-item color="light">
        <ion-label class="ion-text-wrap" ion-fixed > Pedido: {{mostrarPedido}}</ion-label>
        </ion-item>
        <br>
        <ion-title>TOTAL: {{total}} bs</ion-title>
        <br>
        <ion-buttons class="botones">
          <ion-button fill="solid" class="pedir" shape="round" color="warning" @click="Pedir2(true)">PEDIR</ion-button>
          <ion-button  fill="solid" class="deuda" shape="round" color="tertiary" @click="Pedir2(false)">DEUDA</ion-button>
        </ion-buttons>

      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, toastController, IonButton, IonButtons, IonFooter, IonItem, IonInput, IonLabel} from '@ionic/vue';
import { defineComponent } from 'vue';
import ItemProducto from '@/components/ItemProducto.vue'
import { arrowBackOutline } from "ionicons/icons";
import { ApiService } from '../data/Services/ApiService';
import { Orden } from '../data/orden';
import {ably} from "../data/Services/SocketService"

export default defineComponent({
  name: 'PedirPage',
  ionViewDidEnter() {
    localStorage.setItem("pedidos", JSON.stringify(this.pedidos))
    this.CargarProductos()
    this.FocusBuscar()
  },
  data() {
    return {
      arrowBackOutline,

      productos: this.CargarProductos(),
      cantidad: 0,
      pedido: [],
      nombre: "",
      ordenes: { productos: {}, cliente: "", estado: true, },
      pedidos: [],
      NroOrden: 0,
      pedidosRutas: "pedidos",
      productosfiltrados:null,
      inputValue: '',

  
    }
  },
  methods: {
    async Pedir() {
      if (this.total > 0 && this.nombre != "") {

        var pedidos = JSON.parse(localStorage.getItem("pedidos"))

        this.ordenes.productos = this.pedido
        this.ordenes.cliente = this.nombre

        pedidos.push(this.ordenes)

        localStorage.setItem("pedidos", JSON.stringify(pedidos))

        this.cantidad = 0
        this.nombre = ""
        this.pedido = []

        for (let i = 0; i < Object.entries(this.productos).length; i++) {
          this.productos[i].cantidad = 0;
        }

        const toast = await toastController
          .create({
            message: 'Pedido completado.',
            duration: 1000
          })
        return toast.present();
      } else {
        const toast = await toastController
          .create({
            message: 'Complete todos los campos',
            duration: 1000
          })
        return toast.present();
      }
    },
    async Pedir2(pagado:boolean) {
      if (this.total <= 0) {
        return this.Notificar("No hay productos selecionados")
      }

      this.GuardarPedidoApi(pagado)
      this.limpiarProductos()
      this.Notificar("Pedido completado")
      this.publishSocket()
      this.FocusBuscar()
    },
    cargarPedido(pedido) {

      this.pedido = pedido

    },
    GuardarPedidoApi(pagado:boolean) {

      let orden = new Orden();

      orden.productos = this.pedido.map(function (producto) {
        return producto.id
      })

      orden.nombre_cliente = this.nombre
      orden.pagado =  pagado

      this.NroOrden++


      ApiService.crear('pedido', orden)

    },
    limpiarProductos() {

      this.cantidad = 0
      this.nombre = ""
      this.pedido = []

      for (let i = 0; i < Object.entries(this.productos).length; i++) {
        this.productos[i].cantidad = 0;
      }
    },
    async Notificar(mensaje, duracion = 1000) {
      const toast = await toastController
        .create({
          message: mensaje,
          duration: duracion,
          position: "bottom",
          color: 'warning'
        })
      return toast.present();
    },
    async CargarProductos() {
      this.productos = await ApiService.obtener('producto')
      this.productosfiltrados = this.productos
    },
    BuscarProductosFiltro(texto){
      if(texto){
        this.productosfiltrados = this.productos.filter(item =>{    
          let itemtexto = (item.nombre).toUpperCase()
          return itemtexto.indexOf(texto.toUpperCase()) > -1;
        })
      }else{
        this.productosfiltrados = this.productos;
      }
    },
    async publishSocket(){
      const channel = ably.channels.get('pedidos');
      await channel.publish('comida', 'Nuevo pedido');
    },
    FocusBuscar(){
      this.$nextTick(() => {
        const input = (this.$refs.myInput as InstanceType<typeof IonInput>).$el.querySelector('input') as HTMLInputElement;
        if (input) {
          input.focus();
        }
      });
    }
  },
  computed: {
    total() {
      var suma = 0
      var pedido = []
      for (var i = 0; i < Object.entries(this.productos).length; i++) {

        if (this.productos[i].cantidad > 0) {
          suma = suma + ((this.productos[i].cantidad) * parseInt(this.productos[i].costo))
        }
        if (this.productos[i].cantidad > 0) {
          for (let index = 0; index < this.productos[i].cantidad; index++) {
            pedido.push(this.productos[i])
          }
        }
      }
      this.cargarPedido(pedido)

      return suma
    },
    mostrarPedido(){
      let pedidolista = []
      let pedidolistaConCantidad = []

      for (let i = 0; i < this.pedido.length; i++) {
        if(!pedidolista.includes(this.pedido[i].nombre)){
          pedidolista.push(this.pedido[i].nombre)
          pedidolistaConCantidad.push(( ' '+ this.pedido[i].cantidad + ' '+  this.pedido[i].nombre))
        }
      }

      return pedidolistaConCantidad.toString()
    }
  },
  components: {
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    ItemProducto,
    IonButton,
    IonButtons,
    IonFooter,
    IonItem,
    IonInput,
    IonLabel,
    
  },
});
</script>
<style scoped>
.input {
  background-color: rgb(196, 196, 196);
}
.list{
  max-width:100%
}
.pedir{
  min-width: 70%;
  height: 40px;
}
.deuda{
  width: 100%;
  height: 40px;
}
.botones{
  height: 50px;
}

</style>