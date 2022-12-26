<template>
  <div class="tags-view">
    <div ref="container" class="tags-view-container" @wheel.prevent="onScroll">
      <!-- <div class="tag-item" v-for="item in 20" :key="item">
        <span class="text">{{ '标题' + item }}</span>
        <span class="close">
          <a-icon :component="CloseSvg"></a-icon>
        </span>
      </div> -->
      <div
        :class="['tag-item', { active: route.name === item.name }]"
        v-for="item in visiteds" :key="item.name"
        :to="item.path"
        @click="clickTag(item)"
      >
        <span class="text">{{ item.meta?.title }}</span>
        <span v-if="!item.meta?.affix" class="close" @click.stop="close(item)">
          <a-icon :component="CloseSvg"></a-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CloseSvg from './CloseSvg.vue';
import { usePermissionStore } from '@/stores/permission'
import { useTagsViewStore } from '@/stores/tagsView'
import { useRoute, useRouter } from 'vue-router/composables';
import type { TagsViewItem } from '@/stores/tagsView';
import type { Route, RouteConfig } from 'vue-router';

const route = useRoute()
const router = useRouter()
const TagsView = useTagsViewStore()
const { menus } = usePermissionStore()
const { visiteds } = toRefs(TagsView)
const container = ref<HTMLElement | null>(null)
const { addVisiteds, deleteVisiteds } = TagsView

function onScroll(e: WheelEvent) {
  const delta = e?.deltaY
  const wrapper = container.value!
  wrapper.scrollLeft = wrapper.scrollLeft + delta / 4
}

function clickTag(item: TagsViewItem) {
  RoutingJump(item)
}

function close(item: TagsViewItem) {
  const first = menus[0]
  // 在首页
  if (visiteds.value.length === 1 && (first.path === item.path || first.redirect === item.path)) return
  deleteVisiteds(item)
  route.name === item.name && toLastTag()
}

function toLastTag() {
  const list = visiteds.value
  const last = list[list.length - 1]
  RoutingJump(last ? last : menus[0])
}

function addCachedTags(data: RouteConfig[]) {
  data.forEach((item) => {
    !!item.meta?.affix && addVisiteds({
      name: item.name!,
      path: item.path,
      meta: JSON.parse(JSON.stringify(item.meta))
    })
    item.children && addCachedTags(item.children)
  })
}

function RoutingJump(value: TagsViewItem | RouteConfig) {
  !isActiveRoute(value) && router.push({ path: value.path })
}

function isActiveRoute(value: TagsViewItem | RouteConfig | Route) {
  return value.name === route.name || value.path === route.path || (value as RouteConfig).redirect === route.path
}

function updataTagsView() {
  route.name && addVisiteds({
    name: route.name!,
    path: route.path,
    meta: JSON.parse(JSON.stringify(route.meta)),
  })
}

watch(toRef(route, 'name'), updataTagsView)
addCachedTags(menus)
updataTagsView()
</script>

<style lang="scss" scoped>
.tags-view {
  padding: 4px 12px;
  border-top: 1px solid #f1f0f5;
  border-bottom: 1px solid #f1f0f5;
  &-container {
    white-space: nowrap;
    width: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    // &::-webkit-scrollbar {
    //   width: 6px;
    // }
    // &::-webkit-scrollbar-thumb {
    //   background-color: #0003;
    //   border-radius: 10px;
    //   transition: all .2s ease-in-out;
    // }

    // &::-webkit-scrollbar-track {
    //   border-radius: 10px;
    // }
  }
  .tag-item {
    cursor: pointer;
    min-width: 80px;
    min-height: 32px;
    padding: 4px 8px;
    background-color: #f4f6f8;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    &:not(:last-child) {
      margin-right: 8px;
    }
    &.active {
      color: #fff;
      background-color: #115dfc;
    }
    .text {
      max-width: 104px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .close {
      margin-left: 4px;
      width: 14px;
      height: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border-radius: 8px;
      & > .anticon & > svg {
        width: 10px;
        height: 10px;
      }
      &:hover {
        color: #fff;
        background-color: blue;
      }
    }
  }
}
</style>

<style lang="scss">
.tags-view {
  .tag-item {
    .close {
      .anticon svg {
        width: 10px;
        height: 10px;
      }
    }
  }
}
</style>