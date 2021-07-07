<template>
  <section class="home">
    <div class="main">
      <h1 class="title">NETFLIX</h1>
      <p class="subtitle">Proyecto Base de Datos | Fase II</p>
    </div>
    <div class="background"></div>
  </section>
</template>

<script>

</script>

<style lang="scss" scoped>
.home {
  margin: 0 auto;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  background-color: rgba(#202020, .75);
  
  .background {
    position: absolute;
    height: 100%;
    width: 100vw;
    background-image: url("../assets/background.jpg");
    background-size: cover;
    opacity: .75;
    z-index: -1;
    
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      sans-serif;
    display: block;
    font-weight: 500;
    font-size: 100px;
    color: #b82020;
    letter-spacing: 1px;
    
  }

  .subtitle {
    font-weight: 500;
    font-size: 42px;
    color: whitesmoke;
    word-spacing: 5px;
    padding-bottom: 15px;
  }
}

</style>
