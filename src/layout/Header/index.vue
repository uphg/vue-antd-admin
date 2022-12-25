<template>
  <a-layout-header class="header">
    <div class="navbar">
      <a-icon
        class="sidebar-switch"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="changeSidebarSwitch"
      />
      <Breadcrumbs />
    </div>
    <TagsView />
  </a-layout-header>
</template>

<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import Breadcrumbs from './Breadcrumbs.vue'
import TagsView from '../TagsView/index.vue'

const sidebar = useSidebarStore()
const collapsed = toRef(sidebar, 'collapsed')

function changeSidebarSwitch() {
  sidebar.setCollapsed(sidebar.collapsed ? false : true)
}
</script>

<style lang="scss" scoped>
.header {
  padding: 0;
  height: auto;
  line-height: 1.5;
  background: transparent;
}
.navbar {
  height: 48px;
  padding: 0;
  display: flex;
  align-items: center;
  background-color: #fff;
}
.sidebar-switch {
  padding: 0 16px;
  height: 100%;
  display: inline-flex;
  align-items: center;
}
</style>