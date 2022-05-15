<template>
  <el-dialog
      v-model="closeFlag"
      title="Plat Editor"
      width="30%"
      :before-close="emitClose"
  >
    <el-form :model="editPlatForm" :rules="platRules" ref="editPlatForm">
      <div class="plat-img">
        <img :src="editPlatForm.imgurl">
      </div>
      <el-form-item prop="day" label="day">
        <el-select v-model="editPlatForm.day" placeholder="Select" style="width: 129px">
          <el-option label="0 Monday" value="0" />
          <el-option label="1 Tuesday" value="1" />
          <el-option label="2 Wednesday" value="2" />
          <el-option label="3 Thursday" value="3" />
          <el-option label="4 Friday" value="4" />
        </el-select>
      </el-form-item>
      <el-form-item prop="type" label="type">
        <el-select v-model="editPlatForm.type" placeholder="Select" style="width: 125px">
          <el-option label="0 Entrée" value="0" />
          <el-option label="1 Plat" value="1" />
          <el-option label="2 Dessert" value="2" />
          <el-option label="3 Garnitures" value="3" />
          <el-option label="4 Autres" value="4" />
        </el-select>
      </el-form-item>
      <el-form-item prop="name" label="name">
        <el-input v-model="editPlatForm.name" autocomplete="off" placeholder="Please enter the name"/>
      </el-form-item>
      <el-form-item prop="content" label="content">
        <el-input type="content" v-model="editPlatForm.content" autocomplete="off" placeholder="Please enter the description"/>
      </el-form-item>
      <el-form-item prop="imgurl" label="imgurl">
        <el-input type="imgurl" v-model="editPlatForm.imgurl" autocomplete="off" placeholder="Please enter the url of image"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emitClose">Cancel</el-button>
        <el-button type="primary" @click="commitPlat"
        >Commit Change</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {ElMessageBox} from "element-plus";

export default {
  name: "PlatEditor",
  data(){
    return {
      closeFlag:false,
      editPlatForm:{},
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
  props:{
    curSelectedObj:{
      type:Object,
      default() {
        return {};
      }
    },
    dialogShowFlag:{
      type:Boolean,
      default(){
        return false
      }
    }
  },
  computed:{
  },
  methods:{
    /**
     * @description: son to father: son closed and changes flag, tell father to change flag
     * @author yuan.cao@utbm.fr
     * @date 2022-05-15 20:53:00
     */
    emitClose(){
      this.closeFlag = false;
      this.$emit("changeCloseFlag",this.closeFlag)
    },
    commitPlat() {
      this.$refs.editPlatForm.validate(validate=>{
        if (validate){
          this.emitClose();
          this.$store.dispatch('UpdatePlat', this.editPlatForm).then(res => {
            if (res&&res.code === 'suc') {
              ElMessageBox.alert("Updating one plat succeeds",{
                confirmButtonText:'OK',
                callback:()=>{
                  this.$emit("refreshList");//refresh data after updating
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
    }
  },
  watch:{
    dialogShowFlag(news){
      this.closeFlag = news
    },
    curSelectedObj(news){
      this.editPlatForm=news
    }
  }
}
</script>

<style scoped>
/*photo in the middle
https://blog.csdn.net/weixin_42150719/article/details/114300693
*/
.plat-img {
  margin-bottom: 30px;
  width: 100%;
  height: 200px;
}

.plat-img img {
  height: 200px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}

</style>