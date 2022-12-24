<template>
  <PageContainer>
    <h2>我是首页</h2>
    <a-button>hi</a-button>
    <router-link to="/about">去 关于</router-link>
    <p v-for="item in 100" :key="item">{{ item }}</p>
  </PageContainer>
</template>
