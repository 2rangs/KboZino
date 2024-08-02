import { createWebHistory, createRouter } from "vue-router";
import GameShedule from "../pages/GameShedule.vue";
import GameRecord from "../pages/GameRecord.vue";
import SignIn from "../pages/SignIn.vue";
import RecoveryPassword from "../pages/RecoveryPassword.vue";
import ResetPassword from "../pages/ResetPassword.vue";

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
    path: "/recovery",
    name: "recovery",
    component: RecoveryPassword,
  },
  {
    path: "/reset",
    name: "reset",
    component: ResetPassword,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
