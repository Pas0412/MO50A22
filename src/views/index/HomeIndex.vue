<template>
  <div class="header">
    <div class="main">
      <div class="logo">
        <img class="logo-image" alt="project logo" src="../../assets/logo.png">
        <div class="title">
          <div class="core-container">
            <span class="co">Co</span>
            <span class="re">Re</span>
          </div>
          <div class="cdr-container">
            <span class="co">Compagnon</span>
            <span class="de"> de </span>
            <span class="re">Repas</span>
          </div>
        </div>
      </div>
      <div class="slogan">Un passage fluide et sans surprise pour un repas serein</div>
    </div>
    <div class="header-right-container">
      <el-button class="header-button" @click="drawer = true" type="primary">About us</el-button>
      <div class="divider">|</div>
      <el-button class="header-button" @click="dialogFormVisible = true">Admin login</el-button>
    </div>
  </div>

  <el-drawer
      title="Gestion de la cantine"
      v-model="drawer"
      :direction="direction">
    <div class="drawer">
      <div class="equipe-title">L'équipe de MO50</div>
      <img src="../../assets/equipe.jpeg" class="equipe-img">
      <div class="equipe-info-title">MEMBER INFO</div>
      <div class="equipe-info">
        <el-descriptions
            class="member"
            :column="3"
            :size="size"
            border
            v-for="index in memberInfo" :key="index"
        >
          <el-descriptions-item width="130px">
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <user />
                </el-icon>
                Name
              </div>
            </template>
            {{ index.name }}
          </el-descriptions-item>
          <el-descriptions-item width="100px">
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <message />
                </el-icon>
                Email
              </div>
            </template>
            {{ index.email }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>

  </el-drawer>

  <el-dialog v-model="dialogFormVisible" title="Admin login" width="500px">
    <el-form :model="form" :rules="loginRules" ref="loginForm">
      <el-form-item prop="name" label="Username" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" placeholder="Please enter your username"/>
      </el-form-item>
      <el-form-item prop="password" label="Password" :label-width="formLabelWidth">
        <el-input type="password" v-model="form.password" autocomplete="off" placeholder="Please enter your password"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button  :disabled="!isFilled" type="primary" @click.prevent="login" :loading="loginLoading" >Log in</el-button>
      </span>
    </template>
  </el-dialog>

  <spliter class="grey"></spliter>
  <spliter class="yellow"></spliter>
  <spliter class="pink"></spliter>

  <div class="app-body">
    <div class="middle">
      <news></news>
      <div class="divide-block"></div>
      <div class="popular">
        <span class="demonstration">Les plats les plus populaires</span>
        <el-carousel height="230px" v-model="carousel">
          <el-carousel-item v-for="item in indexList.slice(0, 4)" :key="item">
            <img class="plats-popular" :src="item.imgurl" alt="popular">
          </el-carousel-item>
        </el-carousel>
      </div>
      <waitLine></waitLine>
    </div>

    <div class="scroll">
      <el-tabs v-model="indexTab" class="tabs" stretch>
        <el-tab-pane label="Lundi" name="first" class="tabs-item">
          <div v-for="item in aList" :key="item" >
            <div class="container">
              <img class="plats-img" :src="item.imgurl" height="200" width="250" alt="picture">
              <div class="plats-name">{{ item.name }}</div>
              <spliter class="plats-spliter"></spliter>
              <div class="text-container">
                <span class="text-left">Il en reste encore :</span>
                <span class="text-right">{{ item.amount }}</span>
              </div>
              <div class="note">Notez-nous!</div>
              <div class="note-component">
                <rate :home="item"></rate>
                <span class="note-text">{{ 'Total: ' + item.rate }}</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Mardi" name="second">
          <div v-for="item in bList" :key="item" >
            <div class="container">
              <img class="plats-img" :src="item.imgurl" height="200" width="250" alt="picture">
              <div class="plats-name">{{ item.name }}</div>
              <spliter class="plats-spliter"></spliter>
              <div class="text-container">
                <span class="text-left">Il en reste encore :</span>
                <span class="text-right">{{ item.amount }}</span>
              </div>
              <div class="note">Notez-nous!</div>
              <div class="note-component">
                <rate :home="item"></rate>
                <span class="note-text">{{ 'Total: ' + item.rate }}</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Mercredi" name="third">
          <div v-for="item in cList" :key="item" >
            <div class="container">
              <img class="plats-img" :src="item.imgurl" height="200" width="250" alt="picture">
              <div class="plats-name">{{ item.name }}</div>
              <spliter class="plats-spliter"></spliter>
              <div class="text-container">
                <span class="text-left">Il en reste encore :</span>
                <span class="text-right">{{ item.amount }}</span>
              </div>
              <div class="note">Notez-nous!</div>
              <div class="note-component">
                <rate :home="item"></rate>
                <span class="note-text">{{ 'Total: ' + item.rate }}</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Jeudi" name="fourth">
          <div v-for="item in dList" :key="item" >
            <div class="container">
              <img class="plats-img" :src="item.imgurl" height="200" width="250" alt="picture">
              <div class="plats-name">{{ item.name }}</div>
              <spliter class="plats-spliter"></spliter>
              <div class="text-container">
                <span class="text-left">Il en reste encore :</span>
                <span class="text-right">{{ item.amount }}</span>
              </div>
              <div class="note">Notez-nous!</div>
              <div class="note-component">
                <rate :home="item"></rate>
                <span class="note-text">{{ 'Total: ' + item.rate }}</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Vendredi" name="fifth">
          <div v-for="item in eList" :key="item" >
            <div class="container">
              <img class="plats-img" :src="item.imgurl" height="200" width="250" alt="picture">
              <div class="plats-name">{{ item.name }}</div>
              <spliter class="plats-spliter"></spliter>
              <div class="text-container">
                <span class="text-left">Il en reste encore :</span>
                <span class="text-right">{{ item.amount }}</span>
              </div>
              <div class="note">Notez-nous!</div>
              <div class="note-component">
                <rate :home="item"></rate>
                <span class="note-text">{{ 'Total: ' + item.rate }}</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="footer">©2022 CoRe</div>
  </div>
  <el-backtop :right="40" :bottom="100"/>
</template>

<script>
import Spliter from "@/components/spliter";
import News from "@/components/news";
import Rate from "@/components/rate";
import WaitLine from "@/components/waitLine";
import {ElMessageBox} from "element-plus";
import AdminPage from "./AdminPage";
import {httpOrHttps} from "@/utils/const/const";

function compare(p) {
  return function(m, n){
    var a = m[p];
    var b = n[p];
    return b - a;
  }
}

export default {
  name: "HomeIndex",
  // eslint-disable-next-line vue/no-unused-components
  components: {Spliter, News, Rate, WaitLine, AdminPage},
  data() {
    return {
      indexTab: "first",
      carousel: 0,
      tabList: [],  //all plats
      indexList: [], //for popular plats
      aList: [],
      bList: [],
      cList: [],
      dList: [],
      eList: [],
      memberInfo: [
        {name: 'Yonghui Huang', email: 'yong.huang@utbm.fr'},
        {name: 'Yuan Cao', email: 'yuan.cao@utbm.fr'},
        {name: 'Chenfan Xu', email: 'chenfan.xu@utbm.fr'},
        {name: 'Colin Losser', email: 'colin.losser@utbm.fr'},
      ],
      drawer: false,
      direction: 'rtl',
      //used for login, carry the username and password
      form: { name:'', password:'' },
      //the button remains loading when login
      loginLoading:false,
      formLabelWidth: '140px',
      dialogFormVisible: false,
      //rules for login : to make sure both username and password have values
      loginRules:{
        name:[//here the name must be the same as the object in model strictly
          {
            required:true,
            message:'Please input your name',
            trigger:'blur'
          }
        ],
        password: [
          {
            required:true,
            message:'Please input your password',
            trigger:'blur'
          }
        ]
      },
    }
  },
  created() {
    /**
     * Problems encountered when using ngrok, enter the domain name to automatically jump to the home page using https,
     * there will be problems accessing resources
     * @time 2022-03-02 21:08:57
     */
    let isHttps = 'https:' === document.location.protocol ? true: false;
    if (isHttps){
      window.location.replace(httpOrHttps+document.location.host);
    }
  },
  mounted() {
    this.init();
    this.getToday();
    this.doCacheForAboutUs();
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
  computed: {
    isFilled() {
      return !!this.form.name && this.form.password;
    }
  },
  methods:{
    /**
    * @description: preload the photo for about us, serve as a cache
    * @author yuan.cao@utbm.fr
    * @date 2022-05-22 22:45:53
    */
    doCacheForAboutUs(){
      let bgImg = new Image()
      bgImg.onerror = ()=>{
        console.log('preloading photo of Aboutus error')
      }
      bgImg.src = require('../../assets/equipe.jpeg')
    },
    /**
    * @description: login handler
    * @author yong.huang@utbm.fr yuan.cao@utbm.fr
    * @date 2022-05-12 17:53:58
    */
    getToday() {
      let wk = new Date().getDay();
      let weeks = ['first', 'first', 'second', 'third', 'fourth', 'fifth', 'first'];
      this.indexTab = weeks[wk];
    },
    loadData() {
      let cur = JSON.parse(sessionStorage.getItem('curWebSocketData'));
      this.indexList = this.tabList;
      this.indexList.sort(compare('rate'));
      if (cur&&cur != "connection succeeds"){
        if(cur.msg == "plat") {
          for(let i = 0; i < this.tabList.length-1;i++){
            if(JSON.stringify(this.tabList[i].id) == cur.data.pid){
              this.tabList[i].amount = cur.data.weightOrNumber;
            }
          }
        }
      }
    },
    login(){
      this.$refs.loginForm.validate(valid=>{
        if(valid){
          this.loginLoading=true;
          this.$store.dispatch('Login',this.form)
              .then(res=>{
                this.loginLoading=false;
                if(res){//make sure there is response anyway
                  if(res.code==='suc'){
                    //if login succeeds, save the token into Vuex
                    const loginVuexObj={
                      username:res.data.name,
                      id:res.data.id,
                      role:res.data.role,
                      lastIp:res.data.lastIp,
                      lastTime:res.data.lastTime,
                    };
                    this.$store.commit('set_token',{token:res.token,userId:res.userId,name:res.data.name})
                    this.$store.commit('set_userInfo',loginVuexObj)
                    //delete by ycao 20220514 create vue warn
                    // this.$router.push({
                    //   name: 'AdminPage',
                    //   params: {
                    //     userName: this.form.name
                    //   }
                    // })
                    this.$router.push({
                      path: '/AdminPage',
                    })
                  }else{
                    ElMessageBox.alert(res.msg+", please re-login","Attention!",{
                      confirmButtonText:'OK'
                    })
                    console.log('login fails');
                  }
                }else {
                  console.log('response is null');
                }
              })
              .catch((err)=>{
                console.log('login error: ' + err);
                this.loginLoading=false;
              })
          return true;
        }else{
          console.log('parameters are not all legal')
          return false;
        }
      })

    },
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
              this.tabList.push(plat);
              if(plat.day == 0){
                this.aList.push(plat);
              }else if(plat.day == 1){
                this.bList.push(plat);
              }else if(plat.day == 2){
                this.cList.push(plat);
              }else if(plat.day == 3){
                this.dList.push(plat);
              }else if(plat.day == 4){
                this.eList.push(plat);
              }
            })
          }else{
            console.log('server response error');
          }
        }
      }).catch(err=>{
        console.log(err)
      })
    },
  },
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

