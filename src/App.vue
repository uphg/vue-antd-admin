<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { baseRoutes } from '@/router'
import { usePermissionStore } from './stores/permission'

const { setMenus } = usePermissionStore()
setMenus(baseRoutes)
</script>
