import { createStore } from "vuex";

export default createStore({
    state() {
        return {
            list: ['state', 'getters', 'mutations', 'actions'], //list数据
            num: 0,
            num2: 0,
            num3: 0
        }
    },
    mutations: {
        // getters实现需要的方法
        add(state) {
            state.num++;
        },
        minus(state) {
            state.num--;
        },
        // mutations实现需要的方法
        add2(state) {
            state.num2++;
        },
        minus2(state) {
            state.num2--;
        },
        // 异步里面调用的递增方法
        timeAdd(state, step) {
            state.num3 += step;
        }
    },
    actions: {
        // context上下文  step参数[递增的步进值]
        asyncAdd(context, step) {
            setInterval(function () {
                // 调用同步方法timeAdd，传入step参数值
                context.commit('timeAdd', step);
            }, 1000)
        }
    },
    getters: {
        // count监测num的变化
        count(state) {
            return state.num;
        }
    }
})