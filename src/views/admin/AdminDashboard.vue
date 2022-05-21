<template>
    <div id="admin-main-page">
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img :src="getPhotoForHomeIndex" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{ name }}</div>
                            <div @click="changeDate">{{ role }}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        Last login time: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>{{getLastLoginTime}}</span>
                    </div>
                    <div class="user-info-list">
                        Last login IP address
                        <span>{{getLastLoginIP}}</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <template #header>
                        <div class="clearfix">
                            <span>Change Password</span>
                        </div>
                    </template>
                  <div class="update-pwd">
                    <div class="old-pwd">
                      <el-input
                          v-model="myPwdObj.oldPassword"
                          type="password"
                          placeholder="Input the old password"
                          show-password
                      />
                    </div>
                    <div class="new-pwd">
                      <el-input
                          v-model="myPwdObj.newPassword"
                          type="password"
                          placeholder="Input the new password"
                          show-password
                      />
                    </div>
                    <div class="update-pwd-btn">
                      <el-button color="rgb(24, 134, 250)" :disabled="!isFilled" @click="updatePwd">Update your password</el-button>
                    </div>
                  </div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-user-solid grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{waitNb}}</div>
                                    <div>Current number of people</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-message-solid grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{waitTime}} min</div>
                                    <div>Current estimated wait time</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="always" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-3">
                                <div class="grid-cont-right">
                                  <div class="grid-num">{{canteenInfo.name}}</div>
                                    <div>{{canteenInfo.location}}</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="mgb20">
                  <el-col :span="12">
                    <el-card shadow="hover" style="height: 404px;">
                      <schart ref="line" class="schart" canvasId="line" :options="options"></schart>
                    </el-card>
                  </el-col>
                  <el-col :span="12">
                    <el-card shadow="hover" style="height: 404px">
                      <template #header>
                        <div class="card-header">
                          <span style="font-weight: bolder">The least amount of dishes</span>
                          <el-button class="button" @click="$router.push('/AdminPage/platGeneralInfo');" text>Go to detail</el-button>
                          <span class="refresh-icon"><el-icon @click="getLeastPlatsFromServer"><Refresh /></el-icon></span>
                        </div>
                      </template>
                      <el-table :data="tabList">
                        <el-table-column prop="name" label="Name" width="215" />
                        <el-table-column prop="amount" label="The remaining amount" />
                      </el-table>
                    </el-card>
                  </el-col>
              </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from "vue-schart";
