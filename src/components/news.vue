<template>
  <el-table
      :data="tableData"
      style="width: 100%"
      height="250"
      class="news-container"
      :header-cell-style="{background:'aliceblue', color:'#606266'}">
    <el-table-column
        fixed
        prop="date"
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
      tableData: [{
        date: '03/05/2022',
        content: "La cantine se ferme aujourd'hui, bie lai bu ran wo zou ni"
      },{
        date: '03/05/2022',
        content: "La cantine se ferme aujourd'hui"
      },{
        date: '03/05/2022',
        content: "La cantine se ferme aujourd'hui"
      },{
        date: '03/05/2022',
        content: "La cantine se ferme aujourd'hui"
      },{
        date: '03/05/2022',
        content: "La cantine se ferme aujourd'hui"
      },{
        date: '03/05/2022',
        content: "La cantine se ferme aujourd'hui"
      },{
        date: '03/05/2022',
        content: "La cantine se ferme aujourd'hui"
      },{
        date: '03/05/2022',
        content: "La cantine se ferme aujourd'hui"
      },{
        date: '03/05/2022',
        content: "La cantine se ferme aujourd'hui"
      },]
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