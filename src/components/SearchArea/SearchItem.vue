<template>
  <div class="search-item">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SearchItem',
  mounted() {
    // 如果没有子元素，则控制显示为none, 不占位
    const searchitem = this.$el
    if (searchitem.childNodes && searchitem.childNodes.length === 0) {
      searchitem.style.display = 'none'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .search-item{
    display: inline-block;
    margin-bottom:10px;
    vertical-align: top;
    box-sizing: inherit;
  }
  .search-item{
    margin-right: 5px;
  }
</style>
