<template>
  <div id="news-editor">
    <el-calendar v-model="dateValue" >
    </el-calendar>
    <div class="input-submit">
      <el-input
          v-model="editNewsForm.content"
          :rows="10"
          type="textarea"
          placeholder="Please input the content of news"
      />
      <span class="commit-news-btn">
           <el-button :disabled="!isFilled" type="primary" @click="addNews"
           >Commit Change</el-button
           >
        </span>
    </div>
  </div>
</template>

<script>
import {cantineID} from "@/utils/const/const";
import {ElMessageBox} from "element-plus";
import {formatDate} from "@/utils/CommonUtils";

export default {
  name: "AddNews",
  data(){
    return {
      dateValue:new Date(),
      editNewsForm:{}
    }
  },
  methods:{
    addNews(){
      this.editNewsForm.cid = parseInt(cantineID)
      this.editNewsForm.time = formatDate(this.dateValue)
      this.$store.dispatch('AddNews', this.editNewsForm).then(res => {
        if(res){
          if (res.code === 'suc') {
            ElMessageBox.alert("Adding the news succeeds",{
              confirmButtonText:'OK',
              callback:()=>{
              }
            })
          } else {
            ElMessageBox.alert("Adding the news fails: "+res.msg,{
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
  computed:{
    isFilled() {
      return this.dateValue && this.editNewsForm.content;
    },
  },
}
</script>

<style scoped>
#news-editor{
  display: flex;
  flex-direction: row;
  height: calc(100% - 52px);
  margin: 15px 1px 0px;
  width: 95%;
  overflow-y: hidden;
}
.el-calendar{
  width: 100%;
  margin-right: 15px;
}
.input-submit{
  margin-top: 10px;
  width: 100%;
}
.commit-news-btn{
  position: relative;
  top: 15px;
}
</style>