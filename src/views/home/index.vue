<template>
  <PageContainer>
    <h2>我是首页</h2>
    <a-button>hi</a-button><br>
    <router-link to="/about">去 关于</router-link><br>
    <router-link to="/system/account">去 账号管理</router-link><br>
    <router-link to="/level-menu/menu1/menu1-1/menu1-1-1">去 菜单1-1-1</router-link>
    <Menu />
    <p v-for="item in 100" :key="item">{{ item }}</p>
  </PageContainer>
</template>

<script setup lang="ts">
import Menu from './Menu.vue';
</script>
