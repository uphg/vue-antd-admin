<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="item in breadcrumbs" :key="item.name">
      <router-link :to="item.path">
        {{ item.title }}
      </router-link>
    </a-breadcrumb-item>
    <!-- <a-breadcrumb-item><a href="">Application</a></a-breadcrumb-item>
    <a-breadcrumb-item>Center</a-breadcrumb-item> -->
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router/composables';

const route = useRoute()
console.log('route')
console.log(route)
const breadcrumbs = computed(() => route.matched?.map((item) => ({ title: item.meta?.title, name: item.name, path: item.path })).filter(item => item.title))
</script>