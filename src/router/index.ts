import { createWebHistory, createRouter } from "vue-router";
import GameShedule from "../pages/GameShedule.vue";
import GameRecord from "../pages/GameRecord.vue";
import SignIn from "../pages/SignIn.vue";
import SignUp from "../pages/SignUp.vue";

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
  {
    path: "/sign",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/register",
    name: "Register",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
