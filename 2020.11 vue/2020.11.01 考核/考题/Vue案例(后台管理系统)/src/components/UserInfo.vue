<template>
  <div>
    <h3>用户详情页面----用户id为：{{ id }}</h3>
    <button @click="handleBack">返回</button>
  </div>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    handleBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style></style>
