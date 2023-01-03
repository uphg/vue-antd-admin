<template>
  <a-sub-menu :key="menuInfo?.name" v-bind="$props" v-on="$listeners">
    <span slot="title">
      <a-icon v-if="menuInfo.meta?.icon" :type="menuInfo.meta.icon" /><span>{{ menuInfo.meta?.title }}</span>
    </span>
    <template v-for="item in menuInfo?.children">
      <a-menu-item v-if="!item.children?.length" :key="item.name">
        <SidebarLink :to="item.path">
          <a-icon v-if="item.meta?.icon" :type="item.meta.icon"/>
          <span>{{ item.meta?.title }}</span>
        </SidebarLink>
      </a-menu-item>
      <sub-menu v-else :key="item?.name" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import { Menu } from 'ant-design-vue';
import SidebarLink from './Link.vue'
import type { ASubMenu } from './types'

export default defineComponent({
  name: 'SubMenu',
  components: { SidebarLink },
  isSubMenu: true,
  props: {
    ...(Menu.SubMenu as unknown as ASubMenu).props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  }
})
</script>