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
    <ion-footer mode="ios" collapse="fade">
        <ion-label color="secondary" class="creditos"> © H21 iglesia 2022 - @soyalexss</ion-label>
    </ion-footer>
    </ion-page>
    



</template>
<script lang="ts">
import { cartOutline,timeOutline,colorWandOutline,bagAddOutline } from "ionicons/icons";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonItem, IonLabel,IonHeader,IonToolbar,IonContent,IonPage,IonNavLink,IonFooter} from '@ionic/vue';
import { defineComponent } from 'vue';
import {ably} from "../data/Services/SocketService"

export default defineComponent( {
    name: 'HomePage',
    components:{
        IonButton,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonItem, IonLabel,IonHeader,IonToolbar,IonContent,IonPage,IonNavLink,IonFooter
    },
    mounted() {
        this.ConectarSocket()
    },
    unmounted() {
        ably.close(); 
        console.log('Closed the connection to Ably.');
    },
    data() {
        return {
            cartOutline,timeOutline,colorWandOutline,bagAddOutline
        }
    },
    methods: {
        async ConectarSocket(){            
            await ably.connection.once('connected');
            console.log('Connected to Ably!');
        }
        
    },
})
</script>
<style scoped>
.iconos{
    display: box;
    justify-content: center;
    text-align: center;
}
.creditos{
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;  
}    
</style>