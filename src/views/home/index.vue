<template>
  <PageContainer>
    <h2>我是首页</h2>
    <a-button>hi</a-button>
    <p v-for="item in 100" :key="item">{{ item }}</p>
  </PageContainer>
</template>
