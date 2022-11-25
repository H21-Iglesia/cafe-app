<template>
  <ion-page>
    <ion-header mode="md">
      <ion-toolbar color="primary">        
        <ion-buttons slot="start">
          <ion-button router-link="/home" router-direction="back">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title slot="end">PEDIDOS</ion-title>     
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" color="warning">



      <ion-refresher slot="fixed" @ionRefresh="Cargar($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>


      <ion-card class="cards">

        <ion-accordion-group v-for="(Pedido, index) in pedidos" :key="index">
          <ion-accordion v-if="Pedido.estado_id === estado">

            <ion-item slot="header" value="first" color="light">
              <ion-card-header>
                <ion-card-title color="dark">#0{{Pedido.id + " - "+ (Pedido.nombre_cliente? Pedido.nombre_cliente:"Pedido") }}</ion-card-title>
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

                  <ion-label>{{detalle.producto.nombre }}</ion-label>
                  <ion-select :selectedText=detalle.preparo 
                    @ionChange="GuaradarSelectTrabajador($event.detail.value,detalle)">
                    <ion-select-option v-for="(trabajador, i) in trabajadores" :key="i" :value="trabajador.nombre">
                      {{trabajador.nombre}}</ion-select-option>
                  </ion-select>
                </ion-item>

              </ion-item-sliding>
              <ion-item-sliding v-for="(detalle, index) in Pedido.pedido_detalle " :key="index" :disabled="true">

                <ion-item color="medium" v-if="detalle.completado">
                  <ion-checkbox color="warning" slot="start" :checked="detalle.completado" :disabled="true">
                  </ion-checkbox>

                  <ion-label>{{detalle.producto.nombre }}</ion-label>
                  <ion-select :selectedText=detalle.preparo :disabled="true">
                  </ion-select>
                </ion-item>

              </ion-item-sliding>
              <br>
              <ion-button color="warning" expand="block" v-if="estado == 1" @click="Pedido.estado_id = 2; GuardarPedido(Pedido);">
                COMPLETADO</ion-button>
            </ion-card-content>

          </ion-accordion>
        </ion-accordion-group>

      </ion-card>

    </ion-content>
    <ion-footer mode="md">
      <ion-toolbar color="light">
        <ion-segment value="default" color="primary">
      <ion-segment-button value="default" @click="estado = 1">
        <ion-label>Pendientes</ion-label>
      </ion-segment-button>
      <ion-segment-button value="segment" @click="estado = 2">
        <ion-label>Completados</ion-label>
      </ion-segment-button>
    </ion-segment>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonItem, IonLabel, IonCard, IonCardContent, IonCardHeader,
  IonCardTitle, IonItemOption, IonItemOptions, IonItemSliding, IonRefresher, IonRefresherContent, IonSelect, IonSelectOption, IonAccordion,
  IonAccordionGroup, IonCheckbox, IonSegment, IonSegmentButton,IonFooter
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { ApiService } from '@/data/Services/ApiService';
import { arrowBackOutline } from "ionicons/icons";


export default defineComponent({
  name: 'PendientePage',
  mounted() {
    this.obtenerPedidosApi()
  },
  data() {
    return {
      arrowBackOutline,
      pedidos: null,
      trabajadores: [{ nombre: 'Lucas' }, { nombre: 'Andres' }, { nombre: 'Carla' }],
      pedidocopia: null,
      estado: 1
    }
  },
  methods: {
    Cargar(event: CustomEvent) {
      // this.pedidos =ApiService.obtener('pedido')
      // this.pedidos =  JSON.parse(localStorage.getItem("pedidos"))
      this.obtenerPedidosApi()
      console.log(this.pedidos)

      console.log('Begin async operation');
      setTimeout(() => {
        // eslint-disable-next-line no-undef
        const target = event.target as HTMLIonRefresherElement;
        console.log('Async operation has ended');
        target.complete();
      }, 500);
    },
    GuardarProducto(detalle) {
      console.log(detalle)
      ApiService.actualizar('pedidoProducto', detalle.id, detalle)
    },
    GuardarPedido(pedido) {
      console.log(pedido)
      ApiService.actualizar('pedido', pedido.id, pedido)

    },
    GuaradarSelectTrabajador(value, detalle) {
      console.log(value);
      detalle.preparo = value
      ApiService.actualizar('pedidoProducto', detalle.id, detalle)
    },
    async obtenerPedidosApi() {
      this.pedidos = await ApiService.obtener('pedido')
      console.log('pedidos', this.pedidos)
    }


  },
  computed: {

  },
  components: {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonItem, IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItemOption, IonItemOptions, IonItemSliding
    , IonRefresher, IonRefresherContent, IonSelect, IonSelectOption, IonAccordion, IonAccordionGroup, IonCheckbox,IonSegment, IonSegmentButton,IonFooter
  }
});
</script>
<style scoped>
ion-segment {
  margin: 5;
}
</style>