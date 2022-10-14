<!-- eslint-disable vue/no-mutating-props -->
<template >
        <div class="contenedor">

            <ion-thumbnail slot="start"  >
                <img class="imagen" src="../images/cafe.jpg" alt="">
            </ion-thumbnail>

            <ion-item class="item"  fill="outline" lines="none" shape="round"   >

                <ion-label>
                    <ion-h2>{{p.nombre}}</ion-h2><br>
                    <ion-h3>{{p.precio}} bs</ion-h3>
                </ion-label>
                <ion-button @click="p.cantidad = p.cantidad - 1 " color="warning" >-</ion-button>
                    {{p.cantidad}}
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
    min-width: 80%;
    margin-left: 3%;
}
.item ion-h2{
    font-size: 18px;

}
.item ion-h3{
    color: #7F8EA5;
}

.item ion-button{
    width: 25px;
}

.imagen{
    border-radius: 30%;
    /* border-bottom-right-radius: 0%;
    border-top-right-radius: 0%; */
    margin-top: 20%;
    min-height: 55px;
    min-width: 55px;

}
.contenedor{
    display: inline-flex;
    min-width: 100%;
    margin-left: 4%;
    margin-right: 5%;
}
</style>