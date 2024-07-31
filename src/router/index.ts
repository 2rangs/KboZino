import { createWebHistory, createRouter } from "vue-router";
import GameShedule from "../pages/GameShedule.vue";
import GameRecord from "../pages/GameRecord.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: GameShedule,
  },
  {
    path: "/record/:id",
    name: "GameRecord",
    component: GameRecord,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
