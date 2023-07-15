<template>
  <div class="search-div">
    <div :class="{'search-left':type==='seperate', 'search-all':type==='default'}">
      <slot />
      <el-collapse-transition>
        <div v-if="needSearchMore && searchMoreType=='default'" v-show="searchMoreShow">
          <slot name="searchMore" />
        </div>
      </el-collapse-transition>
      <el-button v-if="type=='default'" :size="size" type="primary" class="search-btn" icon="el-icon-search" @click="search">
        搜索
      </el-button>
      <el-button v-if="type=='default' && needSearchMore" :size="size" type="primary" class="search-btn" icon="el-icon-magic-stick" @click="toggleSearchMore">
        高级检索
      </el-button>
      <el-button v-if="type=='default' && needClear" :size="size" type="warning" class="search-btn" icon="el-icon-delete" @click="clearInput">
        重置
      </el-button>
      <slot name="btns" />
    </div>
    <div v-if="type=='seperate'" class="search-right">
      <el-button :size="size" type="primary" icon="el-icon-search" class="search-btn" @click="search">
        搜索
      </el-button>
      <el-button v-if="needSearchMore" :size="size" type="primary" class="search-btn" icon="el-icon-magic-stick" @click="toggleSearchMore">
        高级检索
      </el-button>
      <el-button v-if="needClear" :size="size" type="warning" class="search-btn" icon="el-icon-delete" @click="clearInput">
        重置
      </el-button>
    </div>
    <!-- 弹出框式高级检索 -->
    <el-dialog v-if="needSearchMore && searchMoreType=='dialog'" :visible.sync="searchMoreShow" title="高级检索" append-to-body>
      <div>
        <slot name="searchMore" />
        <div slot="footer" class="dialog-footer">
          <el-button :size="size" type="primary" @click="dialogSearch">
            搜索
          </el-button>
          <el-button v-if="needClear" :size="size" type="" @click="dialogClearInput">
            重置
          </el-button>
          <el-button v-if="needSearchMore" :size="size" type="" @click="dialogCancel">
            取消
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SearchArea',
  props: {
    type: {
      type: String,
      default: 'default'
    }, // 显示类型，default表示正常连续显示，'seperate'表示两边分散显示
    needClear: {
      type: Boolean,
      default: false
    }, // 是否需要重置按钮
    needSearchMore: {
      type: Boolean,
      default: false
    }, // 是否需要高级检索
    searchMoreType: {
      type: String,
      default: 'default'
    }, // 高级检索的样式，default页面内，dialog弹窗
    size: {
      type: String,
      default: ''
    }// 按钮及输入框大小
  },
  data() {
    return {
      searchMoreShow: false
    }
  },
  methods: {
    search() {
      this.$emit('search')
    },
    clearInput() {
      this.$emit('clear')
    },
    toggleSearchMore() {
      this.searchMoreShow = !this.searchMoreShow
    },
    dialogSearch() {
      this.searchMoreShow = false
      this.search()
    },
    dialogClearInput() {
      this.searchMoreShow = false
      this.clearInput()
    },
    dialogCancel() {
      this.searchMoreShow = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .search-div{
    padding:12px;
    padding-bottom: 2px; /* 本身输入框有10px下边距*/
    background-color: #fff;
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content:space-between;
    .search-btn{
      margin-bottom:10px;
    }
  }
  .dialog-footer{
    margin-top: 10px;
    text-align: right;
  }
</style>
