<!-- eslint-disable vue/no-mutating-props -->
<template >
        <div class="contenedor">

            <!-- <ion-thumbnail slot="start" class="imagen">
                <img :src="'https://apicafe.h21iglesia.org/images/'+ p.foto" alt="foto de producto">
            </ion-thumbnail> -->

            <ion-item class="item"  :expandable=true fill="outline" lines="none" shape="round"   >
                <ion-thumbnail slot="start" >
                <img class="imagen" :src="'https://apicafe.h21iglesia.org/images/'+ p.foto" alt="foto de producto">
                </ion-thumbnail>
                <ion-label class="ion-text-wrap">
                    <ion-h2>{{p.nombre}}</ion-h2><br>
                    <ion-h3>{{p.costo}} bs</ion-h3>
                </ion-label>
                <ion-button @click="()=>{if(p.cantidad>0){p.cantidad = p.cantidad - 1}}" color="warning" >-</ion-button>
                <p>{{p.cantidad}}</p>
                <ion-button @click="p.cantidad = p.cantidad + 1 " color="warning" >+</ion-button>

            </ion-item>       
  
        </div>
       
    

    
</template>
<script lang="ts">
import {  IonButton,IonItem, IonLabel,IonThumbnail, } from '@ionic/vue';
import { defineComponent, } from 'vue'
import { cafe } from "ionicons/icons";

export default defineComponent({
    name: 'ItemProducto',
    components:{
        IonButton,IonItem, IonLabel,IonThumbnail
    },
    props:{
        p:Object,
    },
    data(){
        return{
            cafe,
            cantidad: 0,
            suma: 0,

        }
    },
    methods:{

    }
})
</script>
<style scoped>

.item{
    padding: 5px;
    min-width: 100%;
    max-width:100%;
}
.item ion-h2{ 
    font-size: 18px;
}
.item ion-h3{
    color: #7F8EA5;
}
.item ion-label{

}
.item ion-button{
    width: 37px;
    height: 37px;
}
.item p{
    margin-left: 3px;
    margin-right: 3px;
    
}
.imagen{
    border-radius:30%
}

.contenedor{
    display: inline-flex;
    min-width: 96%;
    max-width: 96%;
    margin-left:2%;
    margin-right:2%;
}
ion-item {
    --border-radius: 20px;
    
}
</style>