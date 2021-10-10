import Vue from "vue";
import VueRouter from "vue-router";
import PotdHome from "../views/POTD/PotdHome.vue";
import Archive from "../views/POTD/Archive.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/potd",
    name: "Astronomy Photo of the Day",
    component: PotdHome,
  },
  {
    path: "/potd/:date",
    name: "Astronomy Photo of the Day",
    component: PotdHome,
  },
  {
    path: "/potd/archive",
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
