<template>
  <div id="admin-users">
    <div class="user-info">
      <div id="my-info">
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
        <div class="update-pwd">
          <el-button :disabled="!isFilled" @click="updatePwd">Update your password</el-button>
        </div>
      </div>
      <el-table
          ref="newsUsersRef"
          :data="
          tableData.filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
      )"
          style="width: 100%;height: calc(100% - 32px);overflow-y: scroll"
      >
        <el-table-column property="name" label="name" width="270"/>
        <el-table-column property="role" label="role (D/S)" />
        <el-table-column align="right" width="200">
          <template #header>
            <el-input v-model="search" size="small" placeholder="search on name" />
          </template>
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
            >
            <el-button size="small" type="warning" @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="user-add">
      <person-add
          @refreshList="getUsersFromServer"
      ></person-add>
    </div>
    <person-editor
        :dialog-show-flag="dialogVisible"
        :cur-selected-obj="curSelectedObj"
        @changeCloseFlag="handlerEmit"
        @refreshList="getUsersFromServer"
    ></person-editor>
  </div>
</template>

<script>

import {ElMessageBox} from "element-plus";
import PersonAdd from "@/components/admin/person/PersonAdd";
import PersonEditor from "@/components/admin/person/PersonEditor";

export default {
  name: "PersonInfo",
  data(){
    return {
      search:'',
      tableData:[],
      selectedData:[],
      curSelectedObj:{},
      dialogVisible:false,
      myPwdObj:{
        id:this.$store.getters.userId,
        name:this.$store.getters.name,
        oldPassword:'',
        newPassword:''
      },
    }
  },
  mounted() {
    this.init()
  },
  components:{
    PersonEditor,
    PersonAdd
  },
  computed:{
    isFilled() {
      return this.myPwdObj.oldPassword && this.myPwdObj.newPassword;
    },
  },
  methods:{
    init() {
      this.getUsersFromServer();
    },
    getUsersFromServer() {
      this.$store.dispatch('GetAllUsers').then(res=>{
        if(res&&res.data){//to make sure the correct arrival of data
          if(res.code==='suc'){
            this.tableData = []
            res.data.forEach((users)=>{
              this.tableData.push(users)
            })
          }else{
            console.log('server response error');
          }
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    /**
     * @description: plat item handler methods
     * @author yuan.cao@utbm.fr
     * @date 2022-05-15 19:35:54
     */
    handleEdit(index,obj){
      this.curSelectedObj = obj
      this.dialogVisible=true;
    },
    handleDelete(index,obj){
      ElMessageBox.confirm("Are you sure to delete the person ["+obj.name+"] ?",{
        confirmButtonText:'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })          .then(() => {
        // here you can call the delete function.
        // this is the part that is executed when you click yes
        this.deleteUsers(obj.id);
      })
          .catch(() => {})
    },
    handlerEmit(flag){
      this.dialogVisible = flag
    },
    deleteUsers(id){
      this.$store.dispatch('DeleteUser', {id:id}).then(res => {
        if (res&&res.code === 'suc') {
          ElMessageBox.alert("Deleting the people succeeds",{
            confirmButtonText:'OK',
            callback:()=>{
              this.getUsersFromServer();
            }
          })
        } else {
          console.log('server response error');
        }
      }).catch(err => {
        console.log(err)
      })
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
    }
  },
}
</script>

<style scoped>
#admin-users{
  height: calc(100% - 52px);
  margin: 15px 1px 0px;
  width: 95%;
  display: flex;
}
.user-add{
  flex: 1;
  margin: 10px 5px;
  padding-left: 10px;

}
.user-info{
  width: 600px;
}
#my-info{
  display: flex;
}
.old-pwd{
  flex: 2;
  margin: 0 10px 0 10px;
}
.new-pwd{
  flex: 2;
  margin-right: 10px;
}
.update-pwd{
  flex: 1;
}
</style>