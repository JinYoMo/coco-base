<template>
  <app-container>
    <!--筛选条件-->
    <search-area size="small" @search="search">
      <!--<search-item>-->
      <!--<el-input v-model.trim="listQuery.keywords" size="small" placeholder="日志名称" clearable />-->
      <!--</search-item>-->
      <search-item>
        <el-date-picker
          v-model="listQuery.beginTime"
          type="datetime"
          size="small"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择开始时间"
        />
      </search-item>
      <search-item>
        <el-date-picker
          v-model="listQuery.endTime"
          type="datetime"
          size="small"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择结束时间"
        />
      </search-item>
      <template slot="btns">
        <el-button v-if="hasPerm('/sys/log/error/delLog')" class="filter-item" size="small" type="info" icon="el-icon-delete" @click="cleanAll">
          清空日志
        </el-button>
      </template>
    </search-area>
    <!--查询结果Table显示-->
    <normal-table :data="list" :total="total" :columns="columns" :query="listQuery" :list-loading="listLoading" @change="changePage">
      <template slot="columns">
        <el-table-column label="操作" width="70" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="detail(scope.row)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </template>
    </normal-table>
  </app-container>
</template>

<script>
import { getErrorLogList, getErrorLogDetail, delErrorLog } from '@/api/system/log'
export default {
  name: 'ListLog',
  data() {
    return {
      listQuery: {
        keywords: '', // 日志名称
        beginTime: '', // 开始时间
        endTime: '', // 结束时间
        logType: '异常日志', // 日志类型
        offset: 1,
        limit: 20,
        sort: '',
        order: ''
      },
      columns: [
        { text: '用户', value: 'userName', width: '150' },
        { text: '时间', value: 'createTime', width: '150' },
        { text: '详细信息', value: 'message' }
      ], // 显示列
      list: [], // 数据列表
      total: 0,
      listLoading: true // 列表加载状态
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 打开详情对话框
    detail(row) {
      getErrorLogDetail(row.id).then(res => {
        if (res.code === 200) {
          this.$alert(res.data, '详情', {
            confirmButtonText: '确定',
            customClass: 'log-info'
          })
        }
      })
    },
    // 清空日志
    cleanAll() {
      this.$confirm(
        '确定要清空全部异常日志吗？',
        '确认操作',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        delErrorLog(this.listQuery).then(response => {
          if (response.code === 200) {
            this.$message.success('删除成功')
            this.list = []
            this.total = 0
          }
        })
      })
    },
    // 查询数据
    search() {
      this.fetchData(false)
    },
    // 获取日志数据
    fetchData(isNowPage = true) {
      this.listLoading = true
      if (!isNowPage) { // 是否显示当前页，否则跳转第一页
        this.listQuery.offset = 1
      }
      getErrorLogList(this.listQuery).then(response => {
        this.list = response.data.rows
        this.total = parseInt(response.data.total)
        this.listLoading = false
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

<style rel="stylesheet/scss" lang="scss">
  .log-info{
    width:800px;
  }
</style>
