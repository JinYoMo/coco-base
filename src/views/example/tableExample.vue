<template>
  <app-container>
    <search-area :need-clear="true" :need-search-more="true" type="seperate" size="small" search-more-type="default" @search="fetchData" @clear="clearInput">
      <!--一般查询条件-->
      <search-item>
        <el-input v-model.trim="listQuery.name" size="small" placeholder="姓名" clearable />
      </search-item>
      <search-item />
      <search-item>
        <el-select v-model="listQuery.sex" placeholder="性别" size="small" clearable>
          <el-option label="男" value="男" />
        </el-select>
      </search-item>
      <search-item>
        <el-date-picker
          v-model="timeRange"
          size="small"
          type="datetimerange"
          range-separator="至"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="创建开始时间"
          end-placeholder="创建结束时间"
        />
      </search-item>
      <!--高级检索-->
      <div slot="searchMore">
        <search-item>
          <el-input v-model.trim="listQuery.name" placeholder="姓名" clearable />
        </search-item>
        <search-item />
        <search-item>
          <el-select v-model="listQuery.sex" placeholder="性别" clearable>
            <el-option label="男" value="男" />
          </el-select>
        </search-item>
        <search-item>
          <el-date-picker
            v-model="timeRange"
            type="datetimerange"
            range-separator="至"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="创建开始时间"
            end-placeholder="创建结束时间"
          />
        </search-item>
      </div>
    </search-area>
    <normal-table :data="list" :head="tableOption.head" :query="listQuery" :total="total" :columns="columns" :list-loading="listLoading" :options="tableOption.options" :tools-option="tableOption.toolsOption" size="small" @change="changePage">
      <template slot="btns">
        <el-button size="small" class="edit_btn">
          添加
        </el-button>
        <el-button size="small" class="edit_btn">
          修改
        </el-button>
        <el-button size="small" class="edit_btn">
          删除
        </el-button>
      </template>
      <template slot="columns">
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.stop="goDetail(scope.row)">
              详情
            </el-button>
            <el-button type="text" size="small" @click.stop="edit(scope.row)">
              编辑
            </el-button>
            <el-button type="text" size="small" @click.stop="registerIris(scope.row)">
              采集
            </el-button>
          </template>
        </el-table-column>
      </template>
    </normal-table>
  </app-container>
</template>

<script>
import NormalTable from '@/components/NormalTable'
import AppContainer from '@/components/layout/AppContainer'
import SearchArea from '@/components/SearchArea/SearchArea'
import SearchItem from '@/components/SearchArea/SearchItem'
export default {
  name: 'TableExample',
  components: { SearchItem, SearchArea, AppContainer, NormalTable },
  data() {
    return {
      listQuery: {
        name: '', // 姓名
        sex: '', // 性别
        nation: '', // 民族
        collReason: '', // 采集原因
        cardType: '', // 证件类型
        idCardNo: '', // 证件号码
        personTag: '', // 人员标签
        startTime: '', // 创建开始时间
        endTime: '', // 创建结束时间
        offset: 1,
        limit: 20,
        sort: 'createTime',
        order: 'desc'
      }, // 筛选条件
      columns: [
        {
          text: '姓名',
          value: 'name',
          align: 'center'
        },
        {
          text: '性别',
          value: 'sexName',
          align: 'center',
          width: 60
        },
        {
          text: '民族',
          value: 'nationName',
          width: 50,
          align: 'center'
        },
        {
          text: '采集原因',
          value: 'collReasonName',
          align: 'center'
        },
        {
          text: '证件类型',
          value: 'cardTypeName',
          align: 'center',
          width: 80
        },
        {
          text: '证件号码',
          value: 'idCardNo',
          align: 'center'
        },
        {
          text: '户籍地址',
          value: 'residenceAddr',
          align: 'center'
        },
        {
          text: '创建时间',
          value: 'createTime',
          width: 120,
          align: 'center'
        }
      ], // 显示列
      timeRange: [], // 时间范围
      list: [], // 列表数据
      total: 0, // 数据总数
      listLoading: true, // 列表加载动画
      tableOption: {
        head: {
          show: true, // 是否需要标题栏，
          text: '数据列表' // 标题名称
        },
        options: {
          needIndex: false // 是否需要序号列
        },
        toolsOption: {
          selectColumns: false, // 是否需要筛选列
          refresh: false // 是否需要刷新按钮
        }
      } // 表格属性
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const that = this
      setTimeout(function() {
        that.list = [
          { name: '张三', sexName: '男', nationName: '汉族', collReasonName: '工作人员', cardTypeName: '身份证', idCardNo: '1101264987431551155', residenceAddr: '北京市' },
          { name: '张三', sexName: '男', nationName: '汉族', collReasonName: '工作人员', cardTypeName: '身份证', idCardNo: '1101264987431551155', residenceAddr: '北京市' },
          { name: '张三', sexName: '男', nationName: '汉族', collReasonName: '工作人员', cardTypeName: '身份证', idCardNo: '1101264987431551155', residenceAddr: '北京市' },
          { name: '张三', sexName: '男', nationName: '汉族', collReasonName: '工作人员', cardTypeName: '身份证', idCardNo: '1101264987431551155', residenceAddr: '北京市' },
          { name: '张三', sexName: '男', nationName: '汉族', collReasonName: '工作人员', cardTypeName: '身份证', idCardNo: '1101264987431551155', residenceAddr: '北京市' },
          { name: '张三', sexName: '男', nationName: '汉族', collReasonName: '工作人员', cardTypeName: '身份证', idCardNo: '1101264987431551155', residenceAddr: '北京市' },
          { name: '张三', sexName: '男', nationName: '汉族', collReasonName: '工作人员', cardTypeName: '身份证', idCardNo: '1101264987431551155', residenceAddr: '北京市' },
          { name: '张三', sexName: '男', nationName: '汉族', collReasonName: '工作人员', cardTypeName: '身份证', idCardNo: '1101264987431551155', residenceAddr: '北京市' },
          { name: '张三', sexName: '男', nationName: '汉族', collReasonName: '工作人员', cardTypeName: '身份证', idCardNo: '1101264987431551155', residenceAddr: '北京市' },
          { name: '张三', sexName: '男', nationName: '汉族', collReasonName: '工作人员', cardTypeName: '身份证', idCardNo: '1101264987431551155', residenceAddr: '北京市' },
          { name: '张三', sexName: '男', nationName: '汉族', collReasonName: '工作人员', cardTypeName: '身份证', idCardNo: '1101264987431551155', residenceAddr: '北京市' }
        ]
        that.total = 200
        that.listLoading = false
      }, 2000)
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
    },
    // 重置后的操作， 若不需要显示重置按钮则不需要写
    clearInput() {
      this.$message.success('clearInput')
    }
  }
}
</script>

<style scoped>

</style>
