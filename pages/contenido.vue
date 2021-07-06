<template>
  <div class="container">
    <h3>Agregar Contenido: </h3>
    <form @submit.prevent="agregar()">
      <input placeholder="Nombre" v-model="nombre"><br>
      <input placeholder="Estreno (año)" v-model="ano"><br>
      <label >Original de Netflix: <input class="radio" type="checkbox" v-model="original"></label><br>
      <input class="radio" type="radio" id="yes" :value="true" v-model="pelicula">
      <label for="yes">Pelicula</label>
      <br>
      <input class="radio" type="radio" id="no" :value="false" v-model="pelicula">
      <label for="no">Serie</label>
      <div v-if="pelicula == true">
        <input placeholder="Duracion (min)" type="number" v-model="duracion"><br>
        <label >Ganadora de Premio: <input type="checkbox" v-model="ganadora"></label><br>
        <input placeholder="Sinopsis" v-model="sinopsis"><br>
      </div>
      <div v-if="pelicula == false">
        <input placeholder="Descripcion" v-model="serieDes"><br>
      </div>
      <button @submit="agregar()">Mandar</button>
    </form>
    <hr>
    <h3>Agregar Temporada: </h3>
    <form @submit.prevent="agregarTemp()">
        <select name="series" id="" v-model="serie">
            <option value="" disabled selected>Serie</option>
            <option :value="serie.id_serie" v-for="serie in listaSeries" :key="serie.id">{{serie.nombre}}</option>
        </select><br>
        <input placeholder="Numero de Temporada" type="number" v-model="numeroTemp"><br>
        <input placeholder="Numero de Capitulos" type="number" v-model="capitulos"><br>
        <button @submit="agregarTemp()">Mandar</button>
    </form>
    <hr>
    <h3>Agregar Episodio: </h3>
    <form @submit.prevent="agregarEpisodio()">
        <select name="temporadas" id="" v-model="temporada">
            <option :value="temporada.id_temporada" v-for="temporada in listaTemporadas" :key="temporada.id_temporada">{{temporada.nombre}} - Temporada {{temporada.numero}}</option>
        </select><br>
        <input placeholder="Nombre del Episodio" v-model="nombreEp"><br>
        <input placeholder="Numero del Episodio" type="number" v-model="numberEp"><br>
        <input placeholder="Descripcion" v-model="descEp"><br>
        <button @submit="agregarEpisodio()">Mandar</button>
    </form>
    <hr>
    <h3>Agregar Genero: </h3>
    <form @submit.prevent="agregarGenero()">
        <select name="contenido" id="" v-model="contenidoId">
          <option value="" disabled selected>Contenido</option>
            <option :value="contenido.id" v-for="contenido in listaContenidos" :key="contenido.id">{{contenido.nombre}}</option>
        </select><br>
        <p> tiene: </p>
        <select name="generos" id="" v-model="genero">
          <option value="" disabled selected>Genero</option>
            <option :value="genero.id_genero" v-for="genero in listaGeneros" :key="genero.id_genero">{{genero.nombre}}</option>
        </select><br>
        <button @submit="agregarGenero()">Mandar</button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        listaContenidos: [],
        listaSeries: [],
        listaTemporadas: [],
        listaGeneros: [],
        nombre: '',
        ano: null,
        original: false,
        pelicula: true,
        serieDes: '',
        duracion: '',
        ganadora: false,
        sinopsis: '',
        serie: '',
        numeroTemp: '',
        capitulos: '',
        nombreEp: '',
        numberEp: '',
        temporada: 0,
        descEp: '',
        contenidoId: '',
        genero: ''


      }
    },
    async mounted() {
      const response = await axios.get('http://localhost:4000')
      this.listaContenidos = response.data[9];
      this.listaSeries = response.data[10];
      this.listaTemporadas = response.data[11];
      this.listaGeneros = response.data[12];
    },
    methods: {
      async agregar() {
        if (this.pelicula) {
          axios.get('http://localhost:4080', {params: {case: "pelicula", nombre: this.nombre, ano: this.ano, original: this.original, duracion: this.duracion, ganadora: this.ganadora, sinopsis: this.sinopsis, id: this.numeroContenidos()}})
          console.log("pelicula agregada")
        } else {
          axios.get('http://localhost:4080', {params: {case: "serie", nombre: this.nombre, ano: this.ano, original: this.original, serieDes: this.serieDes, id: this.numeroContenidos()}})
          console.log("serie agregada")
        }
        location.reload()  
      },
      async agregarTemp(){
          axios.get('http://localhost:4080', {params: {case: "temporada", serie: this.serie, numeroTemp: this.numeroTemp, capitulos: this.capitulos}})
          console.log("temporada agregada")
      },
      async agregarEpisodio(){
          axios.get('http://localhost:4080', {params: {case: "episodio", temporada: this.temporada, nombreEp: this.nombreEp, numberEp: this.numberEp, descEp: this.descEp}})
          console.log("episodio agregada")
      },
      async agregarGenero(){
          axios.get('http://localhost:4080', {params: {case: "genero", contenidoId: this.contenidoId, genero: this.genero}})
          console.log("genero agregada")
      },
      numeroContenidos(){
          return this.listaContenidos.length
      }
    }
  }

</script>

<style>
      input[type=radio], input[type=checkbox] {
         appearance: none;
         -webkit-appearance: none;
         -moz-appearance: none;
         padding: 2.5px;
         background-color: rgba(128, 128, 128, .25);
         border-radius:50%;
         margin: 3vh 1vw -2.5px 1vw ;
         border: 3px solid rgba(128, 128, 128, .25);
         box-shadow: 0 0  0 3px #b82020;
      }
      input[type=radio]:checked , input[type=checkbox]:checked{
         background-color: #b82020;
      }
      input[type=radio]:hover, input[type=checkbox]:hover {
         cursor: pointer;
      }
      input[type=checkbox]{
        border-radius: 0;
      }
</style>
