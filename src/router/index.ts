import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Layout from "../layouts/Layout.vue";
import AdminDashboard from "../pages/AdminDashboard.vue";
import Dashboard from "../pages/Dashboard.vue";
import { useAuthStore } from "../store/auth";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  // { path: '/admin', component: AdminDashboard, meta: { requiresAuth: true, role: 'admin' } },
  // { path: '/user', component: UserDashboard, meta: { requiresAuth: true, role: 'user' } }
  {
    path: "/layout",
    component: Layout,
    children: [
      {
        path: "home",
        component: Dashboard,
        meta: { requiresAuth: true, role: ["user", "admin"] },
      },
      {
        path: "admin",
        component: AdminDashboard,
        meta: { requiresAuth: true, role: "admin" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.loadUser();

  const allowedRoles = to.meta.role as string[] | undefined;
  if (to.meta.requiresAuth) {
    if (!authStore.role || !allowedRoles || !allowedRoles.includes(authStore.role)) {
      next('/login'); // 角色不匹配，跳转到登录页
    } else {
      next(); 
    }
  } else {
    next(); 
  }
});

export default router;
