import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state() {
    return {
      // 活动周期
      level: "第一周",
      question: [],
      // 题号
      itemNum: 1,
      // 存储用户的选择
      answerId: []
    };
  },
  mutations: {
    // 初始化数据
    initData(state, payload) {
      state.question = payload.data;
    },
    // 保存选项
    remeberId(state, payload) {
      state.answerId.push(payload);
      console.log(state.answerId);
    },
    // 题号++
    addItemNum(state, payload) {
      state.itemNum += payload;
    },
    // 再来一次  讲题号改为1
    cleanNum(state, payload) {
      state.itemNum = payload;
      state.answerId=[]
    }
  },
  actions: {
    // 获取数据
    async getData(context) {
      // 通过axios的get获取数据
      let res = await axios.get("./data/question.json");
      // 使用commit 调用 mutations的initData 初始化数据
      context.commit("initData", res);
    },
    // 点击下一题
    addItem(context, payload) {
      // 存储选项
      context.commit("remeberId", payload);
      // 判断题号是不是小于问题的长度
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
