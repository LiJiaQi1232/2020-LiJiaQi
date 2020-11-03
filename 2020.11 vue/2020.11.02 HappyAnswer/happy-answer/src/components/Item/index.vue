<template>
  <div class="home_container">
    <section>
      <!-- 头部标签 -->
      <header class="top_tips">
        <span class="num_tip">题目{{ itemNum }}</span>
      </header>
      <!-- 题目内容 -->
      <div></div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    this.$store.dispatch("getData");
  },
  computed: {
    ...mapState(["itemNum"])
  }
};
</script>

<style></style>