import {adminRoleId, cantineID, intervalUpdateDataAdminIndexDev, maxNumForChart} from "@/utils/const/const";
import {ElMessageBox} from "element-plus";
import {random} from "@/utils/CommonUtils";
export default {
    name: "AdminDashboard",
  mounted() {
      this.init()
  },
  unmounted(){
    clearInterval(this.timerChart)
  },
  data() {
        return {
          historyTimeArr:[],
          historyInArr:[],
          historyOutArr:[],
          curIndex:0,
          takeConst:1,//if {curIndex} pass this value, should reform the chart
          waitNb:0,
          waitTime:0,
          timerChart:null,
          name: this.$store.getters.username,
          tabList: [],
          myPwdObj:{
            id:this.$store.getters.userId,
            name:this.$store.getters.name,
            oldPassword:'',
            newPassword:''
          },
          canteenInfo:{
            id:cantineID,
            name:'',
            location:'',
          },
          options: {
            type: "line",
            title: {
              text: "Canteen Flow Chart"
            },
            labels: [],
            datasets: [
              {
                label: "IN",
                data: []
              },
              {
                label: "OUT",
                data: []
              }
            ]
          }
        };
    },
    components: {
        Schart
    },
    computed: {
        role() {
            return this.getRole() === 0 ? "Director" : "Staff";
        },
        getPhotoForHomeIndex(){
          return this.getRole()===adminRoleId
              ?require("@/assets/img/director.png")
              :require("@/assets/img/staff.png")
        },
      getLastLoginIP(){
          return this.$store.getters.lastIp===null
              ?''
              :this.$store.getters.lastIp
      },
      getLastLoginTime(){
        return this.$store.getters.lastTime===null
            ?''
            :this.$store.getters.lastTime
      },
      isFilled() {
        return this.myPwdObj.oldPassword && this.myPwdObj.newPassword;
      },
    },

    methods: {
      init(){
        this.getLeastPlatsFromServer()
        this.getCanteenInfoFromServer()
        this.openTimerForUpdateChart()
        this.getHistoryDataForChart()
      },
      /**
      * @description: curIndex continue to grow, which means for example 98 = 10*9+8 ,
       * 8 is the maximum of the curIndex, when it comes to it, the interval should be changed,
       * so comes into doGiveDataForChart()
      * @author yuan.cao@utbm.fr
      * @date 2022-05-21 22:38:49
      */
      updateChartFromSessionSto(){
        let cur = JSON.parse(sessionStorage.getItem('curWebSocketData'))
        if (cur&&cur != "connection succeeds"&&cur.msg==='people'){
          this.curIndex+=1;
          this.historyTimeArr.push(this.getFormatTime())
          this.historyInArr.push(cur.data.totalIn)
          this.historyOutArr.push(cur.data.totalOut)
          //when server first starts, the length of array is so small that grows like 0,1,2,
          //the data in it should also be shown on the chart
          if(this.historyInArr.length<=maxNumForChart||this.curIndex>=this.takeConst){
            this.doGiveDataForChart()
          }
          this.waitNb = cur.data.numberOfPeople;
          this.waitTime = Math.round(cur.data.waitTime/60);
        }
      },
      /**
      * @description: to avoid each time open browser the chart starts from 0, we get the history data from server,
       * the maximum data of chart is {maxNumForChart} so delete one if pass the limit
      * @author yuan.cao@utbm.fr
      * @date 2022-05-21 20:10:31
      */
      getHistoryDataForChart(){
        this.$store.dispatch('GetNumHistory').then(res => {
          if (res && res.data) {//to make sure the correct arrival of data
            if (res.code === 'suc') {
              if(res.data[0]&&res.data[1]){//when server starts first time, there is no data
                res.data[0].forEach(e=>{
                  let time = Object.keys(e)[0];
                  let inNum = Object.values(e)[0];
                  this.historyTimeArr.push(time)
                  this.historyInArr.push(inNum)
                });
                res.data[1]&&res.data[1].forEach(e=>{
                  let outNum = Object.values(e)[0];
                  this.historyOutArr.push(outNum)
                });
                this.doGiveDataForChart()
              }
            } else {
              console.log('server response error');
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      /**
      * @description: give the data to the chart, make sure the interval between x is acceptable = {takeConst}
      * @author yuan.cao@utbm.fr
      * @date 2022-05-21 20:48:39
      */
      doGiveDataForChart(){
        const tmpTimeArr=this.historyTimeArr;
        const tmpInArr=this.historyInArr;
        const tmpOutArr=this.historyOutArr;
        if(tmpTimeArr.length!==tmpInArr.length||tmpTimeArr.length===0) {
          console.log("never return after initialisation");
          return;
        }

        /**
         * for example
         * array[98] 98/8=12...2       0 12 24 36 48 60 72 84 96(no) => 9-1 values
         * @type {number}
         */
        const curInterval = Math.floor(tmpInArr.length/maxNumForChart)
        this.takeConst =  curInterval===0
            ?1
            :curInterval;//include 0
        this.curIndex = tmpInArr.length%maxNumForChart;

        let newIndex = 0;
        const newTimeArr = [];
        const newInArr = [];
        const newOutArr = [];
        if(this.takeConst===0) return;//avoid infinite loop
        /**
         * loop array[98]: until 96
         */
        const upper = maxNumForChart*this.takeConst<tmpTimeArr.length
            ?maxNumForChart*this.takeConst:tmpTimeArr.length;//server start
        while(newIndex<upper){
          newTimeArr.push(tmpTimeArr[newIndex])
          newInArr.push(tmpInArr[newIndex])
          newOutArr.push(tmpOutArr[newIndex])
          newIndex+=this.takeConst;
        }
        this.options.labels=newTimeArr;
        this.options.datasets[0].data=newInArr;
        this.options.datasets[1].data=newOutArr;
      },
      openTimerForUpdateChart(){
        if(this.timerChart){
          clearInterval(this.timerChart)
        }else{
          this.timerChart=setInterval(()=>{
            this.updateChartFromSessionSto();
          },intervalUpdateDataAdminIndexDev)
        }
      },
      getLeastPlatsFromServer(){
        this.$store.dispatch('GetLeastPlats').then(res=>{
          // console.log(res);
          if(res&&res.data){//to make sure the correct arrival of data
            if(res.code==='suc'){
              this.tabList=[];
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
      getCanteenInfoFromServer() {
        this.$store.dispatch('GetCanteenInfo').then(res=>{
          if(res&&res.data){//to make sure the correct arrival of data
            if(res.code==='suc'){
              this.canteenInfo = res.data
            }else{
              console.log('server response error');
            }
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      getRole(){
        const type = typeof (this.$store.getters.role)
        if(type==="number"){
          return this.$store.getters.role
        }else{
          //parse proxy
          const roleObj = JSON.parse(JSON.stringify(this.$store.getters.role))
          return roleObj.role
        }
      },
      changeDate() {
        const now = new Date().getTime();
        this.data.forEach((item, index) => {
          const date = new Date(now - (6 - index) * 86400000);
          item.name = `${date.getFullYear()}/${date.getMonth() +
          1}/${date.getDate()}`;
        });
      },
      updatePwd(){
        this.$store.dispatch('UpdatePwd', this.myPwdObj).then(res => {
          if(res){
            if (res.code === 'suc') {
              ElMessageBox.alert("Updating the password succeeds",{
                confirmButtonText:'OK',
                callback:()=>{
                }
              })
            } else {
              ElMessageBox.alert("Updating the password fails: "+res.msg,{
                confirmButtonText:'OK',
                callback:()=>{
                }
              })
            }
          }else{
            console.log('server response error');
          }
        }).catch(err => {
          console.log(err)
        })
      },
      /**
      * @description: used for update in real time  the number of people in the chart
      * @author yuan.cao@utbm.fr
      * @date 2022-05-20 22:51:20
      */
      // updateNumUp() {
      //   let cur = JSON.parse(sessionStorage.getItem('curWebSocketData'));
      //   if (cur&&cur != "connection succeeds"&&cur.msg==='people'){
      //     this.waitNb = cur.data.numberOfPeople;
      //     this.waitTime = Math.round(cur.data.waitTime/60);
      //   }
      // },
      /**
      * @description: get current time : HH:mm
      * @author yuan.cao@utbm.fr
      * @date 2022-05-20 23:35:20
      */
      getFormatTime(){
        const myDate = new Date();
        const h = myDate.getHours();  //hour (0-23)
        const m = myDate.getMinutes();  //minute (0-59)
        return h+':'+m;
      },
      /**
      * @description: listener the length of the data array of the chart: it should not pass {maxNum} parameters
       * should be used before each time push the data into array
      * @author yuan.cao@utbm.fr
      * @date 2022-05-21 01:23:23
      */
      checkLengthChartDataArr(){
        if(this.options.labels.length>maxNumForChart
            ||this.options.datasets[0].data>maxNumForChart
            ||this.options.datasets[1].data>maxNumForChart) {
          const outNum = random(1,maxNumForChart);
          this.options.labels.splice(outNum, 1)
          this.options.datasets[0].data.splice(outNum, 1)
          this.options.datasets[1].data.splice(outNum, 1)
        }

      }
    },
};
</script>

<style scoped>
#admin-main-page{
  margin-top: 15px;
  height: calc(100% - 52px);
  width: 95%;
  overflow-y: scroll;
  overflow-x: hidden;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.old-pwd,.new-pwd,.update-pwd-btn{
  margin: 15px 0;
}
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    margin: 0 15px;
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
.refresh-icon{
  cursor: pointer;
}
</style>
