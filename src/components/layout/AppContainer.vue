<template>
  <div :style="{'padding':hasPadding?paddingSize:'0px','background-color':background, minHeight: (bodyHeight-20)+'px' }" class="app-container">
    <slot />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppContainer',
  props: {
    hasPadding: {
      type: Boolean,
      default: false
    },
    paddingSize: {
      type: String,
      default: '0px'
    },
    background: {
      type: String,
      default: '#fff'
    }
  },
  computed: {
    ...mapGetters(['bodyHeight'])
  }
}
</script>

<style scoped>
  .noPadding{

  }
  .hasPadding{
    padding:10px 10px;
  }
</style>
