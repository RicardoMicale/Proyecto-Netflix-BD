<template>
  <nav>
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/sql">Reportes</NuxtLink>
    <ul>
      <li></li>
      <li><NuxtLink to="/actor">Actores</NuxtLink></li>
      <li><NuxtLink to="/contenido">Contenidos</NuxtLink></li>
      <li><NuxtLink to="/usuario">Usuarios</NuxtLink></li>
      <li><NuxtLink to="/pais">Paises</NuxtLink></li>
      <li><NuxtLink to="/relaciones">Relaciones</NuxtLink></li>
    </ul>
  </nav>
</template>
<style lang="scss">
nav {
  position: fixed;
  height: 7vh;
  width: 100vw;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4vw;
  border-bottom: .15em solid #b82020;
  z-index: 99;

  a {
    text-decoration: none;
    color: #202020;
    &:hover{
        color:#b82020;
    }
  }

  ul {
    list-style: none;
    display: flex;
    justify-content: center;

    li {
      margin: 0 2vw;
      
    }
  }
}
</style>