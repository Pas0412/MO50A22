<template>
    <div class="option-select">
      <el-select v-model="selectDay" placeholder="Select the day">
        <el-option
            v-for="item in options"
            :key="item.showValue"
            :value="item.showValue"
        />
      </el-select>
      &nbsp;&nbsp;<span class="refresh-icon"><el-icon @click="getAllPlatsFromServer"><Refresh /></el-icon></span>
    </div>
    <div class="scroll">
      <div v-for="item in tabList.filter(
        (data) =>
          !selectDay || data.day===transferDay(selectDay)
      )" :key="item" >
        <div class="container">
          <img class="plats-img" :src="item.imgurl" height="200" width="250" alt="picture">
          <div class="plats-name">{{ item.name }}</div>
          <div class="text-container">
            <span class="text-left">Il en reste encore :</span>
            <span class="text-right">{{ item.amount }}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "PlatGeneralInfo",
  data() {
    return {
      tabList: [],
      selectDay:'',
      options: [
        {
          showValue: 'Monday',
        },
        {
          showValue: 'Tuesday',
        },
        {
          showValue: 'Wednesday',
        },
        {
          showValue: 'Thursday',
        },
        {
          showValue: 'Friday',
        },
        {
          showValue: 'All',
        },
      ]
    }
  },
  methods:{
    init(){
      this.getAllPlatsFromServer()
    },
    getAllPlatsFromServer(){
      this.tabList=[];
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
    },
    transferDay(strDay){
      switch (strDay) {
        case "Monday":
          return 0;
        case "Tuesday":
          return 1;
        case "Wednesday":
          return 2;
        case "Thursday":
          return 3;
        case "Friday":
          return 4;
        default:
          this.selectDay=''
          return '';
      }
    }
  },
  computed:{


  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>
.plat-container{
  height: 600px;
  overflow: scroll;
}
.option-select{
  margin-top: 15px;
  margin-left: 15px;
}
.scroll {
  margin-top: 10px;
  height: calc(100% - 109px);
  overflow: scroll;
  display: flex;
  background-color: white;
  overflow-x: auto;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  border-radius: 10px;
  box-shadow: 2px 2px 2px grey;
}

.container {
  margin : 15px;
}

.plats-name {
  font-size: 15px;
}

.text-container {
  display: flex;
  width: 250px;
  justify-content: space-between;
  text-align: center;
  align-items: center;
}

.text-left {
  font-size: 12px;
  color: grey;
}

.plats-img {
  border-radius: 15%;
}
.refresh-icon{
  position: relative;
  top: 3px;
  cursor: pointer;
}
</style>