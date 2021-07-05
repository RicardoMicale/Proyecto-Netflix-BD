<template>
  <div class="container">
    <h3>Agregar Usuario: </h3>
    <form @submit.prevent="agregarUsuario()">
      <label>Usuario: </label><input v-model="usuario"><br>
      <label>Nombre: </label><input v-model="nombreUser"><br>
      <label>Apellido: </label><input v-model="apellidoUser"><br>
      <label>Email: </label><input type="email" v-model="email"><br>
      <label>Contrasena: </label><input type="password" v-model="password"><br>
      <label>Edad: </label><input type="number" v-model="edad"><br>
      <label>Sexo(M, F, N/A): </label><input v-model="sexo"><br>
      <select name="paises" id="" v-model="idPais">
        <option :value="pais.id_pais" v-for="pais in listaPaises" :key="pais.id_pais">{{pais.nombre}}</option>
      </select>
      <select name="ciudad" id="" v-model="idCiudad">
        <option :value="ciudad.id_ciudad" v-for="ciudad in listaCiudades" :key="ciudad.id_ciudad" v-show="idPais == ciudad.id_pais">{{ciudad.nombre}}</option>
      </select>
      <button @submit="agregarUsuario()">Mandar</button><br>
    </form>
    <hr>
    <form @submit.prevent="agregarPerfil()">
      <h3>Agregar Perfil: </h3>
      <p>Nombre perfil: </p><input v-model="perfil">
      <p>pertenece a: </p>
      <select name="usuarios" id="" v-model="idUsuario">
        <option :value="usuario.id_usuario" v-for="usuario in listaUsuarios" :key="usuario.id_usuario">{{usuario.nombre_usuario}}</option>
      </select>
      <button @submit="agregarPerfil()">Mandar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return { 
        listaPaises: [],
        listaCiudades: [],
        listaUsuarios: [],
        usuario: '',
        nombreUser: '',
        apellidoUser: '',
        email: '',
        password: '',
        edad: null,
        sexo: '',
        idPais: '',
        idCiudad: '',
        idUsuario: '',
        perfil: ''
        }
  },
  async mounted() {
    const response = await axios.get('http://localhost:4000')
    this.listaPaises = response.data[13];
    this.listaCiudades = response.data[14];
    this.listaUsuarios = response.data[15];
  },
  methods: {
    async agregarUsuario(){
      axios.get('http://localhost:4080', {params: {case: "usuario", idPais: this.idPais, idCiudad: this.idCiudad, usuario: this.usuario, email: this.email, password: this.password, nombreUser: this.nombreUser, apellidoUser: this.apellidoUser, edad: this.edad, sexo: this.sexo}})
      console.log("usuario agregado")
      location.reload()  
    },
    async agregarPerfil(){
      axios.get('http://localhost:4080', {params: {case: "perfil", idUsuario: this.idUsuario, perfil: this.perfil}})
      console.log("perfil agregado")
    }
  },
}
</script>

<style lang="scss" scoped>

</style>