<template>
  <div id="app" v-resize="windowResize">
    <router-view />
  </div>
</template>

<script>
import { breadcrumb } from './settings'
import store from '@/store'
export default {
  name: 'App',
  mounted() {
    this.windowResize(window.innerHeight, window.innerWidth)
  },
  methods: {
    // 窗口变化
    windowResize(height, width) {
      // 查找header高度
      const el_header = document.getElementById('app-header')
      let bodyHeight = height - (el_header ? el_header.clientHeight : 56)
      if (store.getters.tagsView) {
        const el_tagsView = document.getElementById('tags-view-container')
        bodyHeight -= el_tagsView ? el_tagsView.clientHeight : 34
      }
      if (breadcrumb) {
        const el_navbar = document.getElementsByClassName('navbar')
        bodyHeight -= el_navbar ? el_navbar[0].clientHeight : 48
      }
      // 减去2个padding
      // bodyHeight -= 20
      store.dispatch('settings/ChangeHeight', bodyHeight)
    }
  }
}
</script>
