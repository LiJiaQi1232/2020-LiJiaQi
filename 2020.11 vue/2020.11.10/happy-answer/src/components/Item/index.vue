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
    //#endregion

    //#region
    // 渲染题目
    let question = computed(() => store.state.question);
    console.log(question);
    let itemTitle = computed(() => {
      return question.value[itemNum.value - 1].topic_name;
    });
    //#endregion

    //#region
    let chooseNum = ref(null),
      chooseId = ref(null);
    function choosed(index, id) {
      chooseNum.value = index;
      chooseId.value = id;
    }
    //#endregion

    //#region
    // 下一题
    function nextItem() {
      if (chooseNum.value != null) {
        chooseNum.value = null;
        store.dispatch("addItem", chooseId.value);
      } else {
        alert("您还没有选择答案");
      }
    }
    //#endregion

    //#region
    // 提交
    let router = useRouter();
    function submitItem() {
      if (chooseNum.value != null) {
        chooseNum.value = null;
        router.push("/score");
        store.dispatch("addItem", chooseId.value);
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
      choosed,
      nextItem,
      submitItem
    };
  }
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
