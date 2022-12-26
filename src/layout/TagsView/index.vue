<template>
  <div class="tags-view">
    <div ref="container" class="tags-view-container" @wheel.prevent="onScroll">
      <div
        :class="['tag-item', { active: route.name === item.name }]"
        v-for="item in visiteds" :key="item.name"
        :ref="(el) => updateActiveTag(el, item)"
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

const container = ref<HTMLElement | null>(null)
const activeEl = ref<HTMLElement | null>(null)

const route = useRoute()
const router = useRouter()
const TagsView = useTagsViewStore()
const { menus } = usePermissionStore()
const { visiteds } = toRefs(TagsView)

const { addVisiteds, deleteVisiteds } = TagsView

function onScroll(e: WheelEvent) {
  const delta = e?.deltaY
  const wrapper = container.value!
  wrapper.scrollLeft = wrapper.scrollLeft + delta / 4
}

function clickTag(item: TagsViewItem) {
  toggleLink(item)
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
  toggleLink(last ? last : menus[0])
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

function toggleLink(value: TagsViewItem | RouteConfig) {
  !isActiveRoute(value) && router.push({ path: value.path })
}

function isActiveRoute(value: TagsViewItem | RouteConfig | Route) {
  return value.name === route.name || value.path === route.path || (value as RouteConfig).redirect === route.path
}

function updateActiveTag(el: unknown, item: TagsViewItem) {
  if (item.name === route.name) {
    activeEl.value = el as HTMLElement
  }
}

function scrollToActiveTag() {
  const tag = activeEl.value!
  const wrap = container.value!
  const { scrollLeft, offsetWidth } = wrap || { scrollLeft: 0, offsetWidth: 0 }
  const { left: WrapLeft } = wrap.getBoundingClientRect()!
  const { left: tagLeft } = tag.getBoundingClientRect()!
  const toParentLeft = tagLeft - WrapLeft

  if (toParentLeft < 0) {
    wrap.scroll(scrollLeft + toParentLeft, 0)
  } else if (offsetWidth < toParentLeft) {
    wrap.scroll((scrollLeft + (toParentLeft - offsetWidth) + (tag?.offsetWidth || 0)), 0)
  }
}

function updateTagsView() {
  route.name && addVisiteds({
    name: route.name!,
    path: route.path,
    meta: JSON.parse(JSON.stringify(route.meta)),
  })
}

watch(toRef(route, 'name'), () => {
  updateTagsView()
  nextTick(scrollToActiveTag)
})

addCachedTags(menus)
updateTagsView()
</script>

<style lang="scss" scoped>
.tags-view {
  padding: 4px 12px;
  border-top: 1px solid #f1f0f5;
  border-bottom: 1px solid #f1f0f5;
  &-container {
    width: 100%;
    min-height: 28px;
    white-space: nowrap;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .tag-item {
    font-size: 13px;
    color: inherit;
    cursor: pointer;
    min-width: 80px;
    min-height: 28px;
    border-radius: 2px;
    padding: 4px 8px;
    background-color: #f4f5f5;
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