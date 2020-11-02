<template>
  <div class="hello">
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
    <div>
      <button @click="add">g+</button>
      <button @click="minus">g-</button>
      <p>{{ count }}</p>
    </div>
    <div>
      <button @click="add2">m+</button>
      <button @click="minus2">m-</button>
      <p>{{ num2 }}</p>
    </div>
    <div>
      <!-- click.once让方法只能执行一次，传入step步长为10 -->
      <button @click.once="asyncAdd(10)">递增</button>
      <p>{{ num3 }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex"; // 引入vuex中的方法
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["add", "minus", "add2", "minus2"]), //获取同步方法
    ...mapActions(["asyncAdd"]) //获取异步方法
  },
  computed: {
    ...mapState(["list", "num2", "num3"]), //获取数据属性
    ...mapGetters(["count"]) //获取计算属性count
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
