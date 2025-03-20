<template>
  <n-card title="用户登录" class="login-card">
    <n-form ref="formRef" :model="form" :rules="rules">
      <n-form-item label="用户名" path="username">
        <n-input v-model:value="form.username" placeholder="请输入用户名" />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input type="password" v-model:value="form.password" placeholder="请输入密码" />
      </n-form-item>
      <n-form-item label="身份">
        <n-radio-group v-model:value="form.role">
          <n-radio value="user">用户</n-radio>
          <n-radio value="admin">管理员</n-radio>
        </n-radio-group>
      </n-form-item>
      <n-button type="primary" block @click="handleLogin">登录</n-button>
    </n-form>
  </n-card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';
import { nextTick } from 'vue';

const authStore = useAuthStore();
const router = useRouter();
const message = useMessage();

const formRef = ref(null);
const form = reactive({
  username: '',
  password: '',
  role: 'user'
});

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};

const handleLogin = async () => {
  const success = await authStore.loginAction(form.username, form.password, form.role);
  console.log(success);
  if (success) {
    message.success('登录成功');
    nextTick(() => {
      // router.push(form.role === 'admin' ? '/admin' : '/user');
      router.push('/layout/home');
    });
    console.log("跳转成功");

  } else {
    message.error('用户名或密码错误');
  }
};
</script>

<style scoped>
.login-card {
  width: 400px;
  margin: 100px auto;
  padding: 20px;
}
</style>
