<template>
  <div class="block">
    <span class="demonstration"></span>
    <el-rate
        v-model="note"
        :colors="colors"
        @change="rating"
    >
    </el-rate>
  </div>
</template>

<script>
export default {
// eslint-disable-next-line vue/multi-word-component-names
name: "rate",
  data() {
    return {
      note: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']  // equal to { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    }
  },
  props: ['home'],
  mounted() {
    this.init();
  },
  methods: {
    rating() {
      sessionStorage.setItem(this.home.id, this.note);
    },
    init() {
      this.setRate();
    },
    setRate() {
      var lastRate = sessionStorage.getItem(this.home.id);
      if (lastRate != null){
        this.note = lastRate;
      }
    }
  }
}
</script>

<style scoped>

</style>