<template>
  <el-table
      :data="tableData"
      style="width: 100%; margin-top: 30px"
      height="250"
      class="news-container"
      :header-cell-style="{background:'aliceblue', color:'#606266'}">
    <el-table-column
        fixed
        prop="time"
        label="Date"
        width="200"
        class="column-container"
        show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
        prop="content"
        label="Content"
        width="400"
        class="column-container"
        show-overflow-tooltip
    >
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name : 'news',
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getNewsFromServer();
    },
    getNewsFromServer() {
      this.$store.dispatch('GetNews').then(res=>{
        if(res&&res.data){//to make sure the correct arrival of data
          if(res.code==='suc'){
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
    }
  }
}
</script>
<style>
.news-container {
  margin-left: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}

</style>