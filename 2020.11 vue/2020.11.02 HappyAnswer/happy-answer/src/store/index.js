import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state() {
    return {
      // 活动周数
      level: "第一周",
       // 题号
      itemNum: 1,
        // 用户所选答案
      answerid: [],
      questions: [],
     
     
    };
  },
  mutations: {
    // 初始化数据
    initData(state, payload) {
      state.questions = payload.data;
    }
  },
  actions: {
    async getData(context) {
      let res = await axios.get("/public/data/question.json");
      context.commit("initData", res);
    }
  },
  modules: {}
});
