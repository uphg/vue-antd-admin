<template>
  <a-layout-sider class="sidebar" :style="sidebarStyle" :collapsed="collapsed" :trigger="null" width="210" collapsible>
    <Logo :collapsed="collapsed" />
    <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
      <a-menu-item key="1">
        <a-icon :component="LoveSvg"></a-icon>
        <span>nav 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="video-camera" />
        <span>nav 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <a-icon type="upload" />
        <span>nav 3</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
import LoveSvg from './Love.vue'
import { useSidebarStore } from '@/stores/sidebar'

const collapsed = toRef(useSidebarStore(), 'collapsed')

const sidebarStyle = {
  width: '210px',
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  left: 0,
  backgroundColor: '#001529'
}
</script>

<style lang="scss" scoped>

</style>