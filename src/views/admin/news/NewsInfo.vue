<template>
  <div id="admin-news">
    <el-table
        ref="newsInfoRef"
        :data="
          tableData.filter(
            (data) =>
              !search || data.content.toLowerCase().includes(search.toLowerCase())
      )"
        style="width: 100%;height: calc(100% - 62px);overflow-y: scroll"
        @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column property="time" label="Date" width="200"/>
      <el-table-column property="content" label="Content" />
      <el-table-column align="right" width="200">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search content" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 20px 10px">
      <el-button type="warning" @click="deleteSelectedNews()">Delete selected news</el-button>
      &nbsp;&nbsp;<span class="refresh-icon"><el-icon @click="getNewsFromServer"><Refresh /></el-icon></span>
    </div>
    <news-editor :dialog-show-flag="dialogVisible"
                 :cur-selected-obj="curSelectedObj"
                 @changeCloseFlag="handlerEmit"
                 @refreshList="getNewsFromServer"
    ></news-editor>
  </div>
</template>

<script>

import {ElMessageBox} from "element-plus";
import NewsEditor from "@/components/admin/news/NewsEditor";

export default {
  name: "NewsInfo",
  data(){
    return {
      search:'',
      tableData:[],
      selectedData:[],
      curSelectedObj:{},
      dialogVisible:false
    }
  },
  mounted() {
    this.init()
  },
  methods:{
    init() {
      this.getNewsFromServer();
    },
    getNewsFromServer() {
      this.$store.dispatch('GetNews').then(res=>{
        if(res&&res.data){//to make sure the correct arrival of data
          if(res.code==='suc'){
            this.tableData = []
            res.data.forEach((news)=>{
              this.tableData.push(news)
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
    handlerEmit(flag){
      this.dialogVisible = flag
    },
    handleSelectionChange(rowsData){
      // this.selectedData = JSON.parse(JSON.stringify(rowsData))
      this.selectedData = rowsData
    },
    deleteSelectedNews(){
      if(this.selectedData&&this.selectedData.length>0){
        const idArr = [];// the array contains all the id that should be sent
        this.selectedData.forEach(selectObj=>{
          idArr.push(selectObj.id)
        })
        ElMessageBox.confirm("Are you sure to delete these news?",{
          confirmButtonText:'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning',
          callback:()=>{
            this.deleteNews(idArr)
          }
        })

      }else{
        return;
      }
    },
    deleteNews(idArr){
      this.$store.dispatch('DeleteNews', {idArr:idArr}).then(res => {
        if (res&&res.code === 'suc') {
          ElMessageBox.alert("Deleting the news succeeds",{
            confirmButtonText:'OK',
            callback:()=>{
              this.getNewsFromServer();
            }
          })
        } else {
          console.log('server response error');
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components:{
    NewsEditor
  }
}
</script>

<style scoped>
#admin-news{
  height: calc(100% - 52px);
  margin: 15px 1px 0px;
  width: 95%;
}
.refresh-icon{
  position: relative;
  top: 3px;
  cursor: pointer;
}
</style>