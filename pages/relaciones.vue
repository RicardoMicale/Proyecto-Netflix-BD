<template>
  <div class="container">
    <h3>Contrata: </h3>
    <form @submit.prevent="contrata()">
      <select name="usuarios" id="" v-model="idUsuario">
        <option :value="usuario.id_usuario" v-for="usuario in listaUsuarios" :key="usuario.id_usuario">{{usuario.nombre_usuario}}</option>
      </select>
      <p>contrata: </p>
      <select name="suscripciones" id="" v-model="idSus">
        <option :value="sus.id_suscripcion" v-for="sus in listaSus" :key="sus.id_suscripcion">{{sus.nombre}}</option>
      </select>
      <p>empezando en: </p>
      <label>Fecha Inicio: </label><input type="date" v-model="fechaInicio"><br>
      <button @submit="contrata()">Mandar</button>
    </form>
    <hr>
    <h3>Terminar contrato: </h3>
    <form @submit.prevent="finalizar()">
        <select name="usuarios" id="" v-model="idUsuarioFin">
         <option :value="usuario.id_usuario" v-for="usuario in listaUsuarios" :key="usuario.id_usuario">{{usuario.nombre_usuario}}</option>
        </select><br>
        <select name="contratos" id="">
         <option :value="contrato.id_usuario" v-for="contrato in listaContratos" :key="contrato.id_usuario" v-show="idUsuarioFin == contrato.id_usuario && contrato.fecha_inicio != null && contrato.fecha_fin == null">{{contrato.fecha_inicio}}</option>
        </select><br>
        <label>Fecha Fin: </label><input type="date" v-model="fechaFin"><br>
        <button @submit="finalizar()">Mandar</button>
    </form>
    <hr>
    <h3>Recomendar: </h3>
    <form @submit.prevent="recomendar()">
        <select name="usuarios" id="" v-model="idUsuarioRec">
         <option :value="usuario.id_usuario" v-for="usuario in listaUsuarios" :key="usuario.id_usuario">{{usuario.nombre_usuario}}</option>
        </select><br>
        <select name="perfiles" id="" v-model="idPerfilRec">
         <option :value="perfil.id_perfil" v-for="perfil in listaPerfiles" :key="perfil.id_perfil" v-show="idUsuarioRec == perfil.id_usuario">{{perfil.nombre}}</option>
        </select><br>
        <p>Recomendar: </p>
        <select name="peliculas" id="" v-model="idPeliculaRec">
         <option :value="pelicula.id_pelicula" v-for="pelicula in listaPeliculas" :key="pelicula.id_pelicula">{{pelicula.nombre}}</option>
        </select><br>
        <button @submit="recomendar()">Mandar</button>
    </form>
    <hr>
    <h3>Agregar requerimiento: </h3>
    <form @submit.prevent="requiere()">
        <select name="contenido" id="" v-model="contenidoIdReq">
            <option :value="contenido.id" v-for="contenido in listaContenidos" :key="contenido.id">{{contenido.nombre}}</option>
        </select><br>
        <p> requiere: </p>
        <select name="suscripciones" id="" v-model="idSusReq">
            <option :value="sus.id_suscripcion" v-for="sus in listaSus" :key="sus.id_suscripcion">{{sus.nombre}}</option>
        </select>
        <button @submit="requiere()">Mandar</button>
    </form>
    <hr>
    <h3>Visualiza: </h3>
    <form @submit.prevent="visualiza()">
        <select name="usuarios" id="" v-model="idUsuarioVis">
         <option :value="usuario.id_usuario" v-for="usuario in listaUsuarios" :key="usuario.id_usuario">{{usuario.nombre_usuario}}</option>
        </select><br>
        <select name="perfiles" id="" v-model="idPerfilVis">
         <option :value="perfil.id_perfil" v-for="perfil in listaPerfiles" :key="perfil.id_perfil" v-show="idUsuarioVis == perfil.id_usuario">{{perfil.nombre}}</option>
        </select><br>
        <input type="radio" id="yes" :value="true" v-model="pelicula">
        <label for="yes">Pelicula</label>
        <select name="peliculas" id="" v-model="idPeliculaVis" v-if="pelicula">
         <option :value="pelicula.id_pelicula" v-for="pelicula in listaPeliculas" :key="pelicula.id_pelicula">{{pelicula.nombre}}</option>
        </select>
        <br>
        <input type="radio" id="no" :value="false" v-model="pelicula">
        <label for="no">Episodio</label><br>
        <select name="series" id="" v-model="serieId" v-if="!pelicula">
            <option :value="serie.id_serie" v-for="serie in listaSeries" :key="serie.id">{{serie.nombre}}</option>
        </select><br>
        <select name="temporadas" id="" v-model="temporadaId" v-if="!pelicula">
            <option :value="temporada.id_temporada" v-for="temporada in listaTemporadas" :key="temporada.id_temporada" v-show="serieId == temporada.id_serie">{{temporada.nombre}} - Temporada {{temporada.numero}}</option>
        </select><br>
        <select name="episodios" id="" v-model="episodioId" v-if="!pelicula">
         <option :value="episodio.id_episodio" v-for="episodio in listaEpisodios" :key="episodio.id_episodio" v-show="temporadaId == episodio.id_temporada">{{episodio.nombre}}</option>
        </select><br>
        <label>Calificacion: </label><input type="number" v-model="calificacion"><br>
        <button @submit="visualiza()">Mandar</button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        listaUsuarios: [],
        listaTemporadas: [],
        listaEpisodios: [],
        listaSeries: [],
        listaSus: [],
        listaContratos: [],
        listaContenidos: [],
        listaPeliculas: [],
        listaPerfiles: [],
        idUsuarioFin: '',
        idUsuario: '',
        fechaFin: '',
        idSus: '',
        fechaInicio: '',
        idUsuarioRec: '',
        idPerfilRec: '',
        idPeliculaRec: '',
        contenidoIdReq: '',
        idSusReq: '',
        idUsuarioVis: '',
        idPerfilVis: '',
        idPeliculaVis: '',
        pelicula: true,
        serieId: '',
        temporadaId: '',
        episodioId: '',
        calificacion: ''
      }
    },
    async mounted() {
      const response = await axios.get('http://localhost:4000')
      this.listaUsuarios = response.data[15];
      this.listaSus = response.data[16];
      this.listaContratos = response.data[17];
      this.listaContenidos = response.data[9];
      this.listaPerfiles = response.data[18];
      this.listaPeliculas = response.data[19];
      this.listaEpisodios = response.data[20];
      this.listaSeries = response.data[10];
      this.listaTemporadas = response.data[11];
    },
    methods: {
      async contrata() {
            axios.get('http://localhost:4080', {params: {case: "contrata", idUsuario: this.idUsuario, idSus: this.idSus, fechaInicio: this.fechaInicio}})
            alert("contrato agregado")
            location.reload()  
      },
      async finalizar(){
          axios.get('http://localhost:4080', {params: {case: "termina", idUsuarioFin: this.idUsuarioFin, fechaFin: this.fechaFin}})
         alert("contrato terminado")
      },
      async recomendar(){
          axios.get('http://localhost:4080', {params: {case: "recomendar", idUsuarioRec: this.idUsuarioRec, idPerfilRec: this.idPerfilRec, idPeliculaRec: this.idPeliculaRec}})
          alert("recomendacion agregada")
      },
      async requiere(){
          axios.get('http://localhost:4080', {params: {case: "requiere", contenidoIdReq: this.contenidoIdReq, idSusReq: this.idSusReq}})
          alert("requerimiento agregado")
      },
      async visualiza(){
          if(this.pelicula){
            axios.get('http://localhost:4080', {params: {case: "visualiza", idUsuarioVis: this.idUsuarioVis, idPerfilVis: this.idPerfilVis, idPeliculaVis: this.idPeliculaVis, episodioId: 0, calificacion: this.calificacion}})
          } else {
            axios.get('http://localhost:4080', {params: {case: "visualiza", idUsuarioVis: this.idUsuarioVis, idPerfilVis: this.idPerfilVis, idPeliculaVis: 0, episodioId: this.episodioId, calificacion: this.calificacion}})
          }
          alert("visualizacion agregada")
      },
      numeroContenidos(){
          return this.listaContenidos.length
      }
    }
  }

</script>

<style>
.container{
    overflow: scroll;
    height: 100%;
}
form{
    padding-left: 4vw;
}
h3{
    padding-left: 4vw;
}
</style>
