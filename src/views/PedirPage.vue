<template>
  <ion-page color="light">
    <ion-header mode="md">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button href="home">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title slot="end">CREAR PEDIDO</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <ion-list>
        <div v-for="producto in productos" :key="producto.id">
          <item-producto @cantidad="productos[producto.id].cantidad=$event" :p="producto"></item-producto>
        </div>

      </ion-list>

    </ion-content>

    <ion-footer mode="md">
      <ion-toolbar color="light">
        <ion-item color="light">
          <ion-label>Nombre: </ion-label>
          <ion-input @click="$event.target.value = nombre" @IonInput="nombre=$event.target.value.toString()">
          </ion-input>
        </ion-item>
        <br>
        <ion-title>TOTAL: {{total}} bs</ion-title>
        <br>

        <ion-button expand="block" shape="round" color="warning" @click="Pedir2">PEDIR</ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, toastController, IonButton, IonButtons, IonFooter, IonItem, IonInput, IonLabel } from '@ionic/vue';
import { defineComponent } from 'vue';
import ItemProducto from '@/components/ItemProducto.vue'
import { arrowBackOutline } from "ionicons/icons";
import { ApiService } from '../data/Services/ApiService';
import { Orden } from '../data/orden';

export default defineComponent({
  name: 'PedirPage',
  mounted() {
    localStorage.setItem("pedidos", JSON.stringify(this.pedidos))
    this.CargarProductos()
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
      pedidosRutas: "pedidos"

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


        console.log(JSON.parse(localStorage.getItem("pedidos")))
        console.log(this.pedidos)

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
    async Pedir2() {
      if (this.total <= 0) {
        return this.Notificar("No hay productos selecionados")
      }

      this.GuardarPedidoApi()
      this.limpiarProductos()
      this.Notificar("Pedido completado")

    },
    cargarPedido(pedido) {

      this.pedido = pedido

    },
    GuardarPedidoApi() {

      let orden = new Orden();

      orden.productos = this.pedido.map(function (producto) {
        return producto.id
      })

      orden.nombre_cliente = this.nombre

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
          duration: duracion
        })
      return toast.present();
    },
    async CargarProductos() {
      this.productos = await ApiService.obtener('producto')
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
    IonLabel
  },
});
</script>
<style scoped>
.input {
  background-color: rgb(196, 196, 196);
}
</style>