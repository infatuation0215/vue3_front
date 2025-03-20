import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import AdminDashboard from '../pages/AdminDashboard.vue';
import UserDashboard from '../pages/UserDashboard.vue';
import { useAuthStore } from '../store/auth';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/admin', component: AdminDashboard, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/user', component: UserDashboard, meta: { requiresAuth: true, role: 'user' } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.loadUser();

  if (to.meta.requiresAuth && (!authStore.user || !authStore.role || authStore.role !== to.meta.role)) {
    next('/login');
  } else {
    next();
  }
});

export default router;
