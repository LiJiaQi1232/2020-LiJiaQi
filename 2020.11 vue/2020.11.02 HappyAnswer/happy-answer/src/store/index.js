import { createStore } from "vuex";
// 引入axios
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
      questions: []
    };
  },
  mutations: {
    // 初始化数据
    initData(state, payload) {
      state.questions = payload.data;
    },
    //把id存储到answerid中
    remeberAnswer(state, payload) {
      state.answerid.push(payload);
      console.log(state.answerid);
    },
    // 如果itemNum小于questions的长度就 itemNum+=1
    addItemNum(state, num) {
      if (state.itemNum < state.questions.length) {
        state.itemNum += num;
      }
    }
  },
  actions: {
    // 获取数据
    async getData(context) {
      let res = await axios.get("/data/question.json");
      context.commit("initData", res);
    },
    addNum(context, payload) {
      // 点击下一题，记录答案id，判断是否是最后一题，不是就跳转到下一题
      context.commit("remeberAnswer", payload);
      //如果itemNum小于questions的数量就 调用addItemNum
      if (context.state.itemNum < context.state.questions.length) {
        context.commit("addItemNum", 1);
      }
    }
  },
  modules: {}
});
