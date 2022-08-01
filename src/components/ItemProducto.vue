<template>
    <ion-item class="item">
        <ion-icon :icon="cafe" size="large" class="cafe" color="ligth"></ion-icon>
        <ion-label>
            <ion-h2>{{p.nombre}}</ion-h2><br>
            <ion-h3>{{p.precio}} bs</ion-h3>
        </ion-label>
        <ion-button @click="quitar(p.precio)" color="medium" >-</ion-button>
        {{p.cantidad}}
        <ion-button @click="agregar(p.precio)" color="medium" >+</ion-button>

    </ion-item>
</template>
<script lang="ts">
import { defineComponent, } from 'vue'
import { cafe } from "ionicons/icons";
import { IonIcon} from '@ionic/vue';

export default defineComponent({
    name: 'ItemProducto',
    components:{
        IonIcon
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
        agregar(precio:number){
            this.cantidad++
            this.suma = this.suma + Number(precio)
            this.$emit('cantidad',this.cantidad)

        },
        quitar(precio:number){
            if(this.cantidad >0){
                this.cantidad--
                this.suma = this.suma - Number(precio)
                this.$emit('cantidad',this.cantidad)

            }
        }
    }
})
</script>
<style scoped>
.cafe{
    padding-right: 25px; 
}
.item{
    padding: 10px;
}
.item ion-h2{
    font-size: 18px;
}
.item ion-h3{
    color: darkgrey;
}
</style>