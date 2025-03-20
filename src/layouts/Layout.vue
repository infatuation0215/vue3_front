<template>
    <n-layout has-sider>
        <n-layout-sider width="200px">
            <n-menu :options="menuOptions" v-model:selected="selectedKey" @update:value="handleMenuSelect" />
        </n-layout-sider>
        <n-layout-content>
            <RouterView />
        </n-layout-content>
    </n-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter , useRoute, RouterView } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

// 定义不同角色的菜单项
const userMenu = [
    { label: '首页', key: '/layout/home' },
];

const adminMenu = [
    { label: '首页', key: '/layout/home' },
    { label: '管理', key: '/layout/admin' },
];

// 计算当前角色的菜单
const menuOptions = computed(() => authStore.role === 'admin' ? adminMenu : userMenu);

// 选中的菜单项（默认首页）
const selectedKey = ref(route.path);
console.log(route.path)

const handleMenuSelect = (key: string) => {
  selectedKey.value = key; 
  console.log("key已更新")
  router.push(key); 
};
// 组件加载时，根据当前路由设置默认选中项
onMounted(() => {
    selectedKey.value =  route.path;
});
</script>