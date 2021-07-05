<template>
  <section class="home">
    <div class="main">
      <h4 class="title">Query A</h4>
      <p class="subs">
        <b
          >Películas de drama con más de 2:30H de duración, que han ganado
          premios y tienen una calificación mayor o igual a 4:</b
        >
      </p>
      <p class="response" v-for="pelicula in lista[0]" :key="pelicula.nombre">
        <i>{{ pelicula.nombre }}</i> estrenada en el año
        {{ pelicula.año_lanzamiento }} y tiene una calificación de
        {{ pelicula.avg.substring(0, 3) }}
      </p>
      <h4 class="title">Query B</h4>
      <p class="response" v-for="usuario in lista[1]" :key="usuario.id">
        El usuario <i>{{ usuario.nombre_usuario }}</i> de
        {{ usuario.nombre }} ha visto {{ usuario.count }} episodios de series
        originales de Netflix
      </p>
      <h4 class="title">Query C</h4>
      <p class="subs">
        <b>Top 5 usuarios que más han visto películas recomendadas:</b>
      </p>
      <p
        class="response"
        v-for="(usuario, index) in lista[2]"
        :key="usuario.id"
      >
        <n>{{ index + 1 }}.</n><i> {{ usuario.nombre_usuario }}</i> -
        {{ usuario.count }} películas
      </p>
      <h4 class="title">Query D</h4>
      <p class="subs">
        <b>
          Países donde vivan usuarios que ven series con más de 10 episodios:</b
        >
      </p>
      <p class="response" v-for="paises in lista[3]" :key="paises.id">
        {{ paises.nombre }}
      </p>
      <h4 class="title">Query E</h4>
      <p class="subs">
        <b>Top 3 series por la calificación promedio de sus episodios:</b>
      </p>
      <p class="response" v-for="serie in lista[4]" :key="serie.id">
        <i>{{ serie.nombre }} </i>- {{ serie.avg.substring(0, 3) }}
      </p>
      <h4 class="title">Query F</h4>
      <p class="subs">
        <b
          >Películas en las que actua <i>Daniel Brühl</i> y poseen una
          calificación mayor al promedio de {{ promedio }}</b
        >
      </p>
      <p class="response" v-for="pelicula in lista[5]" :key="pelicula.id">
        <i>{{ pelicula.nombre }}</i> - {{ pelicula.avg.substring(0, 3) }}
      </p>
      <h4 class="title">Query G</h4>
      <p class="response" v-for="usuaria in lista[6]" :key="usuaria.id">
        La usuaria <i>{{ usuaria.nombre }} {{ usuaria.apellido }}</i> de
        {{ usuaria.edad }} años de edad  <br>Usuario:
        {{ usuaria.nombre_usuario }} | Correo: {{ usuaria.email }} <br />
        ha visto 2 o más contenidos que requieren de una suscripción
      </p>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return { 
      lista: [],
      promedio: 0
      
      }
  },
  async mounted() {
    const response = await axios.get('http://localhost:4000')
    this.lista = response.data
    this.promedio = this.lista[7][0].avg.substring(0, 3)
  },
}
</script>

<style lang="scss" scoped>
.main {
  padding-top: 4vh;
  padding-left: 10vw;
  background-image: url("../assets/background2.jpg");
  background-position: right;
  background-size: cover;
  overflow: scroll;
  height: 100%;

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 4vw;
    color: #b82020;
    letter-spacing: 1px;
    margin: 5vh 0 2.5vh 0;
  }

  .subs {
    font-weight: 300;
    font-size: 2vw;
    color: #202020;
    word-spacing: 5px;
    padding-bottom: 15px;
    width: 50vw;
    text-align: justify;
  }
  .response {
    font-weight: 300;
    font-size: 2.5vw;
    color: #202020;
    word-spacing: 5px;
    padding-bottom: 15px;
    width: 60vw;
    text-align: justify;

    n {
      font-size: 1vw;
    }
  }
}
</style>
