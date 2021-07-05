<template>
  <div class="container">
    <h3>Agregar Pais: </h3>
    <form @submit.prevent="agregarPais()">
      <label>Nombre: </label><input v-model="nombrePais"><br>
      <label>Descripcion: </label><input v-model="descPais"><br>
      <button @submit="agregarPais()">Mandar</button><br>
    </form>
    <hr>
    <h3>Agregar Ciudad: </h3>
    <form @submit.prevent="agregarCiudad()">
      <label>Nombre Ciudad: </label><input v-model="nombreCiu"><br>
      <label>Poblacion: </label><input v-model="poblacion"><br>
      <p>pertence a: </p>
      <select name="paises" id="" v-model="idPais">
        <option :value="pais.id_pais" v-for="pais in listaPaises" :key="pais.id_pais">{{pais.nombre}}</option>
      </select>
      <button @submit="actua()">Mandar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return { 
        listaPaises: [],
        nombrePais: '',
        descPais: '',
        nombreCiu: '',
        poblacion: '',
        idPais: ''
        }
  },
  async mounted() {
    const response = await axios.get('http://localhost:4000')
    this.listaPaises = response.data[13];
  },
  methods: {
    async agregarPais(){
      axios.get('http://localhost:4080', {params: {case: "pais", nombrePais: this.nombrePais, descPais: this.descPais}})
      console.log("pais agregado")
      location.reload()
    },
    async agregarCiudad(){
      axios.get('http://localhost:4080', {params: {case: "ciudad", nombreCiu: this.nombreCiu, poblacion: this.poblacion, idPais: this.idPais}})
      console.log("ciudad agregado")
    }
  },
}
</script>

<style lang="scss" scoped>

</style>