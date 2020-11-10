import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state() {
    return {
      question: [],
      // 活动周期
      level: "第一周",
      // 题号
      itemNum: 1,
      // 存储用户选择的答案
      answerId: []
    };
  },
  mutations: {
    // 初始化数据
    initData(state, payload) {
      state.question = payload.data;
      // console.log(state.question);
    },
    // 存储用户选择的答案
    remeberId(state, payload) {
      state.answerId.push(payload);
    },
    // 题号++
    addItemNum(state, payload) {
      state.itemNum += payload;
    },
    goHome(state, payload) {
      state.itemNum = payload;
      state.answerId=[]
    }
  },
  actions: {
    // 获取数据
    async getData(context) {
      let res = await axios.get("/data/question.json");
      context.commit("initData", res);
    },
    //
    addItem(context, payload) {
      context.commit("remeberId", payload);
      // 题号++
      if (context.state.itemNum < context.state.question.length) {
        context.commit("addItemNum", 1);
      }
    },
    // 再来一次
    goback(context,payload) {
      context.commit("goHome",payload)
    }
  },
  modules: {}
});
