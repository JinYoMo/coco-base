<template>
  <app-container>
    <!--筛选条件-->
    <search-area size="small" @search="search">
      <search-item>
        <el-input v-model.trim="listQuery.keywords" size="small" placeholder="区域名称/编码" clearable />
      </search-item>
    </search-area>
    <!--查询结果Table显示-->
    <normal-table :data="list" :total="total" :query="listQuery" :list-loading="listLoading" @change="changePage">
      <template slot="btns">
        <el-button v-if="hasPerm('/area/add')" size="small" class="filter-item" icon="el-icon-plus" @click="add">
          新增
        </el-button>
      </template>
      <template slot="columns">
        <el-table-column v-for="column in columns" :key="column.value" :label="column.text" :width="column.width" :align="column.align" show-overflow-tooltip>
          <template slot-scope="scope">
            <span :class="column.class">{{ scope.row[column.value] }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="showOperate" label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button v-if="hasPerm('/area/update')" type="text" size="small" @click="edit(scope.row)">
              修改
            </el-button>
            <el-button v-if="hasPerm('/area/delete')" type="text" size="small" @click="del(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </template>
    </normal-table>
    <edit-area v-show="dialogFormVisible" ref="editarea" @watchChild="fetchData" />
  </app-container>
</template>

<script>
import { getAreaListPage, delArea } from '@/api/system/area'
import EditArea from './editArea'

export default {
  name: 'ListArea',
  components: { EditArea },
  data() {
    return {
      listQuery: {
        keywords: '',
        offset: 1,
        limit: 20,
        sort: '',
        order: ''
      }, // 筛选条件
      columns: [
        {
          text: '区域名称',
          value: 'name',
          align: 'center'
        },
        {
          text: '区域编码',
          value: 'id',
          align: 'center'
        },
        {
          text: '区域等级',
          value: 'levelName',
          align: 'center'
        },
        {
          text: '所属区域',
          value: 'pName',
          align: 'center'
        },
        {
          text: '区域排序',
          value: 'num',
          width: 80,
          align: 'center'
        }
      ], // 显示列
      list: [], // 列表数据
      total: 0, // 数据总数
      listLoading: true, // 加载动画
      fullscreenLoading: false, // 全屏加载动画
      dialogFormVisible: false // 是否显示编辑框
    }
  },
  computed: {
    'showOperate': function() { // 判断是否显示操作列，如果编辑和删除的权限都没有则不显示操作列
      return this.hasPerm('/area/update') || this.hasPerm('/area/delete')
    }
  },
  created() {
    this.fetchData()// 获取数据
  },
  activated() {
    console.log('activated')
    this.fetchData()// 获取数据
  },
  methods: {
    // 打开详情对话框
    detail(row) {
      this.$refs.detailwell.initDialog(true, row)
    },

    // 新增区域
    add() {
      this.dialogFormVisible = true
      this.$refs.editarea.initDialog('create')
    },
    // 编辑区域信息
    edit(row) {
      this.dialogFormVisible = true
      this.editShow = true
      this.$refs.editarea.initDialog('update', row)
    },
    // 删除区域
    del(row) {
      this.$confirm(
        '确定要删除区域吗？',
        '确认操作',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        delArea(row.id).then(response => {
          if (response.code === 200) {
            this.$message.success('删除成功')
            this.fetchData()
          }
        })
      })
    },
    // 查询数据
    search() {
      this.fetchData(false)
    },
    // 获取区域数据
    fetchData(isNowPage = true) {
      this.listLoading = true
      if (!isNowPage) { // 是否显示当前页，否则跳转第一页
        this.listQuery.offset = 1
      }
      getAreaListPage(this.listQuery).then(response => {
        if (response.code === 200) {
          this.list = response.data.rows
          this.total = parseInt(response.data.total)
          this.listLoading = false
        }
      })
    },
    // 页数发生变化后的操作，可能是页码变化，可能是每页容量变化，此函数必写
    changePage(val) {
      if (val && val.size) {
        this.listQuery.limit = val.size
      }
      if (val && val.page) {
        this.listQuery.offset = val.page
      }
      this.fetchData()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $tableTitleHeight:46px;
  .table{
    margin-bottom: 20px;
  }
  .pagination-container{
    margin-bottom: 50px;
  }
  .table-title{
    background-color:rgba(243, 243, 243, 1);
    height: $tableTitleHeight;
    .title-header{
      line-height:$tableTitleHeight;
      color: #606266;
      font-size: 15px;
      i{
        margin-left: 5px;
        margin-right: 5px;
      }
    }
  }
  .edit_btns{
    .edit_btn{
      float:right;
      margin:7px 3px;//为了需要居中显示margin-top和bottom要用$tableTitleHeight减去按钮原高度除以2
    }
  }
</style>
