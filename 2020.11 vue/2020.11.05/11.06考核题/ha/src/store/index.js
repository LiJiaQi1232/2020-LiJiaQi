import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state() {
    return {
      level: "第一周",
      questions: [],
      // 题号
      itemNum: 1,
      // 用户选择答案id的数组
      answerId: []
    };
  },
  mutations: {
    // 初始化数据
    initData(state, payload) {
      state.questions = payload.data;
    },
    // 保存选择的id
    remeberId(state, payload) {
      state.answerId.push(payload);
    },
    // 下一题 itemNum自增
    addItemNum(state, payload) {
      state.itemNum += payload;
    },
    cleanNum(state, payload) {
      state.itemNum = payload;
      state.answerId = [];
    }
  },
  actions: {
    // 获取数据
    async getData(context) {
      let res = await axios.get("./data/question.json");
      context.commit("initData", res);
    },
    //
    addNum(context, payload) {
      // 把id存储到anwserId这个数组中
      context.commit("remeberId", payload);
      // num自增
      if (context.state.itemNum < context.state.questions.length) {
        context.commit("addItemNum", 1);
      }
    },
    //再来一次
    goback(context, payload) {
      context.commit("cleanNum", payload);
    }
  },
  modules: {}
});
