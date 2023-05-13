<template>
  <ion-page>
    <ion-header mode="md">
      <ion-toolbar color="primary">        
        <ion-buttons slot="start">
          <ion-button router-link="/" router-direction="back">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title slot="end">PEDIDOS</ion-title>     
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" color="secondary">

      <ion-refresher slot="fixed" @ionRefresh="Cargar($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-card class="cards">

        <!-- Pendientes hoy dia -->
        <div v-if="pestaña == 1">
        <ion-accordion-group v-for="(Pedido, index) in pedidos" :key="index">
          <ion-accordion v-if="pestaña == 1 ? Pedido.estado_id == 1 && ((hoy.toLocaleDateString()) == convertirFecha(Pedido.created_at).toLocaleDateString()): false">

            <ion-item slot="header" value="first" color="light">
              <ion-card-header>        
                <ion-card-title color="dark">#{{Pedido.id + " - "+ (Pedido.nombre_cliente? Pedido.nombre_cliente:"Pedido") }} <ion-badge color="danger" v-show="!Pedido.pagado" >DEUDA</ion-badge> </ion-card-title>                       
              </ion-card-header>
            </ion-item>

            <ion-card-content slot="content" mode="md">
              <ion-item-sliding v-for="(detalle, index) in Pedido.pedido_detalle " :key="index">
                <ion-item-options side="end">
                  <ion-item-option @click="(detalle.completado = true); GuardarProducto(detalle);">LISTO
                  </ion-item-option>
                </ion-item-options>

                <ion-item v-show="detalle.completado == false">
                  <ion-checkbox color="warning" slot="start" :checked="detalle.completado"
                    @click="(detalle.completado = true); GuardarProducto(detalle);"></ion-checkbox>

                  <ion-label class="ion-text-wrap">{{detalle.producto.nombre }}</ion-label>
                  <!-- <ion-select :selectedText=detalle.preparo 
                    @ionChange="GuaradarSelectTrabajador($event.detail.value,detalle)" interface="popover">
                    <ion-select-option v-for="(trabajador, i) in trabajadores" :key="i" :value="trabajador.nombre">
                      {{trabajador.nombre}}
                    </ion-select-option>
                  </ion-select> -->
                </ion-item>

              </ion-item-sliding>
              
              <ion-item-sliding v-for="(detalle, index) in Pedido.pedido_detalle " :key="index" :disabled="true">
                <ion-item color="medium" v-if="detalle.completado">
                  <ion-label class="ion-text-wrap">{{detalle.producto.nombre }}</ion-label>
                  <!-- <ion-select :selectedText=detalle.preparo :disabled="true">
                  </ion-select> -->
                </ion-item>
              </ion-item-sliding>                        
              <br>
              <ion-button color="danger" expand="block" v-if="Pedido.pagado == 0" @click="Pedido.pagado = 1; GuardarPedido(Pedido);">
                PAGAR DEUDA
              </ion-button>
              <ion-button color="warning" expand="block" v-if="estado == 1" @click="Pedido.estado_id = 2; GuardarPedido(Pedido); publishSocket(Pedido.id);">
                PEDIDO COMPLETADO
              </ion-button>
              <ion-grid>
                <ion-row class="ion-text-center">
                  <ion-col>
                    <ion-label> {{convertirFecha(Pedido.created_at).toLocaleDateString('es-ES', {day: 'numeric', month: 'long'})}}</ion-label> -
                    <ion-label> subtotal: {{ subTotal(Pedido.pedido_detalle) }} bs</ion-label>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-card-content>

          </ion-accordion>
        </ion-accordion-group>
        </div>

        <!--  Todos completados hoy dia -->
        <div v-else-if="pestaña == 2">
        <ion-accordion-group v-for="(Pedido, index) in pedidos.filter(Pedido => Pedido.estado_id == 2 && ((hoy.toLocaleDateString()) == convertirFecha(Pedido.created_at).toLocaleDateString()))" :key="index">
          <ion-accordion>

            <ion-item slot="header" value="first" color="light">
              <ion-card-header>        
                <ion-card-title color="dark">#{{Pedido.id + " - "+ (Pedido.nombre_cliente? Pedido.nombre_cliente:"Pedido") }} <ion-badge color="danger" v-show="!Pedido.pagado" >DEUDA</ion-badge> </ion-card-title>                       
              </ion-card-header>
            </ion-item>

            <ion-card-content slot="content" mode="md">
              <ion-item-sliding v-for="(detalle, index) in Pedido.pedido_detalle " :key="index">
                <ion-item-options side="end">
                  <ion-item-option @click="(detalle.completado = true); GuardarProducto(detalle);">LISTO
                  </ion-item-option>
                </ion-item-options>

                <ion-item v-show="detalle.completado == false">
                  <ion-checkbox color="warning" slot="start" :checked="detalle.completado"
                    @click="(detalle.completado = true); GuardarProducto(detalle);"></ion-checkbox>

                  <ion-label class="ion-text-wrap">{{detalle.producto.nombre }}</ion-label>

                </ion-item>

              </ion-item-sliding>
              
              <ion-item-sliding v-for="(detalle, index) in Pedido.pedido_detalle " :key="index" :disabled="true">
                <ion-item color="medium" v-if="detalle.completado">
                  <ion-label class="ion-text-wrap">{{detalle.producto.nombre }}</ion-label>
                </ion-item>
              </ion-item-sliding>                        
              <br>
              <ion-button color="danger" expand="block" v-if="Pedido.pagado == 0" @click="Pedido.pagado = 1; GuardarPedido(Pedido);">
                PAGAR DEUDA
              </ion-button>
              <ion-button color="warning" expand="block" v-if="Pedido.estado_id == 1" @click="Pedido.estado_id = 2; GuardarPedido(Pedido); publishSocket(Pedido.id);">
                PEDIDO COMPLETADO
              </ion-button>
              <ion-grid>
                <ion-row class="ion-text-center">
                  <ion-col>
                    <ion-label> {{convertirFecha(Pedido.created_at).toLocaleDateString('es-ES', {day: 'numeric', month: 'long'})}}</ion-label> -
                    <ion-label> subtotal: {{ subTotal(Pedido.pedido_detalle) }} bs</ion-label>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-card-content>

          </ion-accordion>
        </ion-accordion-group>
        </div>

        <!--  Todos Deuda -->
        <div v-else-if="pestaña == 3">
        <ion-accordion-group v-for="(Pedido, index) in pedidos.filter(Pedido => Pedido.pagado == 0)" :key="index">
          <ion-accordion>

            <ion-item slot="header" value="first" color="light">
              <ion-card-header>        
                <ion-card-title color="dark">#{{Pedido.id + " - "+ (Pedido.nombre_cliente? Pedido.nombre_cliente:"Pedido") }} <ion-badge color="danger" v-show="!Pedido.pagado" >DEUDA</ion-badge> </ion-card-title>                       
              </ion-card-header>
            </ion-item>

            <ion-card-content slot="content" mode="md">
              <ion-item-sliding v-for="(detalle, index) in Pedido.pedido_detalle " :key="index">
                <ion-item-options side="end">
                  <ion-item-option @click="(detalle.completado = true); GuardarProducto(detalle);">LISTO
                  </ion-item-option>
                </ion-item-options>

                <ion-item v-show="detalle.completado == false">
                  <ion-checkbox color="warning" slot="start" :checked="detalle.completado"
                    @click="(detalle.completado = true); GuardarProducto(detalle);"></ion-checkbox>

                  <ion-label class="ion-text-wrap">{{detalle.producto.nombre }}</ion-label>

                </ion-item>

              </ion-item-sliding>
              
              <ion-item-sliding v-for="(detalle, index) in Pedido.pedido_detalle " :key="index" :disabled="true">
                <ion-item color="medium" v-if="detalle.completado">
                  <ion-label class="ion-text-wrap">{{detalle.producto.nombre }}</ion-label>
                </ion-item>
              </ion-item-sliding>                        
              <br>
              <ion-button color="danger" expand="block" v-if="Pedido.pagado == 0" @click="Pedido.pagado = 1; GuardarPedido(Pedido);">
                PAGAR DEUDA
              </ion-button>
              <ion-button color="warning" expand="block" v-if="Pedido.estado_id == 1" @click="Pedido.estado_id = 2; GuardarPedido(Pedido); publishSocket(Pedido.id);">
                PEDIDO COMPLETADO
              </ion-button>
              <ion-grid>
                <ion-row class="ion-text-center">
                  <ion-col>
                    <ion-label> {{convertirFecha(Pedido.created_at).toLocaleDateString('es-ES', {day: 'numeric', month: 'long'})}}</ion-label> -
                    <ion-label> subtotal: {{ subTotal(Pedido.pedido_detalle) }} bs</ion-label>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-card-content>

          </ion-accordion>
        </ion-accordion-group>
        </div>

        <!--  Todos por mes -->
        <div v-else-if="pestaña == 4" >
          <ion-accordion-group v-for="(Mes, index) in pedidosPorMes" :key="index">
            <ion-accordion>
              <!-- Header-->
              <ion-item slot="header" color="warning">
                <ion-label style="font-size: 20px; margin: 10px;" >{{ConvertirMesAnio(Mes.mes)}}</ion-label>
              </ion-item>
              <!-- Contenido-->

              <ion-accordion-group slot="content" v-for="(Pedido, index) in Mes.pedidos" :key="index">         
                <ion-accordion >

                  <ion-item slot="header" value="first" color="light">
                    <ion-card-header>        
                      <ion-card-title color="dark">#{{Pedido.id + " - "+ (Pedido.nombre_cliente? Pedido.nombre_cliente:"Pedido") }} <ion-badge color="danger" v-show="!Pedido.pagado" >DEUDA</ion-badge> </ion-card-title>                       
                    </ion-card-header>
                  </ion-item>

                  <ion-card-content slot="content" mode="md">
                    <ion-item-sliding v-for="(detalle, index) in Pedido.pedido_detalle " :key="index">
                      <ion-item-options side="end">
                        <ion-item-option @click="(detalle.completado = true); GuardarProducto(detalle);">LISTO
                        </ion-item-option>
                      </ion-item-options>

                      <ion-item v-show="detalle.completado == false">
                        <ion-checkbox color="warning" slot="start" :checked="detalle.completado"
                          @click="(detalle.completado = true); GuardarProducto(detalle);"></ion-checkbox>
                        <ion-label class="ion-text-wrap"> {{detalle.producto.nombre }}</ion-label>
                      </ion-item>

                    </ion-item-sliding>
                    
                    <ion-item-sliding v-for="(detalle, index) in Pedido.pedido_detalle " :key="index" :disabled="true">
                      <ion-item color="medium" v-if="detalle.completado">                 
                        <ion-label class="ion-text-wrap"> {{ detalle.producto.nombre }}</ion-label>
                      </ion-item>
                    </ion-item-sliding>                        
                    <br>
                    <ion-button color="danger" expand="block" v-if="Pedido.pagado == 0" @click="Pedido.pagado = 1; GuardarPedido(Pedido);">
                      PAGAR DEUDA
                    </ion-button>
                    <ion-grid>
                      <ion-row class="ion-text-center">
                        <ion-col>
                          <ion-label> {{convertirFecha(Pedido.created_at).toLocaleDateString('es-ES', {day: 'numeric', month: 'long'})}}</ion-label> -
                          <ion-label> subtotal: {{ subTotal(Pedido.pedido_detalle) }} bs</ion-label>
                        </ion-col>
                      </ion-row>
                    </ion-grid>
                  </ion-card-content>

                </ion-accordion>
              </ion-accordion-group>
            </ion-accordion>              
          </ion-accordion-group>
        </div>                     
    
      </ion-card>
            
    </ion-content>

    <ion-footer mode="md">
      <ion-toolbar color="light">
        <ion-segment value="default" color="warning">
          <ion-segment-button value="default" @click="pestaña = 1">
            <ion-label>Pendientes</ion-label>
          </ion-segment-button>
          <ion-segment-button value="hoy" @click="pestaña = 2">
            <ion-label>Hoy</ion-label>
          </ion-segment-button>
          <ion-segment-button value="Deudas" @click="pestaña = 3">
            <ion-label>Deudas</ion-label>
          </ion-segment-button>
          <ion-segment-button value="todos" @click="pestaña = 4">
            <ion-label>Todos</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonItem, IonLabel, IonCard, IonCardContent, IonCardHeader,
  IonCardTitle, IonItemOption, IonItemOptions, IonItemSliding, IonRefresher, IonRefresherContent, IonAccordion,
  IonAccordionGroup, IonCheckbox, IonSegment, IonSegmentButton,IonFooter,toastController,IonBadge,IonGrid,IonRow,IonCol
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { ApiService } from '@/data/Services/ApiService';
import { arrowBackOutline } from "ionicons/icons";
import {ably} from "../data/Services/SocketService"
import {Howl} from 'howler';

