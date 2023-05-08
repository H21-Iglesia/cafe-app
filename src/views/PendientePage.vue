<template>
  <ion-page>
    <ion-header mode="md">
      <ion-toolbar color="primary">        
        <ion-buttons slot="start">
          <ion-button router-link="/" router-direction="back">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title slot="end">PEDIDOS</ion-title>     
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" color="secondary">

      <ion-refresher slot="fixed" @ionRefresh="Cargar($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-card class="cards">

        <ion-accordion-group v-for="(Pedido, index) in pedidos" :key="index">
          <ion-accordion v-if="estado != 2 ? Pedido.estado_id != 2 && ((hoy.toLocaleDateString()) == convertirFecha(Pedido.created_at).toLocaleDateString()): true">

            <ion-item slot="header" value="first" color="light">
              <ion-card-header>        
                <ion-card-title color="dark">#{{Pedido.id + " - "+ (Pedido.nombre_cliente? Pedido.nombre_cliente:"Pedido") }} <ion-badge color="danger" v-show="!Pedido.pagado" >DEUDA</ion-badge> </ion-card-title>                       
              </ion-card-header>
            </ion-item>

            <ion-card-content slot="content" mode="md">
              <ion-item-sliding v-for="(detalle, index) in Pedido.pedido_detalle " :key="index">
                <ion-item-options side="end">
                  <ion-item-option @click="(detalle.completado = true); GuardarProducto(detalle);">LISTO
                  </ion-item-option>
                </ion-item-options>

                <ion-item v-show="detalle.completado == false">
                  <ion-checkbox color="warning" slot="start" :checked="detalle.completado"
                    @click="(detalle.completado = true); GuardarProducto(detalle);"></ion-checkbox>

                  <ion-label class="ion-text-wrap">{{detalle.producto.nombre }}</ion-label>
                  <!-- <ion-select :selectedText=detalle.preparo 
                    @ionChange="GuaradarSelectTrabajador($event.detail.value,detalle)" interface="popover">
                    <ion-select-option v-for="(trabajador, i) in trabajadores" :key="i" :value="trabajador.nombre">
                      {{trabajador.nombre}}
                    </ion-select-option>
                  </ion-select> -->
                </ion-item>

              </ion-item-sliding>
              
              <ion-item-sliding v-for="(detalle, index) in Pedido.pedido_detalle " :key="index" :disabled="true">
                <ion-item color="medium" v-if="detalle.completado">
                  <ion-checkbox color="warning"  :checked="detalle.completado" :disabled="true">
                  </ion-checkbox>

                  <ion-label class="ion-text-wrap">{{detalle.producto.nombre }}</ion-label>
                  <!-- <ion-select :selectedText=detalle.preparo :disabled="true">
                  </ion-select> -->
                </ion-item>
              </ion-item-sliding>                        
              <br>
              <ion-button color="danger" expand="block" v-if="Pedido.pagado == 0" @click="Pedido.pagado = 1; GuardarPedido(Pedido);">
                PAGAR DEUDA
              </ion-button>
              <ion-button color="warning" expand="block" v-if="estado == 1" @click="Pedido.estado_id = 2; GuardarPedido(Pedido); publishSocket(Pedido.id);">
                PEDIDO COMPLETADO
              </ion-button>
              <ion-grid>
                <ion-row class="ion-text-center">
                  <ion-col>
                    <ion-label> {{convertirFecha(Pedido.created_at).toLocaleDateString('es-ES', {day: 'numeric', month: 'long'})}}</ion-label> -
                    <ion-label> subtotal: {{ subTotal(Pedido.pedido_detalle) }} bs</ion-label>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-card-content>

          </ion-accordion>
        </ion-accordion-group>

      </ion-card>

    </ion-content>
    <ion-footer mode="md">
      <ion-toolbar color="light">
        <ion-segment value="default" color="warning">
          <ion-segment-button value="default" @click="estado = 1">
            <ion-label>Pendientes</ion-label>
          </ion-segment-button>
          <ion-segment-button value="segment" @click="estado = 2">
            <ion-label>Todos</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonItem, IonLabel, IonCard, IonCardContent, IonCardHeader,
  IonCardTitle, IonItemOption, IonItemOptions, IonItemSliding, IonRefresher, IonRefresherContent, IonAccordion,
  IonAccordionGroup, IonCheckbox, IonSegment, IonSegmentButton,IonFooter,toastController,IonBadge,IonGrid,IonRow,IonCol
  //IonSelect, IonSelectOption,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { ApiService } from '@/data/Services/ApiService';
