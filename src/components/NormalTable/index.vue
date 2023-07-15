<template>
  <div class="table-container" :style="{'border-width':options.border?'12px !important':'0px !important'}">
    <div>
      <el-row v-if="head.show" class="table-title">
        <el-col :span="6">
          <div class="title-header">
            <el-popover
              v-if="toolsOption.selectColumns"
              v-model="visible"
              placement="bottom-start"
              trigger="click"
            >
              <div class="popper-div">
                <div v-for="(column,index) in columnsChecked" :key="index">
                  <el-checkbox v-model="column.show">
                    {{ column.text }}
                  </el-checkbox>
                </div>
                <div class="popper-btns">
                  <el-button size="mini" type="" @click="initColumnsState">
                    取消
                  </el-button>
                  <el-button size="mini" type="primary" @click="changeColumns">
                    确定
                  </el-button>
                </div>
              </div>
              <i slot="reference" ref="icon" :class="animateClass" class="el-icon-menu" @mouseenter="iconRotate" @mouseleave="removeAnimateClass" />
            </el-popover>
            <i v-else class="el-icon-menu" />
            {{ head.text }}
          </div>
        </el-col>
        <el-col :span="18" class="edit_btns">
          <slot name="btns" />
        </el-col>
      </el-row>
      <!--工具栏-->
      <el-row class="tool" type="flex" justify="right">
        <el-col>
          <el-button-group style="float: right">
            <!--显示列筛选工具-->
            <el-popover
              v-if="toolsOption.selectColumns"
              v-model="visible"
              placement="bottom-end"
              trigger="click"
            >
              <div class="popper-div">
                <div v-for="(column,index) in columnsChecked" :key="index">
                  <el-checkbox v-model="column.show">
                    {{ column.text }}
                  </el-checkbox>
                </div>
                <div class="popper-btns">
                  <el-button size="mini" type="" @click="initColumnsState">
                    取消
                  </el-button>
                  <el-button size="mini" type="primary" @click="changeColumns">
                    确定
                  </el-button>
                </div>
              </div>
              <el-button slot="reference" type="" icon="el-icon-menu" size="mini" />
            </el-popover>
            <!--刷新按钮-->
            <el-button v-if="toolsOption.refresh" type="" icon="el-icon-refresh" size="mini" @click="refresh" />
          </el-button-group>
        </el-col>
      </el-row>
      <!-- 表格正文-->
      <el-table v-loading="listLoading" :data="data" :size="size" class="table" row-class-name="small-row-class" border @selection-change="selectionChange" @row-click="rowClick">
        <!--需要加在表最前方的插槽-->
        <slot name="preColumns" />
        <!--序号列-->
        <el-table-column v-if="options && options.needIndex" :index="indexMethod" label="#" align="center" type="index" />
        <!--内容列, 若columns存在且长度大于0-->
        <template v-if="columnsFiltered && columnsFiltered.length>0">
          <el-table-column
            v-for="column in columnsFiltered"
            :key="column.value"
            :label="column.text"
            :width="column.width"
            :align="column.align?column.align:'center'"
            :show-overflow-tooltip="column.showOverflow?column.showOverflow:true"
          >
            <template slot-scope="scope">
              <span>{{ scope.row[column.value] }}</span>
            </template>
          </el-table-column>
        </template>
        <!--自定义的放这里-->
        <slot name="columns" />
      </el-table>
    </div>
    <!--分页-->
    <div v-show="pagination" class="pagination-container">
      <el-pagination
        :current-page="query.offset"
        :page-sizes="pageSizes"
        :page-size="query.limit"
        :total="total"
        align="center"
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NormalTable',
  props: {
    query: {
      type: Object,
      default: function() {
        return {
          offset: 1,
          limit: 20
        }
      }
    }, // 查询条件，此处主要需要分页的条件
    head: {
      type: Object,
      default: function() {
        return {
          show: true,
          text: '数据列表'
        }
      }
    }, // 是否显示头，一般需要再此行中加按钮需要设置为true
    listLoading: {
      type: Boolean,
      default: false
    }, // loading状态
    data: {
      type: Array,
      default: function() {
        return []
      }
    }, // 数据
    total: {
      type: Number,
      default: 0
    }, // 数据总数
    columns: {
      type: Array,
      default: function() {
        return []
      }
    }, // 列
    pagination: {
      type: Boolean,
      default: true
    }, // 是否分页
    options: {
      type: Object,
      default: function() {
        return {
          needIndex: true, // 是否需要序号列
          border: true // 是否需要上方边框
        }
      }
    }, // 配置项
    pageSizes: {
      type: Array,
      default: function() {
        return [10, 20, 30]
      }
    },
    size: {
      type: String,
      default: 'small'
    }, // 表格大小，默认，small,mini等，与el-table条件仙童
    toolsOption: {
      type: Object,
      default: function() {
        return {
          selectColumns: false, // 是否需要筛选列工具
          refresh: false // 是否需要刷新按钮
        }
      }
    }// 表格工具配置
  },
  data() {
    return {
      columnsFiltered: [], // 过滤后的列情况
      columnsChecked: [], // 显示列选择情况
      visible: false, // 弹窗显示情况
      animateClass: '' // 按钮动画效果
    }
  },
  watch: {
    columns(val) {
      this.initColumnsState()
      this.changeColumns()
    }
  },
  created() {
    // 初始化状态值为全部显示
    this.initColumnsState()
    this.changeColumns()
  },
  methods: {
    // 初始化显示列状态
    initColumnsState() {
      this.columnsChecked = []
      for (const column of this.columns) {
        if (column.show === false) {
          this.columnsChecked.push({ text: column.text, show: false })
        } else {
          this.columnsChecked.push({ text: column.text, show: true })
        }
      }
      this.visible = false
    },
    // 修改显示列
    changeColumns() {
      this.columnsFiltered = []
      for (const i in this.columns) {
        if (this.columnsChecked[i].show === true) {
          this.columnsFiltered.push(this.columns[i])
        }
      }
      this.visible = false
    },
    // 序号计算
    indexMethod(index) {
      return this.query.limit * (this.query.offset - 1) + index + 1
    },
    // 刷新
    refresh() {
      this.$emit('change')
    },
    // 改变页容量
    handleSizeChange(val) {
      this.query.limit = val
      this.$emit('change', { size: val })
    },
    // 改变当前页
    handleCurrentChange(val) {
      this.query.offset = val
      this.$emit('change', { page: val })
    },
    // 按钮旋转动画
    iconRotate() {
      this.animateClass = 'animated swing'
    },
    // 移除动画
    removeAnimateClass() {
      this.animateClass = ''
    },
    selectionChange(selection) {
      this.$emit('selectionChange', selection)
    },
    rowClick(row, column, event) {
      this.$emit('row-click', row)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .table{
    margin-bottom: 20px;
  }
  .pagination-container{
    padding-bottom: 50px;
  }
  .table-title{
    /*background-color:rgba(243, 243, 243, 1);*/
    background-color:#fff;
    .title-header{
      font-size: 15px;
      i{
        margin-left: 10px;
        margin-right: 5px;
      }
      i:focus{
        outline: none;
      }
    }
  }
  .edit_btns{
    padding-top:7px;
    padding-right:5px;
    text-align: right;
  }
  .popper-div{
    line-height: 1.5;
    .popper-btns{
      margin-top:10px;
    }
  }

</style>

