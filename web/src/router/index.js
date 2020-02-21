import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import("@/components/Home.vue"),
  },
  {
    path: '/music',
    name: "tabMusic",
    component: () => import("@/components/tabMusic.vue")
  },
  {
    path: "/musicData",
    name: "musicData",
    component: () => import("@/components/musicData.vue")
  },
  {
    path: "/song",
    name: "song",
    component: () => import("@/components/songMusic.vue")
  },
  {
    path: "/tabRanking",
    name: "tabRanking",
    component: () => import("@/components/tabRanking.vue")
  },
  {
    path: '*',
    component: ()=> import("@/components/404.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
