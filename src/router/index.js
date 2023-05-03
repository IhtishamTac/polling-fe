import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/poll',
      name: 'poll',
      component: () => import('../views/PollView.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path); 
  const access_token = localStorage.getItem('access_token'); 
  const isAuthenticated = access_token != null; 

  if (authRequired && !isAuthenticated) { 
    next('/'); 
  } else if (to.path === '/' && isAuthenticated) { 
    next('/home'); 
  } else {
    next();
  }
});

export default router
