<template>
  <svg class="g-icon" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>