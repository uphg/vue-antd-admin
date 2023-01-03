<script lang="ts">
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import type { PropType } from 'vue/types/v3-component-props'
import type { Component } from 'vue/types/umd'

const reLinkPrefix = /^(https?:|mailto:|tel:)/

export default defineComponent({
  name: 'SidebarLink',
  props: {
    to: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props, context) {
    const isExternalLink = computed(() => reLinkPrefix.test(props.to))
    const tag = computed(() => isExternalLink.value ? 'a' : RouterLink as Component)
    const linkProps = computed(() => isExternalLink.value
      ? { href: props.to, target: '_blank', rel: 'noopener'}
      : { to: props.to }
    )

    return () => h(tag.value, {
      props: linkProps.value
    }, [context.slots.default?.()])
  }
})
</script>