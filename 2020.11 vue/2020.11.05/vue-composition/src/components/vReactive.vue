<template>
  <div @click="handleChange">{{ obj[3].name }}</div>
</template>

<script>
import {reactive} from "vue";
export default {
  setup() {
    let obj = reactive([
      1,2,3,{
        name:'啊哈'
      }
    ])
    function handleChange(){
      obj[3].name="张三"
    }
    return{
    obj,
    handleChange
  }
  },
  
};
</script>

<style></style>
