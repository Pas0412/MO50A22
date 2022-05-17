<template>
  <div id="add-plat">
    <div class="form">
      <el-form :model="addPlatForm" :rules="platRules" label-position="top" ref="addPlatForm">
        <el-form-item prop="day" label="day">
          <el-select v-model="addPlatForm.day" placeholder="Select" style="width: 129px">
            <el-option label="0 Monday" value="0" />
            <el-option label="1 Tuesday" value="1" />
            <el-option label="2 Wednesday" value="2" />
            <el-option label="3 Thursday" value="3" />
            <el-option label="4 Friday" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item prop="type" label="type">
          <el-select v-model="addPlatForm.type" placeholder="Select" style="width: 125px">
            <el-option label="0 Entrée" value="0" />
            <el-option label="1 Plat" value="1" />
            <el-option label="2 Dessert" value="2" />
            <el-option label="3 Garnitures" value="3" />
            <el-option label="4 Autres" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="name">
          <el-input v-model="addPlatForm.name" autocomplete="off" placeholder="Please enter the name"/>
        </el-form-item>
        <el-form-item prop="content" label="content">
          <el-input type="content" v-model="addPlatForm.content" autocomplete="off" placeholder="Please enter the description"/>
        </el-form-item>
        <el-form-item prop="imgurl" label="imgurl">
          <el-input type="imgurl" v-model="addPlatForm.imgurl" autocomplete="off" placeholder="Please enter the url of image"/>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="addPlat">Add It!</el-button>
    </div>
    <div class="upload">
      <div class="plat-img">
        <img :src="addPlatForm.imgurl">
      </div>
      <upload-file @uploadSuc="showImgUrl"></upload-file>
    </div>
  </div>
</template>

<script>

import UploadFile from "@/components/admin/plat/UploadFile";
import {ElMessageBox} from "element-plus";
import {cantineID} from "@/utils/const/const";

export default {
  name: "PlatChange",
  data(){
    return {
      addPlatForm:{},
      //rules for submit plat data
      platRules:{
        name:[//here the name must be the same as the object in model strictly
          {
            required:true,
            message:'Please input your name',
            trigger:'blur'
          }
        ],
        day: [
          {
            required:true,
            message:'Please input the serving day',
            trigger:'blur'
          }
        ],
        imgurl: [
          {
            required:true,
            message:'Please input the photo',
            trigger:'blur'
          }
        ],
        type: [
          {
            required:true,
            message:'Please input the type',
            trigger:'blur'
          }
        ]
      },
    }
  },
  methods:{
    addPlat(){
      this.$refs.addPlatForm.validate(validate=>{
        if (validate){
          this.addPlatForm.cid = parseInt(cantineID)
          this.$store.dispatch('AddPlat', this.addPlatForm).then(res => {
            if (res&&res.code === 'suc') {
              ElMessageBox.alert("Adding one plat succeeds",{
                confirmButtonText:'OK',
                callback:()=>{
                }
              })
            } else {
              console.log('server response error');
            }
          }).catch(err => {
            console.log(err)
          })


          return true;
        }else{
          return false;
        }
      })
    },
    showImgUrl(urlArr){
      console.log(urlArr);
      if(urlArr.length===1){
        this.addPlatForm.imgurl=urlArr[0];
      }else{
        this.addPlatForm.imgurl=urlArr;
      }
    }
  },
  components:{
    UploadFile
  }
}
</script>

<style scoped>
#add-plat{
  width: 800px;
  margin: 15px 0 0 20px;
  display: flex;
}
.form,.upload{
  flex: 1;
}
.upload{
  margin-left: 20px;
}
.plat-img img {
  margin-bottom: 5px;
  height: 200px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}
</style>