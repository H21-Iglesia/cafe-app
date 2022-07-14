<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>CREAR PEDIDO</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
    
      <ion-list>
        <div v-for="producto in productos" :key="producto.id">
          <item-producto @cantidad="productos[producto.id].cantidad=$event"  :p="producto"></item-producto>
        </div>

      </ion-list>

    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <br>
        <ion-title>TOTAL: {{total}} bs</ion-title>
        <br>
        <ion-button expand="block" shape="round" color="primary" @click="openToast">PEDIR</ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonList, IonPage,IonTitle, IonToolbar,toastController } from '@ionic/vue';
import { defineComponent } from 'vue';
import ItemProducto from '@/components/ItemProducto.vue'
import { getProductos } from '@/data/productos';

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      productos: getProductos(),
      cantidad: 0,
      pedido: [],

    }
  },
  methods: {
    async openToast() {
      if(this.total>0){

        const toast = await toastController
          .create({
            message: 'Pedido completado.',
            duration: 1000
          })
        return toast.present();
      }else
      {
        const toast = await toastController
          .create({
            message: 'No hay productos selecionados.',
            duration: 1000
          })
        return toast.present();
      }
    },
    cargarPedido(pedido){

      this.pedido = pedido
      console.log(this.pedido)
    },
  
  },
  computed:{
    total(){
      var suma = 0
      var pedido = []
     for (var i = 0; i < this.productos.length; i++) {
       suma = suma + ( this.productos[i].cantidad * parseInt(this.productos[i].precio))

       if(this.productos[i].cantidad > 0){
        pedido.push(this.productos[i])
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
    ItemProducto
  },
});
</script>
