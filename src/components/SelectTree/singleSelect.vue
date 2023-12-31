<!-- 树状选择器 -->
<template>
  <el-popover
    ref="popover"
    placement="bottom-start"
    trigger="click"
    class="select-tree scrollbar"
    @show="onShowPopover"
    @hide="onHidePopover"
  >
    <el-scrollbar wrap-style="overflow-x:hidden;" style="height:200px">
      <el-tree
        ref="tree"
        :style="`min-width: ${treeWidth}`"
        :data="data"
        :props="props"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        :default-expand-all="false"
        highlight-current
        accordion
        @node-click="onClickNode"
      />
    </el-scrollbar>
    <el-input
      slot="reference"
      ref="input"
      v-model="labelModel"
      :style="`width: ${width}px`"
      :class="{ 'rotate': showStatus }"
      :placeholder="placeholder"
      :disabled="disabled"
      clearable
      suffix-icon="el-icon-arrow-down"
    />
  </el-popover>
</template>

<script>
export default {
  name: 'SelectTree',
  // 设置绑定参数
  model: {
    prop: 'value',
    event: 'selected'
  },
  props: {
    // 接收绑定参数
    value: {
      type: String,
      default: ''
    },
    // 输入框宽度
    width: {
      type: String,
      default: ''
    },
    // 输入框宽度
    disabled: {
      type: Boolean,
      default: false
    },
    // 选项数据
    options: {
      type: Array,
      required: true
    },
    // 输入框占位符
    placeholder: {
      type: String,
      required: false,
      default: '请选择'
    },
    // 树节点配置选项
    props: {
      type: Object,
      required: false,
      default: () => ({
        parent: 'parentId',
        value: 'rowGuid',
        label: 'areaName',
        children: 'children'
      })
    }
  },
  data() {
    return {
      // 树状菜单显示状态
      showStatus: false,
      // 菜单宽度
      treeWidth: 'auto',
      // 输入框显示值
      labelModel: '',
      // 实际请求传值
      valueModel: '0'
    }
  },
  computed: {
    // 是否为树状结构数据
    dataType() {
      const jsonStr = JSON.stringify(this.options)
      return jsonStr.indexOf(this.props.children) !== -1
    },
    // 若非树状结构，则转化为树状结构数据
    data() {
      // return this.dataType ? this.options : this.switchTree()
      return this.options
    }
  },
  watch: {
    labelModel(val) {
      if (!val) {
        if (val === '') {
          this.valueModel = ''
          this.value = ''
          this.$emit('selected', this.valueModel)
        }
        this.valueModel = ''
      }
      this.$refs.tree.filter(val)
    },
    value(val) {
      this.labelModel = this.queryTree(this.data, val)
    }
  },
  created() {
    // 检测输入框原有值并显示对应 label
    if (this.value) {
      this.labelModel = this.queryTree(this.data, this.value)
    }
    // 获取输入框宽度同步至树状菜单宽度
    this.$nextTick(() => {
      this.treeWidth = `${(this.width || this.$refs.input.$refs.input.clientWidth) - 24}px`
    })
  },
  methods: {
    // 单击节点
    onClickNode(node) {
      this.labelModel = node[this.props.label]
      this.valueModel = node[this.props.value]
      this.onCloseTree()
    },
    // 偏平数组转化为树状层级结构
    switchTree() {
      return this.cleanChildren(this.buildTree(this.options, '0'))
    },
    // 隐藏树状菜单
    onCloseTree() {
      this.$refs.popover.showPopper = false
    },
    // 显示时触发
    onShowPopover() {
      this.showStatus = true
      this.$refs.tree.filter(false)
    },
    // 隐藏时触发
    onHidePopover() {
      this.showStatus = false
      this.$emit('selected', this.valueModel)
    },
    // 树节点过滤方法
    filterNode(query, data) {
      if (!query) return true
      return data[this.props.label].indexOf(query) !== -1
    },
    // 搜索树状数据中的 ID
    queryTree(tree, id) {
      let stark = []
      stark = stark.concat(tree)
      while (stark.length) {
        const temp = stark.shift()
        if (temp[this.props.children]) {
          stark = stark.concat(temp[this.props.children])
        }
        if (temp[this.props.value] === id) {
          return temp[this.props.label]
        }
      }
      return ''
    },
    // 将一维的扁平数组转换为多层级对象
    buildTree(data, id = '0') {
      const fa = (parentId) => {
        console.log('parentId:' + parentId)
        const temp = []
        for (let i = 0; i < data.length; i++) {
          const n = data[i]
          if (n[this.props.parent] === parentId) {
            n.children = fa(n.code)
            temp.push(n)
          }
        }
        return temp
      }
      return fa(id)
    },
    // 清除空 children项
    cleanChildren(data) {
      const fa = (list) => {
        list.map((e) => {
          if (e.children.length) {
            fa(e.children)
          } else {
            delete e.children
          }
          return e
        })
        return list
      }
      return fa(data)
    }
  }
}
</script>

<style lang="scss" scoped>
  .scrollbar {
    overflow-y: scroll;
    &::-webkit-scrollbar {
      z-index: 11;
      width: 6px;
    }
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-corner {
      background: #fff;
    }
    &::-webkit-scrollbar-thumb {
      // border-radius: 5px;
      width: 6px;
      background-color: #eee;
      &:hover {
        background-color: #ccc;
      }
    }
    &::-webkit-scrollbar-track-piece {
      background: #fff;
      width: 6px;
    }
  }
  .select-tree .el-tree {
    max-height: 350px;
  }
  .select-tree .el-input.el-input--suffix {
    cursor: pointer;
  }
  .select-tree .el-input.el-input--suffix.rotate .el-input__suffix {
    transform: rotate(180deg);
  }
</style>
