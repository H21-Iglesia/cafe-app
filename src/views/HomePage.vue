<template lang="es">
    <ion-page>
        <ion-header mode="md">
        <ion-toolbar color="primary">
            <ion-title size="large">Cafeteria H21</ion-title>
        </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-card class="iconos" router-link="/pedir"  >
                <ion-icon  :icon="cartOutline" style="font-size: 80px" color="warning" ></ion-icon>
                <ion-item  style="text-align: center"  color="light">
                <ion-label>Crear pedido</ion-label>
                </ion-item>
            </ion-card >
            <ion-card class="iconos" router-link="/pendientes"  >
                <ion-icon :icon="timeOutline" style="font-size: 80px" color="warning" ></ion-icon>
                <ion-item style="text-align: center" color="light">
                <ion-label>Pedidos pendientes</ion-label>
                </ion-item>
            </ion-card>
            <ion-card class="iconos" router-link="/productos"  >
                <ion-icon :icon="bagAddOutline" style="font-size: 80px" color="warning" ></ion-icon>
                <ion-item style="text-align: center" color="light">
                <ion-label>Productos</ion-label>
                </ion-item>
            </ion-card>

            <ion-card class="iconos" :disabled=true>
                <ion-icon :icon="colorWandOutline" style="font-size: 80px" color="warning"></ion-icon>
                <ion-item style="text-align: center" color="light">
                <ion-label>Recetas - proximamente</ion-label>
                </ion-item>
            </ion-card>
        </ion-content>
    <ion-footer mode="ios" collapse="fade">
        <ion-label color="secondary" class="creditos"> © H21 - 2023</ion-label>
    </ion-footer>
    </ion-page>
    



</template>
<script lang="ts">
import { cartOutline, timeOutline, colorWandOutline, bagAddOutline } from "ionicons/icons";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,toastController, IonCardTitle, IonItem, IonLabel, IonHeader, IonToolbar, IonContent, IonPage, IonNavLink, IonFooter } from '@ionic/vue';
import { defineComponent } from 'vue';
import { ably } from "../data/Services/SocketService"

export default defineComponent({
    name: 'HomePage',
    components: {
        IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonHeader, IonToolbar, IonContent, IonPage, IonNavLink, IonFooter
    },
    mounted() {
        this.ConectarSocket()
        ably.connection.on((stateChange) => {
            console.log('New connection state is ' + stateChange.current);
            this.Notificar(stateChange.current,1500);
        });
    },
    unmounted() {
        ably.close();
    },
    data() {
        return {
            cartOutline, timeOutline, colorWandOutline, bagAddOutline
        }
    },
    methods: {
        async ConectarSocket() {
            await ably.connection.once('connected');
        },
        async Notificar(mensaje: string, duracion = 1000) {
            const toast = await toastController
                .create({
                    message: mensaje,
                    duration: duracion,
                    position: "bottom",
                    color: 'warning'
                })
            return toast.present();
        },

    },
})
</script>
<style scoped>
.iconos {
    display: box;
    justify-content: center;
    text-align: center;
}

.creditos {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
}
</style>