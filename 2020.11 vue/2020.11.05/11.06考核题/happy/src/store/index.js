import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state() {
    return {
      level: "第一周",
      question: [],
      // 题号
      itemNum: 1,
      // 用户所选答案
      answerId: []
    };
  },
  mutations: {
    initData(state, payload) {
      state.question = payload.data;
    },
    // 存储id
    remeberId(state, payload) {
      state.answerId.push(payload);
    },
    // 题号++
    addItemNum(state, num) {
      state.itemNum += num;
    },
    cleanNum(state, payload) {
      state.itemNum = payload;
      state.answerId = [];
    }
  },
  actions: {
    async getData(context) {
      let res = await axios.get("./data/question.json");
      context.commit("initData", res);
    },
    //
    addNum(context, payload) {
      context.commit("remeberId", payload);
      if (context.state.itemNum < context.state.question.length) {
        context.commit("addItemNum", 1);
      }
    },
    // 再来一次
    goback(context, payload) {
      context.commit("cleanNum", payload);
    }
  },

  modules: {}
});
