<template>
  <div v-show="showDeptSelect" class="dept-select">
    <select-tree v-if="multiData" v-model="selected" :size="size" :options="deptTreeList" :props="defaultProps" :disabled="disabled" :placeholder="placeholder" clearable />
    <el-select v-else v-model="selected" :placeholder="placeholder" :disabled="disabled" clearable>
      <el-option
        v-for="item in deptTreeList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
  </div>
</template>

<script>
import { judgeTree, toTreeList } from '@/utils/structure'
import SelectTree from '@/components/SelectTree/singleSelect'
import { getDeptTreeList } from '@/api/system/dept'
export default {
  name: 'DeptSelect',
  components: {
    SelectTree
  },
  props: {
    // 数据绑定
    value: {
      type: [Number, String],
      default: ''
    }, // 输入
    placeholder: {
      type: String,
      default: '请选择父级'
    }, // 占位符
    needTop: {
      type: Boolean,
      default: true
    }, // 是否需要显示顶级
    deptType: {
      type: String,
      default: ''
    }, // 显示的下拉组织类型：公司/部门
    disabled: {
      type: Boolean,
      default: false
    }, // 是否禁用
    deptShow: {
      type: Boolean,
      default: false
    }, // 是否强制显示部门下拉列表
    size: {
      type: String,
      default: ''
    } // 输入框大小
  }, // 接收绑定参数
  data() {
    return {
      originList: [], // 原始数据
      deptTreeList: [],
      multiData: false, // 是否是多级数据，多级使用select-tree控件
      defaultProps: {
        parent: 'pid',
        value: 'id',
        label: 'name',
        children: 'children'
      },
      showDeptSelect: true // 是否显示该组件
    }
  },
  computed: {
    selected: {
      get: function() {
        return '' + this.value
      },
      set: function(val) {
        console.log('watch selected:' + val)
        this.$emit('input', val)
        this.$emit('change')
      }
    }
  },
  mounted() {
    this.fetchPcode()
  },
  methods: {
    // 加载父组织树形下拉菜单
    fetchPcode: function() {
      let listQuery = {}
      if (this.deptType !== '') {
        listQuery = {
          deptType: this.deptType
        }
      }
      getDeptTreeList(listQuery).then(response => {
        const list = response.data
        this.originList = [...response.data]
        // 如果deptShow 为false 并且 列表的长度小于1 不显示
        if (!this.deptShow && list.length <= 1) {
          this.showDeptSelect = false
        } else {
          // 如果有数据
          if (list) {
            // 如果有必要转树,使用selectTree控件
            if (judgeTree(list)) {
              this.multiData = true
              this.deptTreeList = toTreeList(response.data, '0', this.needTop)
              // 如果不需要顶级,将顶级去掉
              if (!this.needTop && this.deptTreeList.length === 1) {
                this.deptTreeList = this.deptTreeList[0].children
              }
            } else { // 否则不需要转树，直接使用el-select控件
              this.deptTreeList = list
              this.multiData = false
            }
          }
        }
      })
    },
    // 获取列表
    fetchDeptTree() {
      return this.originList
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-select{
    width: 100%;
  }
</style>
