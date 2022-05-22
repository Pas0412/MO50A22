<template>
  <div class="waitContainer">
    <div class="wait-header">{{ "Nombre de personnes"}}</div>
    <div class="wait-middle">{{ "à attendre : "}}</div>
    <div class="wait-footer" v-if="this.waitNb != null">{{ this.waitNb }}</div>
    <div class="wait-spliter"></div>
    <div class="waitCircle">
      <el-progress type="circle" :percentage="0" v-if="waitTime >= 0 && waitTime <= 10" :format="format"></el-progress>
      <el-progress type="circle" :percentage="25" v-if="waitTime > 10 && waitTime <= 20" :format="format"></el-progress>
      <el-progress type="circle" :percentage="100"  v-if="waitTime > 50" :format="format"></el-progress>
      <el-progress type="circle" :percentage="70" v-if="waitTime > 30 && waitTime <= 40" :format="format"></el-progress>
      <el-progress type="circle" :percentage="50"  v-if="waitTime > 20 && waitTime <= 30" :format="format" :width="150"></el-progress>
    </div>
  </div>
</template>

<script>

export default {
name: "waitLine",
  data() {
    return{
      waitNb: null,
      waitTime: null,
    }
  },
  mounted() {
    if(this.timer){
      clearInterval(this.timer)
    }else{
      this.timer=setInterval(()=>{
        this.loadData()
      },2000)
    }
  },
  unmounted(){
    clearInterval(this.timer)
  },
  methods: {
    loadData() {
      let cur = JSON.parse(sessionStorage.getItem('curWebSocketData'));
      if (cur&&cur != "connection succeeds"){
        if(cur.msg == "people") {
          // console.log(cur)
          this.waitNb = cur.data.numberOfPeople;
          this.waitTime = Math.round(cur.data.waitTime / 60);
        }
      }
    },
    format() {
      if (this.waitTime != null) {
        return this.waitTime + " min";
        }
      else{
        return "";
      }
    },
  }
}
</script>

<style scoped>
.waitContainer {
  display: flex;
  flex-direction: column;
  width: 300px;
  align-items: center;
  padding: 20px;
  border-left: ghostwhite;
  border-left-style: solid;
  border-left-width: 5px;
}

.wait-header {
  text-align: center;
  font-size: 15px;
  padding-top: 20px;
}

.wait-middle {
  text-align: center;
  font-size: 15px;
}

.wait-footer {
  text-align: center;
  font-size: 16px;
}

.waitCircle {
  position: relative;
  text-align: center;
  width: 200px;
  font-size: 20px;
  font-weight: bold;
}

.wait-spliter {
  height: 1px;
  width: 100px;
  background-color: grey;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
