<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <div>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" :key="key" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" :key="key" />
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      if (this.$route.meta.keepAlive) {
        return this.$route.name !== undefined ? this.$route.name : this.$route
      } else {
        return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date()
      }
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  /*min-height: calc(100vh - 50px);*/
  position: relative;
  overflow: hidden;
}
</style>
