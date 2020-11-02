import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../components/Home";
import Father from "../components/Father";
import Son from "../components/Son";
import Daughter from "../components/Daughter";
import User from "../components/User";
import Back from "../components/Back";

const routes = [
    // 重定向/home
    { path: "/", redirect: "/home" },
    { path: "/home", component: Home },
    {
        // 给/father路由命名
        path: "/father", component: Father, children: [
            { path: "/father", redirect: "/son" },
            { path: "/son", component: Son },
            { path: "/daughter", component: Daughter }
        ]
    },

    // props:true 方式获取到id
    { path: "/user/:id", component: User, props: true },
    { path: "/back", name: "Bk", component: Back },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;