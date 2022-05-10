<template>
  <div class="block">
    <span class="demonstration"></span>
    <el-rate
        v-model="value2"
        :colors="colors">
    </el-rate>
  </div>
</template>

<script>
export default {
// eslint-disable-next-line vue/multi-word-component-names
name: "rate",
  data() {
    return {
      value1: null,
      value2: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    }
  },
  props: ['home'],
  methods: {
    rating(){
      console.log(this.home.name);
      console.log(this.value2);

    }
  }
}
</script>

<style scoped>

</style>