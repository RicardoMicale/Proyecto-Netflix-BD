<template>
  <div>
    <Header />
    <Nuxt id="container"/>
  </div>
</template>
<script>

</script>
<style lang="scss">
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
h3{
  position: relative;
  top: 2vh;
}
form{
  margin-top: 2vh;
  display: block;
  padding: 4vh;
   
  select{ 
   -webkit-appearance: none;
   -moz-appearance:    none;
   appearance:         none;   
   -webkit-border-radius: 0;  /* Safari 3-4, iOS 1-3.2, Android 1.6- */    
   -moz-border-radius: 0;  /* Firefox 1-3.6 */     
   border-radius: 0;  /* Opera 10.5, IE 9, Safari 5, Chrome, Firefox 4, iOS 4, Android 2.1+ */
}
  input, select, button{
    border: 3px solid #b82020;
    border-radius: 25px;
    background-color: rgba(grey, .15);
    padding: 1em 2em;
    margin: 2vh 0;

    &:focus{
      outline: none;
    }
  }
  button{
    background-color: #b82020;
    color: whitesmoke;
    cursor: pointer;
  }
}
hr{
  border: 1px solid #b82020;
}
</style>
