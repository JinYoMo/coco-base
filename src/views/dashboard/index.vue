<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      欢迎您，{{ name }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roleNames',
      'roleTips',
      'wellTypes',
      'deviceTypes',
      'communications',
      'area'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
