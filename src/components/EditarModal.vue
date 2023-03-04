<template>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button color="medium" @click="cancel">Cancelar</ion-button>
        </ion-buttons>
        <ion-title>Editar producto</ion-title>
        <ion-buttons slot="end">
          <ion-button color="medium" @click="confirm">Confirmar</ion-button>
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
      <ion-item >
        <ion-avatar slot="start" v-if="!imagenSeleccionada" >
          <ion-img class="imagen" :src="'https://apicafe.h21iglesia.org/images/'+foto"/>
        </ion-avatar>
        <ion-avatar slot="start" v-if="imagenSeleccionada" >
          <ion-img class="imagen" :src="imagen"/>
        </ion-avatar>
        <ion-label position="stacked">Foto</ion-label>
        <input class="inputimagen" type="file" @change="guardarImagen" ref="fileinput" style=""  />
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
      IonImg,
      IonAvatar
    } from '@ionic/vue';
    import { defineComponent } from 'vue';
  
    export default defineComponent({
      name: 'EditarModal',
      components: { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonItem, IonLabel, IonInput,IonImg,IonAvatar },
      props:{
        producto:Object,
    },
      data(){
        return{
            id:this.producto.id,
            nombre:this.producto.nombre,
            costo:this.producto.costo,
            receta_id:this.producto.receta_id,
            foto:this.producto.foto,
            imagenSeleccionada:null
        }
      },
      methods: {
        guardarImagen(event){
          this.foto = event.target.files[0]

          this.cargarImagen(event.target.files[0])

        },
        cargarImagen(file){
          let reader = new FileReader();

          reader.onload = (e) =>{
            this.imagenSeleccionada = e.target.result;
          }

          reader.readAsDataURL(file)
        },
        cancel() {
          return modalController.dismiss(null, 'cancel');
        },
        confirm() {
          return modalController.dismiss({id:this.id,nombre:this.nombre,costo:this.costo,receta_id:this.receta_id,foto:this.foto}, 'confirm');
        },
      },
      computed:{
        imagen(){
          return this.imagenSeleccionada;
        }
      }
    });
  </script>
    <style scoped>
    .imagen{
      border-radius: 30%;
    }
    .inputimagen{
      margin: 10px;
    }
    </style>