<template>
  <div id="app">
    <!--  cache component instances  -->
    <router-view v-slot="{ Component }">
      <keep-alive :include="[]">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <!-- cache component instances -->
  </div>
<!--  <HelloWorld msg="Welcome to Gestion de la cantine"/>-->
</template>

<script>
import {openSocket} from '@/assets/js/websocket';
import {cantineID} from "@/utils/const/const";


export default {
  name:"App",
  mounted() {
    this.init();
  },
  methods: {
    /**
    * @description: do initialization
    * @author yuan.cao@utbm.fr
    * @date 2022-04-29 19:05:43
    */
    init(){
      openSocket(cantineID);
    },


  }

}
</script>

<style>
/*container full screen*/
html,body,#app{
  /*margin: 0;*/
  /*padding: 0;*/
  /*height:100%;*/
}


</style>
