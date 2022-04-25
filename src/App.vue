<template>
  <div class="header">
    <img class="logo" alt="projet logo" src="./assets/logo.png">
    <span class="title">Un passage fluide et sans surprise pour un repas serein</span>
  </div>
  <spliter class="spliter"></spliter>
  <div class="scroll">
    <div v-for="item in tabList" :key="item">
      <div class="container">
        <img :src="item.url" height="150" width="200">
<!--        <img src="./assets/fish.jpeg">-->
        <div class="text-container">
          <span class="text-left">{{ item.name }}</span>
          <span class="text-right">{{ item.amount }}</span>
        </div>
      </div>
    </div>
  </div>
<!--  <HelloWorld msg="Welcome to Gestion de la cantine"/>-->
</template>

<script>
import Spliter from "@/components/spliter";


export default {
  // eslint-disable-next-line vue/no-unused-components
  components: {Spliter},
  data() {
    return {
      tabList: [
        { id: "01", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        { id: "02", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        { id: "03", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        { id: "04", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        { id: "05", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        { id: "06", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        { id: "07", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        { id: "08", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        { id: "09", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        { id: "10", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        { id: "11", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        { id: "12", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        { id: "13", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        { id: "06", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        { id: "07", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        { id: "08", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        { id: "09", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        { id: "10", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        { id: "11", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        { id: "12", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        { id: "13", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
      ]
    }
  }
}
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
  display: block;
  text-align: center;
}

.logo {
  position: absolute;
  left: 30px;
  top: 15px;
  height: 50px;
  width: 50px;
}

.title {
  font-size: 28px;
}

.spliter {
  height: 20px;
  margin-top: 10px;
}

.scroll {
  display: flex;
  overflow-x: auto;
  margin-top: 20px;
  height: 400px;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
}

.container {
  width: 220px;
}

.text-container {
  display: flex;
  width: 200px;
  justify-content: space-between;
}
</style>
