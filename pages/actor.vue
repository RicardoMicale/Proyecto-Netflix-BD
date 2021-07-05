<template>
  <div class="container">
    <h3>Agregar Actor: </h3>
    <form @submit.prevent="agregarActor()">
      <label>Nombre: </label><input v-model="nombre"><br>
      <label>Edad: </label><input v-model="edad"><br>
      <label>Anos de Experiencia: </label><input v-model="exp"><br>
      <label>Sexo: </label><input v-model="sexo"><br>
      <button @submit="agregarActor()">Mandar</button><br>
    </form>
    <hr>
    <form @submit.prevent="actua()">
      <select name="actores" id="" v-model="actor">
        <option :value="actor.id_actor" v-for="actor in listaActores" :key="actor.id">{{actor.nombre}}</option>
      </select>
      <select name="protagoniza" id="" v-model="prot">
        <option :value="true">protagoniza</option>
        <option :value="false" >actua en</option>
      </select>
      <select name="contenidos" id="" v-model="cont">
        <option :value="contenido.id" v-for="contenido in listaContenidos" :key="contenido.id">{{contenido.nombre}}</option>
      </select>
      <p>Premios ganados: </p><input v-model="premios">
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
        actor: null,
        prot: false,
        cont: 0,
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