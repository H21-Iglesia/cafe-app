<template>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button color="medium" @click="cancel">Cancelar</ion-button>
        </ion-buttons>
        <ion-title>Editar producto</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="confirm">Confirmar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="stacked">Nombre</ion-label>
        <ion-input v-model="nombre" placeholder="Nombre del producto"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Precio</ion-label>
        <ion-input v-model="costo" placeholder="Costo del producto" type="number"></ion-input>
      </ion-item>
      <ion-item disabled>
        <ion-label position="stacked">Receta</ion-label>
        <ion-input v-model="receta_id" placeholder="selecionar receta"></ion-input>
      </ion-item>
      <ion-item disabled>
        <ion-label position="stacked">Foto</ion-label>
        <ion-input v-model="foto" placeholder="Agregar foto"></ion-input>
      </ion-item>
    </ion-content>
  </template>
  
  <script lang="ts">
    import {
      IonContent,
      IonHeader,
      IonTitle,
      IonToolbar,
      IonButtons,
      IonButton,
      IonItem,
      IonLabel,
      IonInput,
      modalController,
    } from '@ionic/vue';
    import { defineComponent } from 'vue';
  
    export default defineComponent({
      name: 'EditarModal',
      components: { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonItem, IonLabel, IonInput },
      props:{
        producto:Object,
    },
      data(){
        return{
            id:this.producto.id,
            nombre:this.producto.nombre,
            costo:this.producto.costo,
            receta_id:this.producto.receta_id,
            foto:this.producto.foto
        }
      },
      methods: {
        cancel() {
          return modalController.dismiss(null, 'cancel');
        },
        confirm() {
          return modalController.dismiss({id:this.id,nombre:this.nombre,costo:this.costo,receta_id:this.receta_id,foto:this.foto}, 'confirm');
        },
      },
    });
  </script>