<!--业务日志-->
<template>
  <app-container>
    <!--筛选条件-->
    <search-area size="small" @search="search">
      <search-item>
        <el-input v-model.trim="listQuery.keywords" size="small" placeholder="日志名称" clearable />
      </search-item>
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
        <el-button v-if="hasPerm('/sys/log/biz/delLog')" class="filter-item" size="small" type="info" icon="el-icon-delete" @click="cleanAll">
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
import { getBizLogList, getBizLogDetail, getLogType, delLog } from '@/api/system/log'
export default {
  name: 'ListLog',
  data() {
    return {
      listQuery: {
        keywords: '',
        beginTime: '',
        endTime: '',
        // logType: '业务日志',
        offset: 1,
        limit: 20,
        sort: '',
        order: ''
      },
      columns: [
        {
          text: '日志名称',
          value: 'logName',
          width: 150
        },
        {
          text: '用户',
          value: 'userName'
        },
        {
          text: '时间',
          value: 'createTime'
        },
        {
          text: '详细信息',
          value: 'message'
        }
      ],
      list: [],
      total: 20,
      logTypeList: null,
      listLoading: true,
      dialogFormVisible: false,
      dialogStatus: ''
    }
  },
  created() {
    // this.fetchLogType()
    this.fetchData()
  },
  methods: {
    // 打开详情对话框
    detail(row) {
      getBizLogDetail(row.id).then(res => {
        if (res.code === 200) {
          this.$alert(res.data, '详情', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    // 清空日志
    cleanAll() {
      this.$confirm(
        '确定要清空全部日志吗？',
        '确认操作',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        delLog(this.query).then(response => {
          if (response.code === 200) {
            this.$message.success('删除成功')
            this.list = null
            this.total = 0
            // this.fetchData()
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
      getBizLogList(this.listQuery).then(response => {
        this.list = response.data.rows
        this.total = parseInt(response.data.total)
        this.listLoading = false
      })
    },
    // 获取日志类型
    fetchLogType() {
      getLogType(this.listQuery).then(response => {
        this.logTypeList = response.data
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
  .table{
    margin-bottom: 20px;
  }
  .pagination-container{
    margin-bottom: 50px;
  }
</style>
