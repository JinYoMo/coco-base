<template>
  <app-container>
    <!--筛选条件-->
    <search-area size="small" @search="search">
      <search-item>
        <el-input v-model.trim="listQuery.keyword" size="small" placeholder="角色名称" clearable />
      </search-item>
    </search-area>
    <!--查询结果Table显示-->
    <tree-table :data="list" :columns="columns" :query="listQuery" :list-loading="listLoading" rowkey="id">
      <template slot="btns">
        <el-button v-if="hasPerm('/sys/role/add')" size="small" icon="el-icon-plus" @click="add">
          新增
        </el-button>
      </template>
      <template slot="columns">
        <el-table-column v-if="showOperate" label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-button v-if="hasPerm('/sys/role/update')" type="text" size="small" @click="edit(scope.row)">
              修改
            </el-button>
            <el-button v-if="hasPerm('/sys/role/delete')" type="text" size="small" @click="del(scope.row)">
              删除
            </el-button>
            <el-button v-if="hasPerm('/sys/role/funcAuthor')" type="text" size="small" @click="funcPermission(scope.row)">
              功能权限
            </el-button>
            <el-button v-if="hasPerm('/sys/role/dataAuthor')" type="text" size="small" @click="dataPermission(scope.row)">
              数据权限
            </el-button>
          </template>
        </el-table-column>
      </template>
    </tree-table>
    <!--编辑资源的对话框-->
    <edit-role v-show="editShow" ref="editrole" @watchChild="fetchData" />
    <!--功能权限-->
    <function-perm v-show="functionShow" ref="funcperm" />
    <!--数据权限-->
    <data-perm v-show="dataShow" ref="dataperm" />
  </app-container>
</template>

<script>

import treeTable from '@/components/TreeTable/treeTable'
import editRole from '@/views/system/role/editRole'
import functionPerm from '@/views/system/role/functionPerm'
import dataPerm from '@/views/system/role/dataPerm'
import { getRoleList, delRole } from '@/api/system/role'
import { toTreeList } from '@/utils/structure'

export default {
  name: 'ListRole',
  components: {
    treeTable,
    functionPerm,
    dataPerm,
    editRole
  },
  data() {
    return {
      listQuery: {
        keyword: ''
      },
      columns: [
        { text: '角色名称', value: 'name', align: 'left' },
        { text: '所在组织机构', value: 'deptName', width: 150 },
        { text: '排序', value: 'num', width: 50 },
        { text: '别名', value: 'tips' }
      ],
      list: [],
      listLoading: true,
      dialogFormVisible: false,
      dialogStatus: '',
      functionShow: false, // 功能权限配置是否启用
      dataShow: false, // 数据权限配置是否启用
      editShow: false // 编辑角色权限是否启用
    }
  },
  computed: {
    'showOperate': function() { // 判断是否显示操作列，如果编辑和删除的权限都没有则不显示操作列
      return this.hasPerm('/sys/role/update') || this.hasPerm('/sys/role/delete') || this.hasPerm('/role/funcPerm') || this.hasPerm('/role/dataPerm')
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    add() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.editShow = true
      this.$refs.editrole.initDialog(this.dialogStatus, this.dialogFormVisible)
    },
    edit(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.editShow = true
      console.log('row:' + row)
      this.$refs.editrole.initDialog(this.dialogStatus, row)
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
        delRole(row.id).then(response => {
          if (response.code === 200) {
            this.$message.success('删除成功')
            this.deleteItem(this.list, row)// 前端删除指定项
          }
        })
      })
    },
    search() {
      this.fetchData()
    },
    fetchData() {
      console.log('fetchData')
      this.listLoading = true
      getRoleList(this.listQuery).then(response => {
        this.list = toTreeList(response.data)
        this.listLoading = false
      })
    },
    // 在嵌套列表list中删除指定元素
    deleteItem(list, des) {
      list.forEach((value, index) => {
        if (value.id === des.id) {
          list.splice(index, 1)
        } else {
          if (value.children && value.children.length > 0) {
            // this.deleteItem(value.children, des)
            this.fetchData()
          }
        }
      })
    },
    // 功能权限配置
    funcPermission(row) {
      this.dialogFormVisible = true
      this.functionShow = true
      this.$refs.funcperm.initDialog(row)
    },
    // 数据权限配置
    dataPermission(row) {
      this.dialogFormVisible = true
      this.dataShow = true
      this.$refs.dataperm.initDialog(row)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .treetable{
    margin-bottom: 50px;
  }
</style>
