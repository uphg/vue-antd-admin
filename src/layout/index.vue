<template>
  <a-layout class="layout">
    <Sidebar v-model="collapsed" />
    <a-layout :class="['layout-main', { 'is-hidden-sidebar': collapsed }]">
      <Header />
      <Content />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar/index.vue'
import Header from './Header/index.vue'
import Content from './Content.vue'
import { useSidebarStore } from '@/stores/sidebar'

const collapsed = toRef(useSidebarStore(), 'collapsed')
</script>

<style lang="scss" scoped>
.layout {
  background: #fff;
  min-height: 100vh;
}
.sidebar {
  width: 210px;
}

.layout-main {
  background-color: #fff;
  margin-left: 210px;
  transition: margin-left 0.2s;
  &.is-hidden-sidebar {
    margin-left: 80px;
  }
}

// .sidebar-switch {
//   color: #fff
// }
</style>