import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:'/farm',
    },
    {
      path: "/farm",
      name: "farm",
      component: () => import("../views/farm/index.vue"),
    },
    {
      path: "/damage",
      name: "damage",
      component: () => import("../views/damage/index.vue"),
    },
    {
      path: "/claim",
      name: "claim",
      component: () => import("../views/claim/index.vue"),
    },
    {
      path:'/mine',
      name:'mine',
      component:()=> import('../views/mine/index.vue')
    },
  ],
});

export default router;