import { arrowBackOutline } from "ionicons/icons";
import {ably} from "../data/Services/SocketService"
import {Howl} from 'howler';

export default defineComponent({
  name: 'PendientePage',
  
  mounted() {
    this.obtenerPedidosApi()
    this.suscribeSocketPedidos()
    this.suscribeSocketCompletados()
    this.sound = new Howl({
                    src: ['https://apicafe.h21iglesia.org/sounds/pristine-609.mp3'],
                    html5: true
                });
    this.obtenerFecha()
  },
  data() {
    return {
      arrowBackOutline,
      pedidos: null,
      trabajadores: [{ nombre: 'Lucas' }, { nombre: 'Sarah Mendez' }, { nombre: 'Emily' }, { nombre: 'Mateo' }, { nombre: 'Nicol' }, { nombre: 'Gabriel' }, { nombre: 'Andrea' }, { nombre: 'Alejandra' }, { nombre: 'Sarah Antelo' }, { nombre: 'Alvaro' }, { nombre: 'Tammy' }],
      pedidocopia: null,
      estado: 1, 
      sound: null,
      hoy:null    
    }
  },
  methods: {
    Cargar(event: CustomEvent) {
      this.obtenerPedidosApi()
      setTimeout(() => {
        // eslint-disable-next-line no-undef
        const target = event.target as HTMLIonRefresherElement;
        target.complete();
      }, 500);
    },
    GuardarProducto(detalle) {
      ApiService.actualizar('pedidoProducto', detalle.id, detalle)
    },
    GuardarPedido(pedido) {
      ApiService.actualizar('pedido', pedido.id, pedido)

    },
    GuaradarSelectTrabajador(value, detalle) {
      detalle.preparo = value
      ApiService.actualizar('pedidoProducto', detalle.id, detalle)
    },
    async obtenerPedidosApi() {
      this.pedidos = await ApiService.obtener('pedido')
    },
    async suscribeSocketPedidos(){
      const channel = ably.channels.get('pedidos');
      await channel.subscribe('comida', () => {
        this.obtenerPedidosApi()
        this.ReproducirSonido()
        this.Notificar('top','Nuevo pedido!')  
      });
    },
    async suscribeSocketCompletados(){
      const channel = ably.channels.get('pedidos');
      await channel.subscribe('completado', (message) => {   
        this.obtenerPedidosApi()
        this.Notificar('bottom',message.data)
      });
    },
    async publishSocket(numero){
      const channel = ably.channels.get('pedidos');
      await channel.publish('completado', 'se completo el pedido # ' + numero);
    },
    async Notificar(position: 'top' | 'middle' | 'bottom',mensaje){
      const toast = await toastController.create({
          message: mensaje,
          duration: 2000,
          color:'light',
          position: position
        });

        await toast.present();
    },
    ReproducirSonido(){
      this.sound.play()
    },
    obtenerFecha(){
      const tiempoTranscurrido = Date.now();
      const hoy = new Date(tiempoTranscurrido);
      this.hoy = hoy
    },
    convertirFecha(fecha: string){
      const fechanueva = new Date(fecha)
      return fechanueva
    },
    subTotal(detalle: any){
      let subtotal = 0;
      for (let i = 0; i < detalle.length; i++) {
        subtotal += detalle[i].producto.costo;    
      }
      return subtotal
    }


  },
  computed: {

  },
  components: {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonItem, IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItemOption, IonItemOptions, IonItemSliding
    , IonRefresher, IonRefresherContent, IonAccordion, IonAccordionGroup, IonCheckbox,IonSegment, IonSegmentButton,IonFooter,IonBadge,IonGrid,IonRow,IonCol
    //IonSelect, IonSelectOption
  }
});
</script>
<style scoped>
ion-segment {
  margin: 5;
}
</style>