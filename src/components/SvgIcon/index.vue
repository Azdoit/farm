<script  setup>
import { computed } from "vue"

const props = defineProps({
  name: {
    type: String,
    require: true
  }
})

const symbolId = computed(() => `#icon-${props.name}`)
</script>

<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  font-size: 30px;
  fill: currentColor;
  overflow: hidden;
}
</style>
