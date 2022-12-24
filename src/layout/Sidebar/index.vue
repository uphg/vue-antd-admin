<template>
  <a-layout-sider class="sidebar" :style="sidebarStyle" :collapsed="collapsed" :trigger="null" width="210" collapsible>
    <Logo :collapsed="collapsed" />
    <a-menu theme="dark" mode="inline" v-model="menuSelected" :openKeys.sync="subMenuSelected">
      <!-- <a-menu-item>
        <a-icon :component="LoveSvg"></a-icon>
        <span>{{ '首页' }}</span>
      </a-menu-item> -->
      <template v-for="item, index in menus">
        <a-menu-item v-if="item?.type === 1" :key="handleItem(item)?.name">
          <SidebarLink :to="handleItem(item)?.path">
            <a-icon v-if="handleItem(item)?.meta?.icon" :type="handleItem(item)?.meta?.icon"/>
            <span>{{ handleItem(item)?.meta?.title }}</span>
          </SidebarLink>
        </a-menu-item>
        <SubMenu v-else :menu-info="item" :key="item.name"></SubMenu>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
import LoveSvg from './Love.vue'
import { useSidebarStore } from '@/stores/sidebar'
import { usePermissionStore } from '@/stores/permission';
import SubMenu from './SubMenu.vue';
import SidebarLink from './Link.vue'
import type { RouteConfig } from 'vue-router';
import { useRoute } from 'vue-router/composables'

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



function handleItem(item: RouteConfig) {
  return (item as RouteConfig & { type: number }).type === 1 ? item.children?.[0] : item
}

function updateMenuStatus() {
  if (route?.name) {
    const { matched, name } = route!
    if (matched.length > 1) {
      const subMenus = matched.slice(0, matched.length - 1).map(item => item.name!)
      subMenuSelected.value = subMenus.length ? subMenus : []
    }
    menuSelected.value = [name!]
  }
}

watchEffect(() => {
  updateMenuStatus()
})
</script>

<style lang="scss" scoped>

</style>