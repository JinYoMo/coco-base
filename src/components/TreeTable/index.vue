<template>
  <el-table
    :data="formatData"
    v-bind="$attrs"
    :row-key="rowkey"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    default-expand-all
  >
    <el-table-column v-if="columns.length===0" width="150" type="expand">
      <template slot-scope="scope">
        {{ scope.$index }}
      </template>
    </el-table-column>
    <el-table-column
      v-for="column in columns"
      v-else
      :key="column.value"
      :label="column.text"
      :width="column.width"
    >
      <template slot-scope="scope">
        {{ scope.row[column.value] }}
      </template>
    </el-table-column>
    <slot />
  </el-table>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-13:59
*/
// import treeToArray from './eval'
export default {
  name: 'TreeTable',
  props: {
    /* eslint-disable */
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: true
    },
    rowkey:{
      type:String,
      required: true
    },
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      // let tmp
      // if (!Array.isArray(this.data)) {
      //   tmp = [this.data]
      // } else {
      //   tmp = this.data
      // }
      // for(const item of tmp){
      //   this.expandRowKeys.push(item.id)
      // }
      return this.data
    }
  },
  methods: {
    // showRow: function(row) {
    //   const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
    //   row.row._show = show
    //   return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
    // },
    // // 切换下级是否展开
    // toggleExpanded: function(trIndex) {
    //   const record = this.formatData[trIndex]
    //   record._expanded = !record._expanded
    // },
    // // 图标显示
    // iconShow(index, record) {
    //   return (index === 0 && record.children && record.children.length > 0)
    // }
  }
}
</script>
<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @-webkit-keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
  $color-blue: #2196F3;
  $space-width: 18px;
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;
    &::before {
      content: ""
    }
  }
  .processContainer{
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }

  .tree-ctrl{
    position: relative;
    cursor: pointer;
    color: $color-blue;
    margin-left: -$space-width;
  }
</style>
