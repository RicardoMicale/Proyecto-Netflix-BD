<template>
  <div class="container">
    <h3>Agregar Contenido: </h3>
    <form @submit.prevent="agregar()">
      <label>Nombre: </label><input v-model="nombre"><br>
      <label>Ano de lanzamiento: </label><input v-model="ano"><br>
      <label>Contenido original: </label><input type="checkbox" v-model="original"><br>
      <input type="radio" id="yes" :value="true" v-model="pelicula">
      <label for="yes">Pelicula</label>
      <br>
      <input type="radio" id="no" :value="false" v-model="pelicula">
      <label for="no">Serie</label>
      <div v-if="pelicula == true">
        <label>Duracion(minutos): </label><input type="number" v-model="duracion"><br>
        <label>Ganadora de premios: </label><input type="checkbox" v-model="ganadora"><br>
        <label>Sinopsis: </label><input v-model="sinopsis"><br>
      </div>
      <div v-if="pelicula == false">
        <label>Descripcion: </label><input v-model="serieDes"><br>
      </div>
      <button @submit="agregar()">Mandar</button>
    </form>
    <hr>
    <h3>Agregar Temporada: </h3>
    <form @submit.prevent="agregarTemp()">
        <select name="series" id="" v-model="serie">
            <option :value="serie.id_serie" v-for="serie in listaSeries" :key="serie.id">{{serie.nombre}}</option>
        </select><br>
        <label>Numero Temporada: </label><input type="number" v-model="numeroTemp"><br>
        <label>Numero de Capitulos: </label><input type="number" v-model="capitulos"><br>
        <button @submit="agregarTemp()">Mandar</button>
    </form>
    <hr>
    <h3>Agregar Episodio: </h3>
    <form @submit.prevent="agregarEpisodio()">
        <select name="temporadas" id="" v-model="temporada">
            <option :value="temporada.id_temporada" v-for="temporada in listaTemporadas" :key="temporada.id_temporada">{{temporada.nombre}} - Temporada {{temporada.numero}}</option>
        </select><br>
        <label>Nombre Episodio: </label><input v-model="nombreEp"><br>
        <label>Numero del episodio: </label><input type="number" v-model="numberEp"><br>
        <label>Descripcion: </label><input v-model="descEp"><br>
        <button @submit="agregarEpisodio()">Mandar</button>
    </form>
    <hr>
    <h3>Agregar Genero: </h3>
    <form @submit.prevent="agregarGenero()">
        <select name="contenido" id="" v-model="contenidoId">
            <option :value="contenido.id" v-for="contenido in listaContenidos" :key="contenido.id">{{contenido.nombre}}</option>
        </select><br>
        <p> tiene: </p>
        <select name="generos" id="" v-model="genero">
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
        duracion: 0,
        ganadora: false,
        sinopsis: '',
        serie: '',
        numeroTemp: 0,
        capitulos: 0,
        nombreEp: '',
        numberEp: 0,
        temporada: 0,
        descEp: '',
        contenidoId: 0,
        genero: 0


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

</style>
