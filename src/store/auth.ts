import { defineStore } from "pinia";
import { login, logout } from "../api/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    user: null as string |null,
    role: null as string |null,
  }),
  actions: {
    async loginAction(username: string, password: string, role: string) {
      try {
        const res = await login(username, password, role);
        console.log(res); 
        console.log(res.data.token); 
        if (res && res.data.token) {
          this.token = res.data.token;
          localStorage.setItem("token", res.data.token);

          this.user = username;  
          this.role = role; 
          localStorage.setItem("user", this.user);  
          localStorage.setItem("role", this.role);  
          return true;

        } else {
          throw new Error('No token found');
        }
      } catch (error) {
        console.log('登录失败:', error);
        return false;
      }
    },
    async logoutAction() {
      await logout();
      this.token = "";
      this.user = null;  
      this.role = null;  
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    },
    loadUser() {
      const storedUser = localStorage.getItem("user");
      const storedRole = localStorage.getItem("role");
      if (storedUser && storedRole) {
        this.user = storedUser; 
        this.role = storedRole;  
      }
    },
  },
});
