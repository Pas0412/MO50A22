<template>
<div class="simple-change">
  <el-table :data="
      tabList.filter(
        (data) =>
          !search || data.name.toLowerCase().includes(search.toLowerCase())
      )" height="100%" style="width: 100%">
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="type" label="Plat Type" />
    <el-table-column prop="rate" label="Rate" />
    <el-table-column prop="content" label="Description" />
    <el-table-column prop="day" width="100px" label="Serve Day (0: Mon)" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search name" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
        >Edit</el-button
        >
        <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
        >Deactivate</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <plat-editor :dialog-show-flag="dialogVisible"
               :cur-selected-obj="curSelectedObj"
               @changeCloseFlag="handlerEmit"
               @refreshList="getAllPlatsFromServer"
                ></plat-editor>
</div>
</template>

<script>

import PlatEditor from "@/components/admin/plat/PlatEditor";
import {ElMessageBox} from "element-plus";

export default {
  name: "PlatSimpleChange",
  components:{
    PlatEditor
  },
  data(){
    return {
      tabList: [],
      search:'',
      dialogVisible:false,
      curSelectedObj: {}
    }
  },
  mounted() {
    this.init()
  },
  computed:{
  },
  methods: {
    init() {
      this.getAllPlatsFromServer()
    },
    getAllPlatsFromServer() {
      this.tabList = [];
      this.$store.dispatch('GetAllPlats').then(res => {
        // console.log(res);
        if (res && res.data) {//to make sure the correct arrival of data
          if (res.code === 'suc') {
            res.data.forEach((plat) => {
              this.tabList.push(plat)
            })
          } else {
            console.log('server response error');
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    transferDay(numDay){
      switch (numDay) {
        case 0:
          return "Monday";
        case 1:
          return "Tuesday";
        case 2:
          return "Wednesday";
        case 3:
          return "Thursday";
        case 4:
          return "Friday";
        default:
          return '';
      }
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
    handlerEmit(flag){
      this.dialogVisible = flag
    },
    handleDelete(index,obj){
      ElMessageBox.confirm("Are you sure to deactivate the plat ["+obj.name+"] ?",{
        confirmButtonText:'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning',
        callback:()=>{
          this.deletePlat(obj.id)
        }
      })
    },
    deletePlat(id){
      this.$store.dispatch('DeletePlat', {id:id}).then(res => {
        if (res&&res.code === 'suc') {
          ElMessageBox.alert("Deactivating one plat succeeds, you can still reactivate it in INACTIVATE LIST",{
            confirmButtonText:'OK',
            callback:()=>{
              this.getAllPlatsFromServer();
            }
          })
        } else {
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
.simple-change{
 height: calc(100% - 52px);
  margin: 15px 1px 0px;
  width: 95%;
}
</style>