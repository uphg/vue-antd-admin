import { defineStore } from 'pinia'
import type { Ref } from 'vue'

export type TagsViewItem = {
  name: string,
  path: string,
  meta?: Record<string, string>
}

type TagsViewStore = {
  visiteds: Ref<TagsViewItem[]>
  cached: Ref<TagsViewItem[]>
  setVisiteds: (value: TagsViewItem[]) => void
  addVisiteds: (value: TagsViewItem) => void
  setCached: (value: TagsViewItem[]) => void
  unVisited: (value: string) => boolean
}

export const useTagsViewStore = defineStore<string, TagsViewStore>('app', () => {
  const visiteds = ref<TagsViewItem[]>([])
  const cached = ref<TagsViewItem[]>([])
  function addVisiteds(value: TagsViewItem) {
    visiteds.value.push(value)
  }
  function setVisiteds(value: TagsViewItem[]) {
    visiteds.value = value
  }
  function setCached(value: TagsViewItem[]) {
    cached.value = value
  }
  function unVisited(value: string) {
    return !visiteds.value.find(item => item?.name === value)
  }
  return { visiteds, addVisiteds, setVisiteds, cached, setCached, unVisited }
})
