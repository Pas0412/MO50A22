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
  </el-drawer>
  <el-dialog v-model="dialogFormVisible" title="Admin login" width="500px">
    <el-form :model="form">
      <el-form-item label="Username" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" placeholder="Please enter your username"/>
      </el-form-item>
      <el-form-item label="Password" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off" placeholder="Please enter your password"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button :disabled="!isFilled" type="primary" @click="login">Log in</el-button>
      </span>
    </template>
  </el-dialog>

  <spliter class="spliter"></spliter>
  <div class="app-body">
    <div class="middle">
      <news></news>
      <div class="popular">
        <span class="demonstration">Les plats les plus populaires</span>
        <el-carousel height="230px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small justify-center" text="2xl">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <waitLine></waitLine>
    </div>

    <div class="scroll">
      <div v-for="item in tabList" :key="item" >
        <div class="container" :home="this.item">
          <img class="plats-img" :src="item.imgurl" height="200" width="250" alt="picture">
          <div class="text-container">
            <span class="text-left">{{ item.name }}</span>
            <span class="text-right">{{ item.amount }}</span>
          </div>
          <rate></rate>
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
import AdminPage from "./adminPage";

export default {
  name: "HomeIndex",
  // eslint-disable-next-line vue/no-unused-components
  components: {Spliter, News, Rate, WaitLine, AdminPage},
  data() {
    return {
      tabList: [],
      drawer: false,
      direction: 'rtl',
      form: { name:'', password:'' },
      formLabelWidth: '140px',
      dialogFormVisible: false
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
    rating(){
      console.log(this.tabListitem.name);

    },
    login(){
      this.$router.push({
        name: 'adminPage',
        params: {
          userName: this.form.name,
          passWord: this.form.password
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
      })
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

.spliter {
  height: 5px;
  margin-top: 10px;
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

.popular {
  text-align: center;
  width: 1200px;
  margin-right: 50px;
  margin-left: 50px;
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

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
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

.text-container {
  display: flex;
  width: 250px;
  justify-content: space-between;
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