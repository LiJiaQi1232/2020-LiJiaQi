<template>
  <div @click="handleChange">{{ num }}</div>
</template>

<script>
import {ref} from "vue"
export default {
  setup() {
    let num = ref(123);
    function handleChange(){
      num.value=23456
    }
    return {
      num,
      handleChange
    };
  }
};
</script>

<style>
</style>