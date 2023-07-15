<template>
  <el-container :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <app-header id="app-header" class="app-header" />
    <el-main class="app-body">
      <!--侧边栏-->
      <sidebar class="sidebar-container" />
      <!--右半部分-->
      <div :class="{hasTagsView:needTagsView}" class="main-container">
        <!--开启固定头部设置-->
        <div v-if="fixedHeader">
          <!--导航(面包屑)-->
          <navbar v-if="breadcrumb" />
          <!--标签栏-->
          <tags-view v-if="needTagsView" />
          <!--主内容包裹在el-scrollbar中-->
          <el-scrollbar :style="{height:bodyHeight+'px'}" class="no-head-scrollbar">
            <app-main />
          </el-scrollbar>
        </div>
        <!--为开始固定头部设置-->
        <div v-else>
          <!--导航，tagsView都包裹在el-scrollbar中-->
          <el-scrollbar class="has-head-scrollbar">
            <navbar v-if="breadcrumb" />
            <tags-view v-if="needTagsView" />
            <app-main />
          </el-scrollbar>
        </div>
        <!--悬浮框-->
        <right-panel v-if="false">
          <settings />
        </right-panel>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppHeader, Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import TagsView from './components/TagsView/index'
import { mapState } from 'vuex'
import Settings from './components/Settings/index'

export default {
  name: 'Layout',
  components: {
    Settings,
    TagsView,
    AppHeader,
    Navbar,
    Sidebar,
    AppMain,
    RightPanel
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
      breadcrumb: state => state.settings.breadcrumb,
      bodyHeight: state => state.settings.bodyHeight
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  /*.el-scrollbar{*/
    /*height: calc(100vh - 50px);*/
  /*}*/
  .has-head-scrollbar{
    height: 100vh;
  }
</style>