.core-container {
  display: flex;
  flex-direction: row;
  font-size: 40px;
  line-height: 35px;
  padding-top: 5px;
}

.co {
  color: #f0c78a;
}

.re {
  color: #f9a7a7;
}

.de {
  color: grey;
}

.cdr-container {
  font-size: 1px;
}

.slogan {
  padding-left: 8px;
  font-size: 8px;
  color: grey;
}

.header-right-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
}

.header-button {
  background-color: white;
  border-color: white;
  color: black;
  font-size: 18px;
}

.drawer {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.equipe-title {
  font-size: 28px;
  padding-bottom: 30px;
}

.equipe-img {
  height: 300px;
  width: 500px;
}

.equipe-info-title {
  font-size: 25px;
  padding-top: 30px;
}

.equipe-info {
  padding-top: 30px;
}

.divider {
  margin-left: 10px;
  margin-right: 10px;
  color: grey;
  font-weight: bold;
}

.grey {
  height: 5px;
  margin-top: 10px;
}

.yellow {
  background-color: #f0c78a;
  height: 3px;
}

.pink {
  background-color: #f9a7a7;
  height: 2px;
}

.app-body {
  background-color: ghostwhite;
  width: 100%;
  padding-top: 20px;
}

.middle {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 150px;
  margin-right: 150px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 2px 2px grey;
}

.divide-block {
  height: 300px;
  width: 10px;
  background-color: ghostwhite;
}

.popular {
  text-align: center;
  width: 1200px;
  margin-right: 50px;
  margin-left: 100px;
  margin-top: 10px;
  height: 250px;
}

.demonstration {
  color: var(--el-text-color-secondary);
  font-size: 20px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  text-align: center;
}

.plats-popular {
  height: 250px;
  width: 300px;
  opacity: 0.75;
}

.el-carousel__item {
  background-color: ghostwhite;
}


.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}

.tabs {
  width: 100%;
  padding-left: 50px;
  padding-right: 50px;
}

.tabs-item {
  width: 100%;
  display: flex;
  overflow-x: auto;
  flex-wrap: wrap;
}

.scroll {
  display: flex;
  background-color: white;
  overflow-x: auto;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  padding-top: 30px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px grey;
  margin: 20px 150px 50px;
}

.container {
  margin : 35px;
}

.plats-name {
  font-size: 15px;
}

.plats-spliter {
  background-color: #f9a7a7;
  margin-top: 5px;
  margin-bottom: 5px;
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

.note {
  font-size: 12px;
  color: grey;
}

.note-component {
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.note-text {
  font-size: 15px;
  color: orange;
}

.plats-img {
  border-radius: 15%;
}

.footer {
  height: 200px;
  width: 100%;
  background-color: #d3dce6;
  font-size: 15px;
  text-align: center;
  line-height: 200px;
}
</style>
