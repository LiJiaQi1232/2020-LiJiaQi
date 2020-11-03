<template>
  <div>
    <router-link to="/home">主页</router-link>
    <!-- 编程式切至/father -->
    <button @click="handleFather">父页</button>
    <router-link to="/user/456">用户页</router-link>
    <!-- 命名式切至/back -->
    <router-link :to="{ name: 'Bk' }">返回页</router-link>
    <p></p>

    <!-- 视图层 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    handleFather() {
      this.$router.push("/father");
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a {
  margin: 0 10px;
}
</style>
