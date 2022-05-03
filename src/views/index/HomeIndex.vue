<template>
  <div class="header">
    <div class="logo">
      <img class="logo-image" alt="project logo" src="../../assets/logo.png">
      <div class="title">
        <div class="projName">GCUF</div>
        <div class="slogan">Un passage fluide et sans surprise pour un repas serein</div>
      </div>
    </div>
    <div class="header-right-container">
      <div class="about-us">About us</div>
      <div class="divider">|</div>
      <div class="admin">Admin login</div>
    </div>
  </div>
  <spliter class="spliter"></spliter>

  <div class="middle">
    <annonces></annonces>
  </div>

  <div class="scroll">
    <div v-for="item in tabList" :key="item">
      <div class="container">
        <img :src="item.imgurl" height="150" width="200">
        <div class="text-container">
          <span class="text-left">{{ item.name }}</span>
          <span class="text-right">{{ item.amount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Annonces from "@/components/annonces";
import Spliter from "@/components/spliter";

export default {
  name: "HomeIndex",
  mounted() {
    this.init();
  },
  methods:{
    /**
     * @description: do initialization
     * @author yuan.cao@utbm.fr
     * @date 2022-04-27 15:54:21
     */
    init(){
      this.getAllPlatsFromServer();
    },
    /**
    * @description: get all the data of plats from server
    * @author yuan.cao@utbm.fr
    * @date 2022-04-29 19:07:53
    */
    getAllPlatsFromServer(){
      this.$store.dispatch('GetAllPlats').then(res=>{
        // console.log(res);
        if(res&&res.data){//to make sure the correct arrival of data
          if(res.code==='suc'){
            res.data.forEach((plat)=>{
              this.tabList.push(plat)
            })
          }else{
            console.log('server response error');
          }
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  // eslint-disable-next-line vue/no-unused-components
  components: {Annonces, Spliter},
  data() {
    return {
      tabList: [
        // { id: "01", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        // { id: "02", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        // { id: "03", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        // { id: "04", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        // { id: "05", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        // { id: "06", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        // { id: "07", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        // { id: "08", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        // { id: "09", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        // { id: "10", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        // { id: "11", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        // { id: "12", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        // { id: "13", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        // { id: "06", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        // { id: "07", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        // { id: "08", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        // { id: "09", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        // { id: "10", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        // { id: "11", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        // { id: "12", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
        // { id: "13", name: 'fish', amount: "5", url: require('@/assets/fish.jpeg')},
      ]
    }
  }
}
</script>

<style scoped>
.header {
  margin: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}

.logo {
  left: 30px;
  top: 15px;
  height: 80px;
  width: 500px;
  display: flex;
  flex-direction: row;
}

.logo-image {
  height: 80px;
  width: 80px;
}

.title {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-bottom: 13px;
  padding-top: 5px;
  margin-left: 10px;
}

.projName {
  font-size: 30px;
}

.slogan {
  font-size: 8px;
  color: grey;
}

.header-right-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}

.divider {
  margin-left: 10px;
  margin-right: 10px;
  color: grey;
  font-weight: bold;
}

.spliter {
  height: 5px;
  margin-top: 10px;
}

.middle {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.scroll {
  display: flex;
  overflow-x: auto;
  margin-top: 20px;
  height: 400px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
}

.container {
  width: 220px;
}

.text-container {
  display: flex;
  width: 225px;
  justify-content: space-between;
}
</style>