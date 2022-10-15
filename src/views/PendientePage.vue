<template>
  <ion-page>
    <ion-header mode="md">
      <ion-toolbar color="primary" >
          <ion-buttons slot="start" >
            <ion-button href="home"> <ion-icon :icon="arrowBackOutline" ></ion-icon></ion-button>
          </ion-buttons>
          <ion-title slot="end" >PEDIDOS PENDIENTES</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content  :fullscreen="true" color="warning" >


    <ion-refresher slot="fixed" @ionRefresh="Cargar($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <ion-card class="cards" >
  
        <ion-accordion-group v-for="(Pedido, index) in pedidos" :key="index" >
            <ion-accordion v-if="Pedido.estado_id != 6"  >
                  
                <ion-item slot="header" value="first" color="light">
                <ion-card-header >
                    <ion-card-title color="dark">#0{{Pedido.id + " - "+ Pedido.nombre_cliente}}</ion-card-title>
                </ion-card-header>
                </ion-item>

                <ion-card-content slot="content"  >
                <ion-item-sliding v-for="(pro, index) in Pedido.productos " :key="index" >
                        <ion-item-options side="end">
                            <ion-item-option @click="(pro.completado = true); GuardarProducto(Pedido);">LISTO</ion-item-option>
                        </ion-item-options>

                        <ion-item v-show="pro.completado == false"  >
                            <ion-checkbox color="warning"  slot="start" :checked="pro.completado" @click="(pro.completado = true); GuardarProducto(Pedido);" ></ion-checkbox>

                            <ion-label>{{pro.nombre }}</ion-label> 
                            <ion-select  placeholder="Pendiente"  >
                                <ion-select-option v-for="(trabajador, i) in trabajadores" :key="i"  :value="trabajador.nombre" >{{trabajador.nombre}}</ion-select-option>                             
                            </ion-select> 
                        </ion-item>
                        
                </ion-item-sliding>
                <ion-item-sliding  v-for="(pro, index) in Pedido.productos " :key="index" @disabled="true">
                        <ion-item-options side="end">
                            <ion-item-option>LISTO</ion-item-option>
                        </ion-item-options>

                        <ion-item color="medium" v-if="pro.completado" >
                            <ion-checkbox color="warning"  slot="start" :checked="pro.completado" @disabled="true"></ion-checkbox>

                            <ion-label>{{pro.nombre }}</ion-label> 
                            <ion-select selected-text="Listo"  @disabled="true">
                            </ion-select>
                        </ion-item>

                </ion-item-sliding>
                        <br>
                        <ion-button color="warning" expand="block" @click="Pedido.estado_id = 6; Guardar(Pedido.id,Pedido);" >COMPLETADO</ion-button>
                </ion-card-content>
    
            </ion-accordion>
        </ion-accordion-group>

    </ion-card>

    </ion-content >

  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage,IonTitle, IonToolbar,IonButton,IonButtons,IonItem, IonLabel , IonCard, IonCardContent, IonCardHeader,
   IonCardTitle, IonItemOption, IonItemOptions, IonItemSliding,IonRefresher, IonRefresherContent,IonSelect, IonSelectOption,IonAccordion, 
    IonAccordionGroup,IonCheckbox} from '@ionic/vue';
import { defineComponent } from 'vue';
import {ApiService} from '@/data/Services/ApiService';

import { arrowBackOutline} from "ionicons/icons";
import axios from 'axios';
import { Producto } from '@/data/Producto';


export default defineComponent({
  name: 'PendientePage',
  mounted(){
    this.mostrarPedidos()
  },
  data() {
    return {
      arrowBackOutline ,
      pedidos: null,
      trabajadores: [{nombre: 'Lucas'},{nombre:'Andres'},{nombre:'Carla'}],
      pedidocopia: null
    }
  },
  methods: {
    Cargar(event: CustomEvent){
      // this.pedidos =ApiService.obtener('pedido')
        // this.pedidos =  JSON.parse(localStorage.getItem("pedidos"))
        this.mostrarPedidos()
        console.log(this.pedidos )

        console.log('Begin async operation');
        setTimeout(() => {
        // eslint-disable-next-line no-undef
        const target = event.target as HTMLIonRefresherElement;
        console.log('Async operation has ended');
        target.complete();
        }, 500);
    },
    GuardarProducto(pedido){
     
      console.log(pedido)
      // ApiService.actualizar('pedido',idpedido,idproducto)
    },
    Guardar(id,datos){
          ApiService.actualizar('pedido',id,datos)
     
    },
    mostrarPedidos(){
            axios.get('https://apicafe.h21iglesia.org/api/pedido')
            .then(this.CargarProductos) 
    },
    CargarProductos(response){
      axios.get('https://apicafe.h21iglesia.org/api/producto')
      .then(Productos => this.traerProductos(response,Productos.data)) 
    },
    traerProductos(response,listaPro){
      let pedidos = []

      response.data.forEach(pedido => {
        let productos = []
    
        pedido.productos.forEach(producto => {
          const pedidoProductoId = producto.id
          producto = listaPro.find(p => p.id == producto.id)
          producto.id = pedidoProductoId
          productos.push(producto)
        });
        pedido.productos = productos
        pedidos.push(pedido)
      });
      this.pedidos = pedidos
      console.log(this.pedidos)
    },


  },
  computed:{
    
  },
  components: {
    IonContent, IonHeader, IonPage,IonTitle, IonToolbar,IonButton,IonButtons,IonItem, IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle,IonItemOption, IonItemOptions, IonItemSliding
    ,IonRefresher, IonRefresherContent,IonSelect, IonSelectOption,IonAccordion,IonAccordionGroup,IonCheckbox
  }
});
</script>
<style scoped>

</style>