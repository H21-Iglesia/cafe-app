<template>
  <ion-page>
    <ion-header :translucent="true" >
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
            <ion-accordion  v-if="Pedido.estado" >
                  
                <ion-item slot="header" value="first" color="light">
                <ion-card-header >
                    <ion-card-title color="dark">#0{{Pedido.Nro + " - "+ Pedido.cliente}}</ion-card-title>
                </ion-card-header>
                </ion-item>

                <ion-card-content slot="content"  >
                <ion-item-sliding v-for="(pro, index) in Pedido.productos " :key="index" >
                        <ion-item-options side="end">
                            <ion-item-option @click="(pro.completado = true); Guardar();">LISTO</ion-item-option>
                        </ion-item-options>

                        <ion-item v-show="pro.completado == false"  >
                            <ion-checkbox color="warning"  slot="start" :checked="pro.completado" @click="(pro.completado = true); Guardar();" ></ion-checkbox>

                            <ion-label>{{pro.nombre }}</ion-label> 
                            <ion-select  placeholder="Pendiente" >
                                <ion-select-option value="Lucas"  >Lucas</ion-select-option>
                                <ion-select-option value="Andres">Andres</ion-select-option>
                                <ion-select-option value="Carla">Carla</ion-select-option>
                            </ion-select>
                        </ion-item>
                        
                </ion-item-sliding>
                <ion-item-sliding  v-for="(pro, index) in Pedido.productos " :key="index" disabled="true">
                        <ion-item-options side="end">
                            <ion-item-option>LISTO</ion-item-option>
                        </ion-item-options>

                        <ion-item color="medium" v-if="pro.completado" >
                            <ion-checkbox color="warning"  slot="start" :checked="pro.completado" disabled="true"></ion-checkbox>

                            <ion-label>{{pro.nombre }}</ion-label> 
                            <ion-select selected-text="Listo"  placeholder="Pendiente" disabled="true">
                                <ion-select-option value="Lucas"  >Lucas</ion-select-option>
                                <ion-select-option value="Andres">Andres</ion-select-option>
                                <ion-select-option value="Carla">Carla</ion-select-option>
                            </ion-select>
                        </ion-item>

                </ion-item-sliding>
                        <br>
                        <ion-button color="warning" expand="block" @click="Pedido.estado = false; Guardar();" >COMPLETADO</ion-button>
                </ion-card-content>
    
            </ion-accordion>
        </ion-accordion-group>

    </ion-card>

    </ion-content >

  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage,IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';

import { arrowBackOutline} from "ionicons/icons";


export default defineComponent({
  name: 'PendientePage',

  data() {
    return {
      arrowBackOutline ,
      pedidos: JSON.parse(localStorage.getItem("pedidos")),
    }
  },
  methods: {
    Cargar(event: CustomEvent){

        this.pedidos =  JSON.parse(localStorage.getItem("pedidos"))
        console.log(this.pedidos )

        console.log('Begin async operation');
        setTimeout(() => {
        // eslint-disable-next-line no-undef
        const target = event.target as HTMLIonRefresherElement;
        console.log('Async operation has ended');
        target.complete();
        }, 500);
    },
    Guardar(){
        localStorage.setItem("pedidos",JSON.stringify(this.pedidos))
    }
  },
  computed:{
    
  },
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  }
});
</script>
<style scoped>

</style>