<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { navRoutes } from '@/router/nav-routes';
import { usePermissionStore } from './stores/permission';

const { setMenus } = usePermissionStore()
setMenus(navRoutes)
</script>
