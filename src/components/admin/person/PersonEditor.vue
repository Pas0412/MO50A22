<template>
  <el-dialog
      v-model="closeFlag"
      title="User Editor"
      width="30%"
      :before-close="emitClose"
  >
    <div id="news-editor">
      <div class="input-submit">
        <el-input
            v-model="editUserForm.name"
            :rows="10"
            placeholder="Please input the name"
        />
        <el-radio v-model="editUserForm.role" label="0" size="large">0: Director</el-radio>
        <el-radio v-model="editUserForm.role" label="1" size="large">1: Staff</el-radio>
        <div class="commit-person-btn">
           <el-button :disabled="!isFilled" type="primary" @click="commitUser"
           >Commit Change</el-button
           >
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {ElMessageBox} from "element-plus";

export default {
  name: "PersonEditor",
  data(){
    return {
      closeFlag:false,
      editUserForm:{},
    }
  },
  methods:{
    emitClose(){
      this.closeFlag = false;
      this.$emit("changeCloseFlag",this.closeFlag)
    },
    commitUser(){
      this.$store.dispatch('UpdateUser', this.editUserForm).then(res => {
        if(res){
          if (res.code === 'suc') {
            ElMessageBox.alert("Updating the user succeeds",{
              confirmButtonText:'OK',
              callback:()=>{
                this.emitClose();
                this.$emit("refreshList");//refresh data after updating
              }
            })
          } else {
            ElMessageBox.alert("Updating the user fails: "+res.msg,{
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
    isFilled() {
      return this.editUserForm.name && this.editUserForm.role;
    },
  },
  watch:{
    dialogShowFlag(news){
      this.closeFlag = news
    },
    curSelectedObj(news){
      this.editUserForm=news
    }
  }
}
</script>

<style scoped>
.commit-person-btn{
  /*margin: 5px 0 0 0;*/
}
</style>