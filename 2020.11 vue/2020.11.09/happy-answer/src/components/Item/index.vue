<template>
  <div class="home_container">
    <section>
      <!-- 头部标签 -->
      <header class="top_tips">
        <span class="num_tip">题目{{ itemNum }}</span>
      </header>
      <!-- 题目内容 -->
      <div class="item_back item_container_style">
        <div class="item_list_container" v-if="question.length > 0">
          <!-- 题干 -->
          <header class="item_title">{{ itemTitle }}</header>
          <!-- 选项 -->
          <ul>
            <li
              class="item_list"
              v-for="(item, index) in question[itemNum - 1].topic_answer"
              :key="item.topic_answer_id"
              @click="choosed(index, item.topic_answer_id)"
            >
              <span
                class="option_style"
                :class="{ has_choosed: chooseNum == index }"
                >{{ String.fromCharCode(65 + index) }}</span
              >
              <span class="option_detail">{{ item.answer_name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <span
        class="next_item button_style"
        v-if="itemNum < question.length"
        @click="nextItem"
      ></span>
      <span class="submit_item button_style" v-else @click="submitItem"></span>
    </section>
  </div>
</template>

<script>
// import { mapState } from "vuex";

import { useStore } from "vuex";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "Item",
  setup() {
    //#region
    // 初始化数据
    let store = useStore();
    store.dispatch("getData");
    //#endregion

    //#region
    // 渲染题号
    let itemNum = computed(() => store.state.itemNum);
    // let itemNum = computed(() => store.state.itemNum);
    console.log(itemNum);
    //#endregion

    //#region
    // 渲染题目页面内容区域（题干）
    let question = computed(() => store.state.question);
    let itemTitle = computed(() => {
      return question.value[itemNum.value - 1].topic_name;
    });
    //#endregion

    //#region
    // 被点击
    let chooseNum = ref(null);
    let chooseId = ref(null);
    function choosed(index, id) {
      chooseNum.value = index;
      chooseId.value = id;
    }
    //#endregion

    //#region
    // 下一题
    function nextItem() {
      // 判断用户是否选择
      if (chooseNum.value != null) {
        // 如果选择了 跳到下一题 把之前被选中的选项清空
        chooseNum.value = null;
        // 跳到下一题 要把选中的选项存储起来  把题号++
        store.dispatch("addItem", chooseId.value);
      } else {
        alert("您还没有选择答案");
      }
    }
    //#endregion

    //#region
    // 提交按钮
    let router = useRouter();
    function submitItem() {
      // 判断用户是否选择
      if (chooseNum.value != null) {
        // 如果选择了 跳到下一题 把之前被选中的选项清空
        chooseNum.value = null;
        // 跳到下一题 要把选中的选项存储起来  把题号++
        store.dispatch("addItem", chooseId.value);
        router.push("/score");
      } else {
        alert("您还没有选择答案");
      }
    }
    //#endregion
    return {
      itemNum,
      question,
      itemTitle,
      chooseNum,
      chooseId,
      choosed,
      nextItem,
      submitItem
    };
  }

  // data() {
  //   return {
  //     chooseNum: null,
  //     // topic_answer_id 是唯一的
  //     chooseId: null
  //   };
  // },
  // methods: {
  //点击选项的时候
  // choosed(index, id) {
  //   this.chooseNum = index;
  //   this.chooseId = id;
  // },
  // 当点击下一题的时候
  // nextItem() {
  //   // 判断用户是否选择
  //   if (this.chooseNum != null) {
  //     // 如果选择了 跳到下一题 把之前被选中的选项清空
  //     this.chooseNum = null;
  //     // 跳到下一题 要把选中的选项存储起来  把题号++
  //     this.$store.dispatch("addItem", this.chooseId);
  //   } else {
  //     alert("您还没有选择答案");
  //   }
  // },
  // 点击提交按钮
  // submitItem() {
  //   // 判断用户是否选择
  //   if (this.chooseNum != null) {
  //     // 如果选择了 跳到下一题 把之前被选中的选项清空
  //     this.chooseNum = null;
  //     // 跳到下一题 要把选中的选项存储起来  把题号++
  //     this.$store.dispatch("addItem", this.chooseId);
  //     this.$router.push("/score");
  //   } else {
  //     alert("您还没有选择答案");
  //   }
  // }
  // }
  // created() {
  //   this.$store.dispatch("getData");
  // },
  // 获取题号和数据
  // computed: {
  //   ...mapState(["itemNum", "question"]),
  //   // 获取题目内容
  //   itemTitle() {
  //     return this.question[this.itemNum - 1].topic_name;
  //   }
  // }
};
</script>

<style lang="scss">
.home_container {
  height: 100%;
  background-image: url("/images/1-1.jpg");
}
.next_item {
  background-image: url("/images/2-2.png");
}

.submit_item {
  background-image: url("/images/3-1.png");
}

.item_back {
  background-image: url("/images/2-1.png");
  background-size: 100% 100%;
}

.item_title {
  font-size: 0.65rem;
  color: #fff;
  line-height: 0.7rem;
}

.item_list_container {
  margin: 2.5rem;
  padding: 0;
}

.item_list {
  font-size: 0;
  margin-top: 0.4rem;
  width: 10rem;
  span {
    display: inline-block;
    font-size: 0.6rem;
    color: #fff;
    vertical-align: middle;
  }
  .option_style {
    height: 0.725rem;
    width: 0.725rem;
    border: 1px solid #fff;
    border-radius: 50%;
    line-height: 0.725rem;
    text-align: center;
    margin-right: 0.3rem;
    font-size: 0.5rem;
    font-family: "Arial";
  }
  .has_choosed {
    background-color: #ffd400;
    color: #575757;
    border-color: #ffd400;
  }
  .option_detail {
    width: 7.5rem;
    padding-top: 0.11rem;
  }
}
</style>
