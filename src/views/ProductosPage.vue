<template>
    <ion-page>
    <ion-header mode="md">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button router-link="/home" router-direction="back">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title slot="end">PRODUCTOS</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true"  >
        <div v-for="producto in productos" :key="producto.id">
            <ion-item fill="outline"  shape="round" lines="none"  >
                <ion-thumbnail slot="start"   >
                    <img class="imagen" :src="'https://apicafe.h21iglesia.org/images/'+ producto.foto" alt="">
                </ion-thumbnail>
                <ion-label>{{producto.nombre}}</ion-label>
                <ion-button @click="AbrirEditarModal(producto)" color="tertiary">Editar</ion-button>
            </ion-item>
        </div>

    </ion-content>
    <ion-footer mode="md">
      <ion-toolbar color="light">
        <ion-button expand="block" shape="round" color="warning" @click="AbrirAgregarModal" >Agregar</ion-button>
      </ion-toolbar>
    </ion-footer>
    </ion-page>
</template>
<script lang="ts">
import { IonButton,IonItem, IonLabel,IonHeader,IonToolbar,IonContent,IonPage,IonButtons,IonFooter,IonThumbnail,modalController} from '@ionic/vue';
import { defineComponent } from 'vue';
import { arrowBackOutline,createOutline } from "ionicons/icons";
import { ApiService } from '../data/Services/ApiService';
import AgregarModal from '../components/AgregarModal.vue'
import EditarModal from '../components/EditarModal.vue'

export default defineComponent( {
    name: 'ProductosPage',
    components:{
        // IonButton,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
        IonItem, IonLabel,IonHeader,IonToolbar,IonContent,IonPage, IonButton, IonButtons,IonFooter,IonThumbnail
    },
    mounted(){
        this.TraerProductos()
    },
    data() {
        return {
            arrowBackOutline,createOutline,
            mensaje:"",
            productos:[],
      
        }
    },
    methods: {
        async TraerProductos(){
            this.productos = await ApiService.obtener('producto')
        },
        async AbrirAgregarModal() {
        const modal = await modalController.create({
          component: AgregarModal,
        });
        modal.present();

        const { data, role } = await modal.onWillDismiss();
        
        if (role === 'confirm') {
          ApiService.crear('producto',data)
          console.log(data)
        }
        },
        async AbrirEditarModal(producto) {
        console.log(producto)
        const modal = await modalController.create({
          component: EditarModal,
          componentProps:{producto}
        });
        modal.present();

        const { data, role } = await modal.onWillDismiss();
        
        if (role === 'confirm') {
          ApiService.actualizar('producto',data.id,data)
          console.log(data)
        }
        this.TraerProductos()
        },
    },
})
</script>
<style scoped>
.iconos{
    display: box;
    justify-content: center;
    text-align: center;
}
.imagen{
    border-radius: 30%;

}
.item{
    padding: 5px;
    min-width: 80%;
}
ion-item {
    --border-radius: 20px;
  }    
</style>