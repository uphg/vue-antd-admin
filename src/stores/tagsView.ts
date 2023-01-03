import { defineStore } from 'pinia'
import type { Ref } from 'vue'

export type TagsViewItem = {
  name: string,
  path: string,
  meta?: Record<string, string>,
}

type TagsViewStore = {
  visiteds: Ref<TagsViewItem[]>
  addVisiteds: (value: TagsViewItem) => void
  deleteVisiteds: (value: TagsViewItem) => void
  unVisited: (value: string | undefined) => boolean
}

export const useTagsViewStore = defineStore<string, TagsViewStore>('tagsView', () => {
  const visiteds = ref<TagsViewItem[]>([])
  const cached = ref<TagsViewItem[]>([])

  function addVisiteds(value: TagsViewItem) {
    unVisited(value?.name) && visiteds.value.push(value)
  }

  function deleteVisiteds(value: TagsViewItem) {
    let index = -1
    const length = visiteds.value.length
    while (++index < length) {
      const item = visiteds.value[index]
      if (item.name === value.name) {
        visiteds.value.splice(index, 1)
        return
      }
    }
  }

  function unVisited(value: string | undefined) {
    return !visiteds.value.find(item => item?.name === value)
  }

  return { visiteds, addVisiteds, deleteVisiteds, cached, unVisited }
})
