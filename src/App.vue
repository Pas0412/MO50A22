<template>
  <div class="header">
    <img class="logo" alt="projet logo" src="./assets/logo.png">
    <span class="title">slogan</span>
  </div>
<!--  <HelloWorld msg="Welcome to Gestion de la cantine"/>-->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

// export default {
//   name: 'App',
//   components: {
//     HelloWorld
//   }
// }
</script>

<style>
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*height: 20px;*/
  /*width: 20px;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}

.header {
  margin-left: 20px;
  margin-top: 20px;
  overflow: hidden;
}

.logo {
  height: 50px;
  width: 50px;
}

.title {
  text-align: center;
  position: absolute;
  left: 45%;
  font-size: 35px;
}
</style>
