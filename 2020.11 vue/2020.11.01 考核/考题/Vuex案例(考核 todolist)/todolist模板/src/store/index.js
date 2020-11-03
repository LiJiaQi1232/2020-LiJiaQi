import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state() {
    return {
      list: [],
      viewKey:'all'
    };
  },
  mutations: {
    // 初始化数据
    initData(state, payload) {
      state.list = payload.data;
    },
    // 添加任务
    createData(state, payload) {
      state.list.push({
        id: new Date().valueOf(),
        info: payload,
        done:false
      })
    },
    // 删除任务
    deleteData(state, payload) {
      // 找到和传过来id一样的对象的索引
      let index = state.list.findIndex(item => item.id == payload)
      // 通过数组的splice切割
      state.list.splice(index,1)
    },
    // 更改状态
    updateData(state, payload) {
      // 找到和传过来id一样的对象的索引
      let index = state.list.findIndex(item => item.id == payload.id)
      state.list[index].done=payload.status
    },
    // 清除已完成
    cleanData(state) {
      state.list=state.list.filter(item=>item.done==false)
    },
    // 切换选择卡
    changeKey(state, payload) {
      state.viewKey=payload
    }
  },
  actions: {
    // 获取list.json中的数据
    async getData(context) {
      // 使用axios的get获取数据
      let res = await axios.get("./list.json");
      context.commit("initData", res);
    }
  },
  getters: {
    surplus(state) {
      let data = state.list.filter(item => item.done == false)
      return data.length
    },
    filterList(state) {
      if (state.viewKey == 'all') {
        return state.list
      }
      else if (state.viewKey == 'undone') {
        let data = state.list.filter(item => item.done == false)
        return data
      }
      else if (state.viewKey == 'done') {
        let data = state.list.filter(item => item.done == true)
        return data
      }
    }
  }
});
