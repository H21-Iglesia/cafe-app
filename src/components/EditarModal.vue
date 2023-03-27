<template>
    <ion-header>
      <ion-toolbar mode="ios" >
        <ion-buttons slot="start">
          <ion-button color="medium" @click="cancel">Cancelar</ion-button>
        </ion-buttons>
        <ion-title>
          Editar
        </ion-title>
        <ion-buttons slot="end">
          <ion-button color="medium" @click="confirm">Confirmar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item-group mode="md">
        <ion-item-divider >
          <ion-label  color="warning">Nombre:</ion-label>
        </ion-item-divider>
        <ion-input v-model="nombre" placeholder="Nombre del producto"></ion-input>
        <ion-item-divider>
          <ion-label  color="warning">Precio:</ion-label>
        </ion-item-divider>
        <ion-input v-model="costo" placeholder="Costo del producto" type="number"></ion-input>
        <ion-item-divider >
          <ion-label color="warning">Categorias:</ion-label>
        </ion-item-divider>
          <ion-chip v-for="(categoria, index) in categorias" :key="index" color="success">
            <ion-label>{{ categoria.detalle_categoria.nombre }}</ion-label>
            <ion-icon :icon="closeCircleOutline" @click="eliminarCategoria(categoria.id)"></ion-icon>
          </ion-chip>
          <ion-chip v-for="(categoria, index) in nuevasCategorias" :key="index" color="tertiary">
            <ion-label>{{ categoria.nombre }}</ion-label>
            <ion-icon :icon="removeCircleOutline" @click="quitarNuevaCategoria(categoria.id)"></ion-icon>
          </ion-chip>
        <ion-item-divider >
          <ion-label color="warning">Agregar categorias:</ion-label>
        </ion-item-divider>
          <ion-chip v-for="(categoria, index) in liCategorias" :key="index" color="tertiary" class="ion-text-wrap">
            <ion-label >{{categoria.nombre }}</ion-label>
            <ion-icon :icon="addCircleOutline" @click="agregarCategoria(categoria.id,categoria.nombre)"></ion-icon>
          </ion-chip>
        <ion-item-divider >
          <ion-label  color="warning">Receta:</ion-label>
        </ion-item-divider>
        <ion-input disabled placeholder="No disponible" type="text"></ion-input>
        <ion-item-divider >
          <ion-label  color="warning">Foto:</ion-label>
        </ion-item-divider>
          <ion-avatar slot="start" v-if="!imagenSeleccionada" >
            <ion-img class="imagen" :src="'https://apicafeteria.h21iglesia.org/images/'+foto"/>
          </ion-avatar>
          <ion-avatar slot="start" v-if="imagenSeleccionada" >
            <ion-img class="imagen" :src="imagen"/>
          </ion-avatar>
        <ion-item-divider >
          <ion-label color="warning">Actualizar foto:</ion-label>
        </ion-item-divider>          
          <input class="inputimagen" type="file" @change="guardarImagen" ref="fileinput" style=""  />
      </ion-item-group>

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
      IonLabel,
      IonInput,
      modalController,
      IonImg,
      IonAvatar,
      IonChip,
      IonIcon,
      IonItemDivider,
      IonItemGroup,
    } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import { closeCircleOutline,pin,addCircleOutline,removeCircleOutline} from 'ionicons/icons';
    import { ApiService } from '@/data/Services/ApiService';

    export default defineComponent({
      name: 'EditarModal',
      components: { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonLabel, IonInput,IonImg,IonAvatar,IonChip,IonIcon,IonItemDivider,IonItemGroup},
      props:{
        producto:Object,
    },
      data(){
        return{
          closeCircleOutline,
            pin,
            addCircleOutline,
            removeCircleOutline,
            id:this.producto.id,
            nombre:this.producto.nombre,
            costo:this.producto.costo,
            receta_id:this.producto.receta_id,
            foto:this.producto.foto,
            imagenSeleccionada:null,
            categorias:this.producto.categorias,
            liCategorias:this.traerCategorias(),
            categoriasSelect:[],
            nuevasCategorias:[]

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
          return modalController.dismiss({id:this.id,nombre:this.nombre,costo:this.costo,receta_id:this.receta_id,foto:this.foto,categorias:this.categoriasSelect}, 'confirm');
        },
        eliminarCategoria(id: string){
          ApiService.eliminar("categoriaProducto",id)
          const categorias = this.categorias.filter(categoriaProducto => categoriaProducto.id != id)
          this.categorias = categorias
        },
        async traerCategorias(){
          const categorias = await ApiService.obtener('categoria')
          this.liCategorias = categorias
          return categorias
        },
        agregarCategoria(id: string,nombre: string){
          //ApiService.crear("categoriaProducto",{categoria_id: id,producto_id: this.id})
          this.categoriasSelect.push(id)
          this.nuevasCategorias.push({id:id,nombre:nombre})
        },
        quitarNuevaCategoria(id: string){
          const nuevasCategorias = this.nuevasCategorias.filter(categoria => categoria.id != id)
          this.nuevasCategorias = nuevasCategorias

          const nuevasSeleccionadas = this.categoriasSelect.filter(idcategoria => idcategoria != id)
          this.categoriasSelect = nuevasSeleccionadas
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
      margin: 10px;
    }
    .inputimagen{
      margin: 10px;
    }
    .chip{
      min-width: 170px;
    }
    .itemcategorias{
      min-height: 400px;
    }
    </style>