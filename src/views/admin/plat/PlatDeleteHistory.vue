<template>
  <div class="simple-change">
    <el-table :data="
      tabList.filter(
        (data) =>
          !search || data.name.toLowerCase().includes(search.toLowerCase())
      )" height="800px" style="width: 100%">
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
          <el-button size="small" @click="handleRestore(scope.$index, scope.row)"
          >Reactivate</el-button
          >
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import {ElMessageBox} from "element-plus";

export default {
  name: "PlatDeleteHistory",

  data(){
    return {
      tabList: [],
      search:'',
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
      this.getAllDeletedPlatsFromServer()
    },
    getAllDeletedPlatsFromServer() {
      this.tabList = [];
      this.$store.dispatch('GetAllDeletedPlats').then(res => {
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
    handleRestore(index,obj){
      this.$store.dispatch('RestorePlat', {id:obj.id}).then(res => {
        if (res&&res.code === 'suc') {
          ElMessageBox.alert("Reactivating one plat succeeds, you can now consult it in GENERAL INFO!",{
            confirmButtonText:'OK',
            callback:()=>{
              this.getAllDeletedPlatsFromServer();
            }
          })
        } else {
          console.log('server response error');
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleDelete(index,obj){
      ElMessageBox.confirm("Are you sure to delete the plat ["+obj.name+"] forever? You can no longer restore it!",{
        confirmButtonText:'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })          .then(() => {
        // here you can call the delete function.
        // this is the part that is executed when you click yes
        this.realDeletePlat(obj.id)
      })
          .catch(() => {})
    },
    realDeletePlat(id){
      this.$store.dispatch('RealDeletePlat', {id:id}).then(res => {
        if (res&&res.code === 'suc') {
          ElMessageBox.alert("Deleting one plat succeeds",{
            confirmButtonText:'OK',
            callback:()=>{
              this.getAllDeletedPlatsFromServer();
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
  margin: 15px 1px 0px;
}
</style>