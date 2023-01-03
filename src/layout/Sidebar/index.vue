<template>
  <a-layout-sider class="sidebar" :style="sidebarStyle" :collapsed="collapsed" :trigger="null" width="210" collapsible>
    <Logo :collapsed="collapsed" />
    <a-menu theme="dark" mode="inline" v-model="menuSelected" :openKeys.sync="subMenuSelected" :inline-collapsed="collapsed">
      <!-- <a-menu-item>
        <a-icon :component="LoveSvg"></a-icon>
        <span>{{ '导入 SVG 示例' }}</span>
      </a-menu-item> -->
      <template v-for="item in menus">
        <a-menu-item v-if="isMenuItem(item)" :key="getMenu(item)?.name">
          <SidebarLink :to="getMenu(item)?.path">
            <a-icon v-if="getMenu(item)?.meta?.icon" :type="getMenu(item)?.meta?.icon"/>
            <span>{{ getMenu(item)?.meta?.title }}</span>
          </SidebarLink>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.name"></sub-menu>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import type { RouteConfig } from 'vue-router'
import { useRoute } from 'vue-router/composables'
import { useSidebarStore } from '@/stores/sidebar'
import { usePermissionStore } from '@/stores/permission'
import Logo from './Logo.vue'
import SubMenu from './SubMenu.vue'
import SidebarLink from './Link.vue'

const route = useRoute()

const collapsed = toRef(useSidebarStore(), 'collapsed')
const { menus } = usePermissionStore()
const menuSelected = ref<string[]>([])
const subMenuSelected = ref<string[]>([])

const sidebarStyle = {
  width: '210px',
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  left: 0,
  backgroundColor: '#001529'
}

function updateMenuStatus() {
  if (route?.name) {
    const { matched, name } = route!
    if (matched.length > 1) {
      const subMenus = matched.map(item => item.name!)
      subMenuSelected.value = subMenus.length ? subMenus : []
    }
    menuSelected.value = [name!]
  }
}

function isMenuItem(item: RouteConfig) {
  return !item.meta?.type || !item.children?.length
}

function getMenu(item: RouteConfig) {
  return (isMenuItem(item) ? item.children?.[0] : item)!
}

watchEffect(updateMenuStatus)
</script>

<style lang="scss" scoped>

</style>