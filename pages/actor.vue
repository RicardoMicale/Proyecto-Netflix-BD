<template>
  <div class="container">
    <h3>Agregar Actor: </h3>
    <form @submit.prevent="agregarActor()">
      <input placeholder="Nombre" v-model="nombre" required><br>
      <input placeholder="Edad" v-model="edad" required><br>
      <input placeholder="Experiencia" v-model="exp" required><br>
      <select name="sexos" id="" v-model="sexo">
        <option value="" disabled selected>Sexo</option>
        <option value="M">Masculino</option>
        <option value="F">Femenino</option>
        <option value="N/A" selected>Sin definir</option>
      </select><br>
      <button @submit="agregarActor()">Mandar</button><br>
    </form>
    <hr>
    <form @submit.prevent="actua()">
      <select name="actores" id="" v-model="actor">
        <option value="" disabled selected>Actor</option>
        <option :value="actor.id_actor" v-for="actor in listaActores" :key="actor.id">{{actor.nombre}}</option>
      </select>
      <select name="protagoniza" id="" v-model="prot">
        <option :value="true">protagoniza</option>
        <option :value="false" >actua en</option>
      </select>
      <select name="contenidos" id="" v-model="cont">
        <option value="" disabled selected>Contenido</option>
        <option :value="contenido.id" v-for="contenido in listaContenidos" :key="contenido.id">{{contenido.nombre}}</option>
      </select><br>
      <input placeholder="Premios Ganados" v-model="premios"><br>
      <button @submit="actua()">Mandar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return { 
        listaActores: [],
        listaContenidos: [],
        nombre: '',
        edad: null,
        exp: null,
        sexo: '',
        actor: '',
        prot: false,
        cont: '',
        premios: ''
        }
  },
  async mounted() {
    const response = await axios.get('http://localhost:4000')
    this.listaActores = response.data[8];
    this.listaContenidos = response.data[9];
  },
  methods: {
    async agregarActor(){
      axios.get('http://localhost:4080', {params: {case: "actor", nombre: this.nombre, edad: this.edad, exp: this.exp, sexo: this.sexo}})
      console.log("actor agregado")
      location.reload()  
    },
    async actua(){
      axios.get('http://localhost:4080', {params: {case: "actua", actor: this.actor, prot: this.prot, cont: this.cont, premios: this.premios}})
      console.log("actua agregado")
    }
  },
}
</script>

<style lang="scss" scoped>

</style>