import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home/Home.vue";
import NotFound from "../components/NotFound/NotFound.vue";
import About from "../views/Home/About/About.vue";
import Auth from "../views/Auth/Auth.vue";
import Login from "../views/Auth/Login/Login.vue";
import Signin from "../views/Auth/Signin/Signin.vue";
import { RouterNames } from "./RouterNames";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: RouterNames.AUTH,
    component: Auth,
    children: [
      {
        path: "/",
        name: RouterNames.LOGIN,
        component: Login,
      },
      {
        path: RouterNames.SIGNIN,
        name: RouterNames.SIGNIN,
        component: Signin,
      },
    ],
  },
  {
    path: "/" + RouterNames.HOME,
    name: RouterNames.HOME,
    component: Home,
    children: [
      {
        path: RouterNames.ABOUT,
        name: RouterNames.ABOUT,
        component: About,
      },
    ],
  },
  {
    path: "/" + RouterNames.NOTFOUND,
    name: RouterNames.NOTFOUND,
    component: NotFound,
  },
  { path: "/:pathMatch(.*)*", redirect: { name: RouterNames.NOTFOUND } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
