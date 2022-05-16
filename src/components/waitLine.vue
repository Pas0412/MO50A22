<template>
  <div class="waitContainer">
    <div class="waitHeader">{{ "Nombre de personnes à attendre" + this.waitNb }}</div>
    <div class="waitCircle">
      <el-progress type="circle" :percentage="0" v-if="waitNb >= 0 && waitNb <= 10" :format="format"></el-progress>
      <el-progress type="circle" :percentage="25" v-if="waitNb > 10 && waitNb <= 20" :format="format"></el-progress>
      <el-progress type="circle" :percentage="100"  v-if="waitNb > 50" :format="format"></el-progress>
      <el-progress type="circle" :percentage="70" v-if="waitNb > 30 && waitNb <= 40" :format="format"></el-progress>
      <el-progress type="circle" :percentage="50"  v-if="waitNb > 20 && waitNb <= 30" :format="format" :width="150"></el-progress>
    </div>
  </div>
</template>

<script>
let cur = sessionStorage.getItem('curWebSocketData');


export default {
name: "waitLine",
  data() {
    return{
      waitNb: null,
    }
  },
  computed: {
    test() {
      if(cur != null) {
        this.format();
        return true;
      }
      return false;
    }
  },
  methods: {
    format(){
      if(cur != null){
        let obj = JSON.parse(cur);
        this.waitNb = obj.data.numberOfPeople;
        // console.log(obj.data.numberOfPeople);
      }
      return this.waitNb;
    }
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
.waitHeader {
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
}
.waitCircle {
  position: relative;
  text-align: center;
  width: 200px;
  font-weight: bold;
}
</style>