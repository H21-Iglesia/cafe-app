<template lang="Es">
    <ion-page>
        <ion-header mode="md">
        <ion-toolbar color="primary">
            <ion-title size="large">Cafeteria h21</ion-title>
        </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-card class="iconos" router-link="/pedir"  >
                <ion-icon  :icon="cartOutline" style="font-size: 80px" color="primary" ></ion-icon>
                <ion-item  style="text-align: center"  color="light">
                <ion-label>Crear pedido</ion-label>
                </ion-item>
            </ion-card >
            <ion-card class="iconos" router-link="/pendientes"  >
                <ion-icon :icon="timeOutline" style="font-size: 80px" color="primary" ></ion-icon>
                <ion-item style="text-align: center" color="light">
                <ion-label>Pedidos pendientes</ion-label>
                </ion-item>
            </ion-card>
            <ion-card class="iconos" router-link="/productos"  >
                <ion-icon :icon="bagAddOutline" style="font-size: 80px" color="primary" ></ion-icon>
                <ion-item style="text-align: center" color="light">
                <ion-label>Productos</ion-label>
                </ion-item>
            </ion-card>

            <ion-card class="iconos" :disabled=true>
                <ion-icon :icon="colorWandOutline" style="font-size: 80px" color="primary"></ion-icon>
                <ion-item style="text-align: center" color="light">
                <ion-label>Recetas - proximamente</ion-label>
                </ion-item>
            </ion-card>

        </ion-content>

    </ion-page>
    



</template>
<script lang="ts">
import { cartOutline,timeOutline,colorWandOutline,bagAddOutline } from "ionicons/icons";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonItem, IonLabel,IonHeader,IonToolbar,IonContent,IonPage,IonNavLink} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent( {
    name: 'HomePage',
    components:{
        IonButton,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonItem, IonLabel,IonHeader,IonToolbar,IonContent,IonPage,IonNavLink
    },
    data() {
        return {
            cartOutline,timeOutline,colorWandOutline,bagAddOutline
        
        }
    },
    methods: {
        
    },
})
</script>
<style scoped>
.iconos{
    display: box;
    justify-content: center;
    text-align: center;
}    
</style>