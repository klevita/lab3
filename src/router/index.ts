import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthView from "../views/AuthView.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/auth",
        name: "auth",
        component: AuthView,
    },
];

const router = new VueRouter({
    routes,
});

router.beforeEach((to, from,next) => {
    if(to.name !== 'auth' && store.state.user.token === ''){
        next({name:'auth'})
    }else{
        next()
    }
})

export default router;