export default defineComponent({
  name: 'PendientePage',
  
  mounted() {
    this.obtenerPedidosApi()
    this.suscribeSocketPedidos()
    this.suscribeSocketCompletados()
    this.sound = new Howl({
                    src: ['https://apicafe.h21iglesia.org/sounds/pristine-609.mp3'],
                    html5: true
                });
    this.obtenerFecha()
  },
  data() {
    return {
      arrowBackOutline,
      pedidos: null,
      trabajadores: [{ nombre: 'Lucas' }, { nombre: 'Sarah Mendez' }, { nombre: 'Emily' }, { nombre: 'Mateo' }, { nombre: 'Nicol' }, { nombre: 'Gabriel' }, { nombre: 'Andrea' }, { nombre: 'Alejandra' }, { nombre: 'Sarah Antelo' }, { nombre: 'Alvaro' }, { nombre: 'Tammy' }],
      pedidocopia: null,
      estado: 1,
      pestaña: 1, 
      sound: null,
      hoy:null,
      pedidosPorMes: null,
      MesSeleccionado: "3-2023"    
    }
  },
  methods: {
    Cargar(event: CustomEvent) {
      this.obtenerPedidosApi()
      setTimeout(() => {
        // No borrar comentario
        // eslint-disable-next-line no-undef
        const target = event.target as HTMLIonRefresherElement;
        target.complete();
      }, 500);
    },
    GuardarProducto(detalle:any) {
      ApiService.actualizar('pedidoProducto', detalle.id, detalle)
    },
    GuardarPedido(pedido:any) {
      ApiService.actualizar('pedido', pedido.id, pedido)

    },
    GuaradarSelectTrabajador(value:string, detalle:any) {
      detalle.preparo = value
      ApiService.actualizar('pedidoProducto', detalle.id, detalle)
    },
    async obtenerPedidosApi() {
      this.pedidos = (await ApiService.obtener('pedido')).reverse()
      this.AgruparPedidosPorMes();
    },
    async suscribeSocketPedidos(){
      const channel = ably.channels.get('pedidos');
      await channel.subscribe('comida', () => {
        this.obtenerPedidosApi()
        this.ReproducirSonido()
        this.Notificar('top','Nuevo pedido!')  
      });
    },
    async suscribeSocketCompletados(){
      const channel = ably.channels.get('pedidos');
      await channel.subscribe('completado', (message) => {   
        this.obtenerPedidosApi()
        this.Notificar('bottom',message.data)
      });
    },
    async publishSocket(numero:string){
      const channel = ably.channels.get('pedidos');
      await channel.publish('completado', 'se completo el pedido # ' + numero);
    },
    async Notificar(position: 'top' | 'middle' | 'bottom',mensaje){
      const toast = await toastController.create({
          message: mensaje,
          duration: 2000,
          color:'light',
          position: position
        });

        await toast.present();
    },
    ReproducirSonido(){
      this.sound.play()
    },
    obtenerFecha(){
      const tiempoTranscurrido = Date.now();
      const hoy = new Date(tiempoTranscurrido);
      this.hoy = hoy
    },
    convertirFecha(fecha: string){
      const fechanueva = new Date(fecha)
      return fechanueva
    },
    subTotal(detalle: any){
      let subtotal = 0;
      for (let i = 0; i < detalle.length; i++) {
        subtotal += detalle[i].producto.costo;    
      }
      return subtotal
    },
    AgruparPedidosPorMes(){
      let pedidos = this.pedidos;

      // Agregar propiedad de fecha al objeto
      pedidos.forEach(pedido => {
        pedido.fecha = new Date(pedido.created_at);
      });

      // Agrupar los pedidos por mes en un array de objetos
      const pedidosPorMes = pedidos.reduce((arr, pedido) => {
        const fecha = new Date(pedido.created_at);
        const mes = `${fecha.getMonth() + 1}-${fecha.getFullYear()}`;
        const mesExistente = arr.find(obj => obj.mes === mes);
        if (mesExistente) {
          mesExistente.pedidos.push(pedido);
        } else {
          arr.push({
            mes,
            pedidos: [pedido]
          });
        }
        return arr;
      }, []);

      this.pedidosPorMes = pedidosPorMes;
    },
    ConvertirMesAnio(fecha: string){
      const fechaArray = fecha.split("-"); // ["5", "2023"]
      const mes = parseInt(fechaArray[0]) - 1; // Restar 1 ya que los meses en JavaScript empiezan en 0 (enero)
      const anio = parseInt(fechaArray[1]);
      const fechaCompleta = new Date(anio, mes);
      const mesTexto = fechaCompleta.toLocaleString('es-ES', { month: 'long' }); // Obtener el mes en texto completo en español

      const resultado = `${mesTexto} ${anio}`; // "mayo de 2023"
      return resultado
    }


  },
  computed: {

  },
  components: {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonItem, IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItemOption, IonItemOptions, IonItemSliding
    , IonRefresher, IonRefresherContent, IonAccordion, IonAccordionGroup, IonCheckbox,IonSegment, IonSegmentButton,IonFooter,IonBadge,IonGrid,IonRow,IonCol
  }
});
</script>
<style scoped>
ion-segment {
  margin: 5;
}
</style>