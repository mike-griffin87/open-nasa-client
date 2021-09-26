import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Archive from "../views/Archive.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/archive",
    name: "Arcive",
    component: Archive,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
