<template>
  <app-container>
    <!--筛选条件-->
    <search-area size="small" @search="search">
      <search-item>
        <el-input v-model.trim="listQuery.deptName" size="small" placeholder="组织名称" clearable />
      </search-item>
    </search-area>
    <!--查询结果Table显示-->
    <tree-table :data="list" :columns="columns" :query="listQuery" :list-loading="listLoading" rowkey="id">
      <template slot="btns">
        <el-button v-if="hasPerm('/sys/dept/add')" size="small" icon="el-icon-plus" @click="add">
          新增
        </el-button>
      </template>
      <template slot="columns">
        <el-table-column v-if="showOperate" label="操作" width="130" align="center">
          <template slot-scope="scope">
            <!--顶级去掉修改删除功能-->
            <el-button v-if="hasPerm('/sys/dept/update')&&scope.row.id!='0'" type="text" size="small" @click="edit(scope.row)">
              修改
            </el-button>
            <el-button v-if="hasPerm('/sys/dept/delete')&&scope.row.id!='0'" type="text" size="small" @click="del(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </template>
    </tree-table>

    <!--编辑资源的对话框-->
    <edit-dept v-show="dialogFormVisible" ref="editdept" @watchChild="fetchData" />
  </app-container>
</template>

<script>

import treeTable from '@/components/TreeTable/treeTable'
import editDept from '@/views/system/dept/editDept'
import { getDeptList, delDept } from '@/api/system/dept'
import { toTreeList } from '@/utils/structure'

export default {
  name: 'ListDept',
  components: {
    treeTable,
    editDept
  },
  data() {
    return {
      listQuery: {
        deptName: ''
      },
      columns: [
        { text: '组织名称', value: 'simpleName', align: 'left' },
        { text: '组织全称', value: 'fullName' },
        { text: '备注', value: 'tips' },
        { text: '排序', value: 'num', width: 80 }
      ],
      list: [],
      listLoading: true,
      dialogFormVisible: false,
      dialogStatus: ''
    }
  },
  computed: {
    'showOperate': function() { // 判断是否显示操作列，如果编辑和删除的权限都没有则不显示操作列
      return this.hasPerm('/sys/dept/update') || this.hasPerm('/sys/dept/delete')
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 打开新增弹窗
    add() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$refs.editdept.initDialog(this.dialogStatus)
    },
    // 打开编辑弹窗
    edit(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      console.log('row:' + row)
      this.$refs.editdept.initDialog(this.dialogStatus, row)
    },
    // 删除
    del(row) {
      this.$confirm(
        '确定要删除' + row.simplename + '吗？',
        '确认删除',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        delDept(row.id).then(response => {
          this.$message.success('删除成功')
          this.fetchData()
          // deleteItem(this.list, row)// 前端删除指定项
        })
      })
    },
    search() {
      this.fetchData()
    },
    // 查询
    fetchData() {
      this.listLoading = true
      getDeptList(this.listQuery).then(response => {
        this.list = toTreeList(response.data.list, '0', false)
        this.listLoading = false
      })
    },
    // 在嵌套列表list中删除指定元素, 已废除
    deleteItem(des) {
      // deleteItem(this.list, des)
      const del = (list, item) => {
        for (const i in list) {
          if (list[i].id === des.id) {
            list.splice(i, 1)
            return
          } else {
            if (list[i].children && list[i].children.length > 0) {
              del(list[i].children, des)
            }
          }
        }
      }
      del(this.list, des)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .treetable{
    margin-bottom: 50px;
  }
</style>
