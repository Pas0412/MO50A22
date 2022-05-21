<template>
  <el-dialog
      v-model="closeFlag"
      title="News Editor"
      width="90%"
      :before-close="emitClose"
  >
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
           <el-button :disabled="!isFilled" type="primary" @click="commitNews"
           >Commit Change</el-button
           >
        </span>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {ElMessageBox} from "element-plus";
import {formatDate} from "@/utils/CommonUtils";

export default {
  name: "NewsEditor",
  data(){
    return {
      closeFlag:false,
      dateValue:new Date(),
      editNewsForm:"",
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
    commitNews(){
      this.emitClose();
      let sendObj = {
        id:this.editNewsForm.id,
        content:this.editNewsForm.content,
        time:formatDate(this.dateValue)
      }
      this.$store.dispatch('UpdateNews', sendObj).then(res => {
        if(res){
          if (res.code === 'suc') {
            ElMessageBox.alert("Updating the news succeeds",{
              confirmButtonText:'OK',
              callback:()=>{
                this.$emit("refreshList");//refresh data after updating
              }
            })
          } else {
            ElMessageBox.alert("Updating the news fails: "+res.msg,{
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
  watch:{
    dialogShowFlag(news){
      this.closeFlag = news
    },
    curSelectedObj(news){
      this.editNewsForm=news
    }
  }
}
</script>

<style scoped>
#news-editor{
  display: flex;
  flex-direction: row;
}
.el-calendar{
  width: 100%;
  margin-right: 15px;
}
.input-submit{
  width: 100%;
}
.commit-news-btn{
  position: relative;
  top: 15px;
}
</style>