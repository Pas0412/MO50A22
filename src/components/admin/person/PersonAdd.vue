<template>
  <el-form label-position="top" :model="editUserForm" ref="editUserForm">
    <el-form-item prop="type" label="Choose the role">
      <el-select v-model="editUserForm.role" placeholder="Select" style="width: 125px">
        <el-option label="0 Director" value=0 />
        <el-option label="1 Staff" value=1 />
      </el-select>
    </el-form-item>
    <el-form-item prop="name" label="name">
      <el-input v-model="editUserForm.name" autocomplete="off" placeholder="Please enter the name"/>
    </el-form-item>
    <el-form-item prop="password" label="password">
      <el-input type="password" v-model="editUserForm.password" autocomplete="off" placeholder="Please enter the password"/>
    </el-form-item>
  </el-form>
  <div class="commit-person-btn">
    <el-button :disabled="!isFilled" type="primary" @click="addUser"
    >Add New User</el-button
    >
  </div>
</template>

<script>
import {ElMessageBox} from "element-plus";

export default {
  name: 'PersonAdd',
  data() {
    return {
      editUserForm: {
        role:1//by default: staff
      },
    }
  },
  computed:{
    isFilled() {
      return this.editUserForm.role&&this.editUserForm.password&&this.editUserForm.name;
    },
  },
  methods:{
    addUser(){
      this.$store.dispatch('AddUser', this.editUserForm).then(res => {
        if(res){
          if (res.code === 'suc') {
            ElMessageBox.alert("Adding the user succeeds",{
              confirmButtonText:'OK',
              callback:()=>{
                this.$emit("refreshList");//refresh data after updating
              }
            })
          } else {
            ElMessageBox.alert("Adding the user fails: "+res.msg,{
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
  }
}
</script>

<style scoped>

</style>