<script lang="ts">
import type { PropType } from 'vue/types/v3-component-props';
import { h } from 'vue';
import type { Component } from 'vue/types/umd';
import { RouterLink } from 'vue-router';

export default defineComponent({
  name: 'SidebarLink',
  props: {
    to: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props, context) {
    const isExternal = computed(() => /^(https?:|mailto:|tel:)/.test(props.to))
    const tag = computed(() => isExternal.value ? 'a' : RouterLink as Component)
    const linkProps = computed(() => isExternal.value
      ? { href: props.to, target: '_blank', rel: 'noopener'}
      : { to: props.to }
    )

    return () => h(tag.value, {
      props: linkProps.value
    }, [context.slots.default?.()])
  }
})
</script>