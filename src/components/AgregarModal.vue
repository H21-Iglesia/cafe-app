<template>
    <ion-header>
      <ion-toolbar mode="ios">
        <ion-buttons slot="start">
          <ion-button color="medium" @click="cancel">Cancelar</ion-button>
        </ion-buttons>
        <ion-title>Agregar</ion-title>
        <ion-buttons slot="end">
          <ion-button color="medium" @click="confirm">Confirmar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="stacked">Nombre</ion-label>
        <ion-input v-model="nombre" placeholder="Nombre del producto" :autofocus="true"></ion-input>
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
        <ion-label position="stacked">Categorias</ion-label>
        <ion-select mode="md" placeholder="Seleccione las categorias" :multiple="true" @ionChange="pushCategoria($event.detail.value)">
          <div v-for="(categoria, index) in categorias" :key="index">
            <ion-select-option  :value="categoria.id">{{ categoria.nombre}}</ion-select-option>
          </div>
        </ion-select>
      </ion-item>
      <ion-item >
        <ion-thumbnail slot="start" v-if="imagenSeleccionada"  >
          <ion-img class="imagen" :src="imagen"/>
        </ion-thumbnail>
        <ion-label position="stacked">Foto</ion-label>
        <input type="file" @change="guardarImagen" ref="fileinput" style=""  />
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
      IonImg,
      modalController,
      IonThumbnail,
      IonSelectOption,
      IonSelect
    } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import { ApiService } from '@/data/Services/ApiService';
  
    export default defineComponent({
      name: 'AgregarModal',
      components: { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonItem, IonLabel, IonInput,IonThumbnail,IonImg,IonSelect,IonSelectOption  },

      data(){
        return{
            nombre:"",
            costo:0,
            receta_id:1,
            foto:null,
            imagenSeleccionada:null,
            categorias: this.traerCategorias(),
            categoriasSelect: []
        }
      },
      methods: {
        guardarImagen(event){
          this.foto = event.target.files[0]
          
          this.cargarImagen(this.foto)

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
          return modalController.dismiss({nombre:this.nombre,costo:this.costo,receta_id:this.receta_id,foto:this.foto,cantidad:0,categorias:this.categoriasSelect}, 'confirm');
        },
        async traerCategorias(){
          const categorias = await ApiService.obtener('categoria')
          this.categorias = categorias
          return categorias
        },
        pushCategoria(value: Array<number>){
          this.categoriasSelect = value
        }
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
  </style>