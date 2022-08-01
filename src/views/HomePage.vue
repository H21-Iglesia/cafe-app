<template lang="Es">
    <ion-page>
        <ion-header collapse="fade" >
        <ion-toolbar color="light">
            <ion-title size="large">Cafeteria h21</ion-title>
        </ion-toolbar>
        </ion-header>

        <ion-content>

            <ion-card href="pedir" class="iconos" >
                <ion-icon  :icon="cartOutline" style="font-size: 80px" color="dark" ></ion-icon>
                <ion-item  style="text-align: center"  color="light">
                <ion-label>Crear pedido</ion-label>
                </ion-item>
            </ion-card >
            <ion-card class="iconos" href="#" >
                <ion-icon :icon="timeOutline" style="font-size: 80px" color="dark" ></ion-icon>
                <ion-item style="text-align: center" color="light">
                <ion-label>Pedidos pendientes</ion-label>
                </ion-item>
            </ion-card>

            <ion-card class="iconos"  href="#"  >
                <ion-icon :icon="colorWandOutline" style="font-size: 80px" color="dark"></ion-icon>
                <ion-item style="text-align: center" color="light">
                <ion-label>Recetas</ion-label>
                </ion-item>
            </ion-card>
        </ion-content>

    </ion-page>
    



</template>
<script lang="ts">
import { cartOutline,timeOutline,colorWandOutline } from "ionicons/icons";

export default {
    name: 'HomePage',
    components:{

    },
    data() {
        return {
            cartOutline,timeOutline,colorWandOutline
        
        }
    },
    methods: {
        
    },
}
</script>
<style scoped>
.iconos{
    display: flex;
    justify-content: center;
    text-align: center;
}    
</style>