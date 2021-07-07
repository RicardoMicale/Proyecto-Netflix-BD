<template>
  <div class="container">
    <h3>Agregar Pais: </h3>
    <form @submit.prevent="agregarPais()">
      <input placeholder="Pais" v-model="nombrePais"><br>
      <input placeholder="Descripcion" v-model="descPais"><br>
      <button @submit="agregarPais()">Mandar</button><br>
    </form>
    <hr>
    <h3>Agregar Ciudad: </h3>
    <form @submit.prevent="agregarCiudad()">
      <input placeholder="Ciudad" v-model="nombreCiu"><br>
      <input placeholder="Poblacion" v-model="poblacion"><br>
      <p>pertence a:</p>
      <select name="paises" id="" v-model="idPais">
        <option value="" disabled selected>Pais</option>
        <option :value="pais.id_pais" v-for="pais in listaPaises" :key="pais.id_pais">{{pais.nombre}}</option>
      </select><br>
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