<!--Only upload a single file-->
<template>
  <div id="upload-file">
    <el-upload
        class="upload-demo"
        drag
        action="ignore"
        :http-request="uploadFileAccAction"
        :on-error="uploadRes"
        v-loading="uploadLoading"
        element-loading-text="uploading..."
    >
      <img class="upload-img" src="~assets/img/upload.svg" alt="upload">
      <div class="el-upload__text">
        Drop photo of plat here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          file with a size less than 100MB
        </div>
      </template>
    </el-upload>
  </div>
  </template>
<script>
import {ElMessageBox} from "element-plus";
import {maxUploadFileSize, uploadAddress} from "@/utils/const/const";
export default {
  name: "UploadFile",
  data(){
    return {
      maxUploadFileSize:maxUploadFileSize,
       uploadAddress:uploadAddress,
      uploadLoading:false,
      // childTimer:''
    }
  },
  methods:{
    uploadFileAccAction(params){
      this.uploadLoading=true;//使页面处于加载中
      const file = params.file,
          // fileType = file.type,
          // isImage = fileType.indexOf("image") != -1,
          isLtMB = file.size /1024/1024<this.maxUploadFileSize;//文件大小是否小于限制
      if(!isLtMB){
        ElMessageBox.alert("The size of the file must less than "+this.maxUploadFileSize+"M",{
          confirmButtonText:'OK',
        })
      }
      //start the encapsulation
      const form = new FormData();
      //file object
      form.append("file",file);
      this.$store.dispatch('UploadFile',form).then(res=>{
        let resJson = JSON.parse(res.request.response);//解析返回的json字符串
        if(resJson&&resJson.code==='fail'){
          ElMessageBox.alert("upload fails: "+resJson.msg+", heading back to login page...",{
            confirmButtonText:'OK',
            callback:()=>{
              //pay attention to the order of the three phrases, sync action will come before async
              //so token is null when execute Logout
              this.$router.replace('/');
            }
          })
        }
        this.$emit("uploadSuc",resJson.data)//upload success =, now return the url to his father
        this.uploadLoading=false//停止加载
        // this.childTimer = new Date().getTime()//force refresh file list
          }).catch(err=>{console.log(err);this.uploadLoading=false;})
    },
    uploadRes(err){
      console.log(err)
    },

    //refresh the file list, emitted by the son
    doRefresh(newTime){
      this.childTimer = newTime;
    }
  },
}
</script>

<style scoped>
.upload-demo{
  text-align: center;
  margin-top: 20px;
}
.upload-img{
  height: 150px;
  width: 150px;
}
</style>