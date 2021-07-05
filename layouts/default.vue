<template>
  <div>
    <Header />
    <Nuxt id="container"/>
  </div>
</template>
<script>

</script>
<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  overflow: hidden;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
#container{
  position: absolute;
  top: 7vh;
  left: 0;
  width: 100vw;
  height: 93vh;

}
hr{
  margin: 4vh 0;
}
</style>
