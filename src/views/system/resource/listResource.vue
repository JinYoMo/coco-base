<template>
  <app-container>
    <!--筛选条件-->
    <search-area size="small" @search="search">
      <search-item>
        <el-input v-model.trim="listQuery.resourceName" size="small" placeholder="资源名称" clearable />
      </search-item>
      <search-item>
        <el-input v-model="listQuery.resourceUrl" size="small" placeholder="资源路径" clearable />
      </search-item>
      <search-item>
        <el-select v-model="listQuery.resourceType" size="small" placeholder="资源类型" clearable>
          <el-option
            v-for="item in resourceTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </search-item>
    </search-area>
    <!--查询结果Table显示-->
    <tree-table :data="list" :columns="columns" :query="listQuery" :list-loading="listLoading" rowkey="id">
      <!--右上角按钮-->
      <template slot="btns">
        <el-button v-if="hasPerm('/sys/resource/add')" size="small" class="filter-item" icon="el-icon-plus" @click="add">
          新增
        </el-button>
      </template>
      <!--行-->
      <template slot="columns">
        <el-table-column v-if="showOperate" label="操作" width="110" align="center">
          <template slot-scope="scope">
            <el-button v-if="hasPerm('/sys/resource/update')" type="text" size="small" @click="edit(scope.row)">
              修改
            </el-button>
            <el-button v-if="hasPerm('/sys/resource/delete')" type="text" size="small" @click="del(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </template>
    </tree-table>
    <!--编辑资源的对话框-->
    <edit-resource ref="editResource" @watchChild="fetchData" />
  </app-container>
</template>

<script>

import treeTable from '@/components/TreeTable/treeTable'
import editResource from '@/views/system/resource/editResource'
import { getResourceList, getResourceTypeList, delResource } from '@/api/system/resource'
import { toTreeList } from '@/utils/structure'

export default {
  name: 'ListResource',
  components: { treeTable, editResource },
  data() {
    return {
      listQuery: {
        resourceName: '', // 资源名称
        resourceUrl: '', // 资源路径
        resourceType: '' // 资源类型
      }, // 查询条件
      columns: [
        { text: '资源名称', value: 'name', type: 'expand', align: 'left' },
        { text: '资源编号', value: 'code' },
        { text: '父资源编号', value: 'pCode' },
        { text: '资源路径', value: 'url' },
        { text: '排序', value: 'num', width: 50 },
        { text: '层级', value: 'levels', width: 50 },
        { text: '资源类型', value: 'resourceTypeName', width: 80 }
        // { text: '状态', value: 'status', width: 70 }
      ], // 动态加载的表头
      list: [], // 资源数据列表
      listLoading: true, // 列表加载动画是否显示
      resourceTypeList: [
        { value: '02', name: '系统' },
        { value: '03', name: '菜单' },
        { value: '04', name: '按钮' }
      ], // 资源类型
      dialogFormVisible: false, // 对话框是否可见
      dialogStatus: '' // 对话框状态
    }
  },
  computed: {
    'showOperate': function() { // 判断是否显示操作列，如果编辑和删除的权限都没有则不显示操作列
      return this.hasPerm('/sys/resource/update') || this.hasPerm('/sys/resource/delete')
    }
  },
  created() {
    this.fetchResourceType()
    this.fetchData()
  },
  methods: {
    add() {
      this.dialogStatus = 'create'
      // this.dialogFormVisible = true
      this.$refs.editResource.initDialog(this.dialogStatus)
    },
    edit(row) {
      this.dialogStatus = 'update'
      // this.dialogFormVisible = true
      this.$refs.editResource.initDialog(this.dialogStatus, row)
    },
    del(row) {
      this.$confirm(
        '确定要删除' + row.name + '吗？',
        '确认删除',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        delResource(row.id).then(response => {
          if (response.code === 200) {
            this.$message.success('删除成功')
            this.fetchData()
          }
        })
      })
    },
    search() {
      this.fetchData()
    },
    // 获取数据
    fetchData() {
      this.listLoading = true
      getResourceList(this.listQuery).then(response => {
        this.list = toTreeList(response.data, '0', false)
        this.listLoading = false
      })
    },
    // 加载资源类型列表
    fetchResourceType() {
      getResourceTypeList(this.listQuery).then(response => {
        if (response.data) {
          this.resourceTypeList = response.data
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .treetable{
    margin-bottom: 50px;
  }
</style>
