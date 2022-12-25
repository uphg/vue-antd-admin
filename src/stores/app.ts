import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const name = ref('')
  function setName(value: string) {
    name.value = value
  }
  return { name, setName }
})
