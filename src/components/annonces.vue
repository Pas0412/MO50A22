<template>
  <div class="annonce-container">
    <div class="annonce-header">Annonce</div>
    <div class="news" v-for="item in newsList" :key="item">
      <div v-if="item.id == '0'||'1'||'2'">{{item.mm}}</div>
      <div v-if="item.id == '0'||'1'||'2'">{{item.dd}}</div>
      <div v-if="item.id == '0'||'1'||'2'">{{item.content}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name : 'annonces',
    data() {
      return {
        newsList:[
          {id:"0", mm:'May', dd:"1", content:"La cantine se ferme aujourd'hui"},
          {id:"1", mm:'May', dd:"1", content:"La cantine se ferme aujourd'hui"},
          {id:"2", mm:'May', dd:"1", content:"La cantine se ferme aujourd'hui"},
          {id:"3", mm:'May', dd:"1", content:"La cantine se ferme aujourd'hui"},
        ]
      }
    }
  }
</script>

<style>
.annonce-container {
  margin: 30px;
  width: 500px;
  display: flex;
  flex-direction: column;
}

.annonce-header {
  width: 100%;
  background-color: aliceblue;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.news {
  display: flex;
  justify-content: space-around;
  margin: 5px;
}
</style>