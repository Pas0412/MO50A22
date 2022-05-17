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

  <!--for test proposal, delete me !!!  -->
  <h4 v-if="isCurChanged">{{curWebSocketData}}</h4>

</template>

<script>
import {cantineID, refreshMenuInterval} from "@/utils/const/const";
import {openSocket, sendThisOut} from "@/assets/js/websocket";

export default {
  name:"App",
  mounted() {
    this.init();
  },
  data() {
    return {
      socketCon:null,
      curWebSocketData:null,
      //test proposal
      // lastData:
      stateMonitor:null,
    }
  },
  computed: {
    isCurChanged(){
      if(this.curWebSocketData != "connection succeeds"){
        sessionStorage.setItem('curWebSocketData', JSON.stringify(JSON.parse(this.curWebSocketData)));
      }
      return false;
    }
  },
  methods: {
    /**
    * @description: do initialization
    * @author yuan.cao@utbm.fr
    * @date 2022-04-29 19:05:43
    */
    init(){
      //to bind the vue instance
      sendThisOut(this)
      this.openSocketConnection()
      this.activeOnWatchState();
      window.addEventListener('unload',this.saveStateToken)
      window.addEventListener('load',this.clearStateToken)
      this.saveCurWebSocket();
      window.addEventListener('unload',this.saveState)
      window.addEventListener('load',this.clearState)

    },
    openSocketConnection(){
      openSocket(cantineID);
    },
    /**
    * @description: monitor : every ? seconds we execute...
    * @author yuan.cao@utbm.fr
    * @date 2022-05-01 19:03:06
    */
    activeOnWatchState(){
      this.stateMonitor = setInterval(function (){
        this.changeState();
      }.bind(this),refreshMenuInterval)
    },
    /**
     * @description: core code : what to execute after receiving new data from server using WebSocket
     * @author yuan.cao@utbm.fr
     * @date 2022-05-01 18:51:20
     */
    changeState(){
      //do...
      //write your code here
      this.curWebSocketData
    },
    /**
    * @description: to make sure each time refreshed, the data in the vuex does not disappear
    * @author yuan.cao@utbm.fr
    * @date 2022-05-13 00:52:20
    */
    saveState(){
      sessionStorage.setItem('stateToken',JSON.stringify(this.$store.state.token))
      sessionStorage.setItem('stateAdmin',JSON.stringify(this.$store.state.admin))
    },
    clearState(){
      sessionStorage.removeItem('stateToken')
      sessionStorage.removeItem('stateAdmin')
    },
    /**
     * @description: save curWebSocketData to vuex
     * @author yong.huang@ubtm.fr
     * @date 2022-05-14 22:30:00
     */
    saveCurWebSocket(){
      sessionStorage.setItem('curWebSocketData', this.curWebSocketData);
    }
  }

}
</script>

<style>
/*container full screen*/
html,body,#app{
  margin: 0;
  padding: 0;
  height: 100%;
}


</style>
