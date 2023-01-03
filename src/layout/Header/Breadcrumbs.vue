<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="item, index in breadcrumbs" :key="item.name">
      <router-link v-if="index <= breadcrumbs.length - 2" :to="item.path">
        {{ item.title }}
      </router-link>
      <template v-else>
        {{ item.title }}
      </template>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router/composables';

const route = useRoute()
const breadcrumbs = computed(() => route.matched?.map((item) => ({ title: item.meta?.title, name: item.name, path: item.path })).filter(item => item.title))
</script>