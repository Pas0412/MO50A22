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
      <el-button class="header-button" @click="drawer = true" type="primary">About us</el-button>
      <div class="divider">|</div>
      <el-button class="header-button" @click="dialogFormVisible = true">Admin login</el-button>
    </div>
  </div>

  <el-drawer
      title="Gestion de la cantine"
      v-model="drawer"
      :direction="direction">
    <span>L'équipe de MO50</span>
    <div>Yonghui Yuan Chenfan Colin</div>
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
          <el-carousel-item v-for="item in tabList.slice(0, 4)" :key="item">
            <img class="plats-popular" :src="item.imgurl" alt="popular">
          </el-carousel-item>
        </el-carousel>
      </div>
      <waitLine></waitLine>
    </div>

    <div class="scroll">
      <div v-for="item in tabList" :key="item" >
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
    </div>
    <div class="footer"></div>
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
      carousel: 0,
      tabList: [],
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
  mounted() {
    this.init();
  },
  computed: {
    isFilled() {
      return !!this.form.name && this.form.password;
    }
  },
  methods:{
    /**
    * @description: login handler
    * @author yong.huang@utbm.fr yuan.cao@utbm.fr
    * @date 2022-05-12 17:53:58
    */
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
              this.tabList.push(plat)
            })
          }else{
            console.log('server response error');
          }
        }
      }).catch(err=>{
        console.log(err)
      }),
      this.tabList.sort(compare("rate"));
    }
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
  align-items: center;
}

.header-button {
  background-color: white;
  border-color: white;
  color: black;
  font-size: 18px;
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
  background-color: black;
}
</style>