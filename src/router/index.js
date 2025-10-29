import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import Messages from '../views/Messages.vue'
import Profile from '../views/Profile.vue'
import Updates from '../views/Updates.vue'
import Examen from '../views/Examen.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    // 3. Define las rutas para tus nuevas vistas
    path: '/messages',
    name: 'Messages',
    component: Messages
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/updates',
    name: 'Updates',
    component: Updates
  },
  {
    path: '/examen',
    name: 'Examen',
    component: Examen
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
