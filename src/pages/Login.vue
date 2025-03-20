<template>
    <div class="login-container">
      <LoginForm />
    </div>
</template>
  
  <script setup lang="ts">
  import LoginForm from '../components/LoginForm.vue';
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f5f5f5;
  }
  </style>
  