<template>
  <el-dialog :visible.sync="dialogFormVisible" :title="titleText" width="330px" append-to-body>
    <el-scrollbar>
      <el-tree
        ref="tree"
        v-loading="loading"
        :props="defaultProps"
        :data="roleTreeList"
        :default-expanded-keys="defaultExpanded"
        :default-checked-keys="defaultChecked"
        :default-expand-all="defaultExpandAll"
        show-checkbox
        check-strictly
        node-key="id"
        @check-change="handleCheckChange"
      />
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveData">
        保存
      </el-button>
      <el-button @click="cancel">
        取消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { toTreeList, getShowItem } from '@/utils/structure'
import { getRoleTreeListByUser } from '@/api/system/role'
import { roleAssign } from '@/api/system/user'

export default {
  name: 'RoleAssign',
  data() {
    return {
      userId: '', // 用户id
      userName: '', // 用户名称
      ids: [], // 选中项id
      dialogFormVisible: false, // 对话框是否显示
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      roleTreeList: null, // 角色树列表数据
      defaultExpanded: [], // 默认展开的项
      defaultChecked: [], // 默认选中的树
      loading: false, // 加载动态效果
      defaultExpandAll: true // 是否展开树
    }
  },
  computed: {
    titleText: function() {
      return this.userName + ''
    }
  },
  mounted: function() {
    // this.fetchResourceData()
  },
  methods: {
    // 初始化对话框
    initDialog: function(row) {
      this.loading = true
      this.userId = row.id
      this.userName = row.name
      this.dialogFormVisible = true
      this.fetchRoleTree()
    },
    // 获取角色列表
    fetchRoleTree: function() {
      getRoleTreeListByUser(this.userId).then(response => {
        if (response.data) {
          this.roleTreeList = toTreeList(response.data)
          const temp = getShowItem(response.data) // 获取展开项和选中项
          this.defaultExpanded = temp[0]
          this.defaultChecked = temp[1]
          this.loading = false
        }
      })
    },
    saveData: function() {
      this.ids = this.$refs.tree.getCheckedKeys()
      roleAssign(this.userId, this.ids).then(response => {
        if (response.code === 200) {
          this.$message.success('角色分配成功')
          this.dialogFormVisible = false
          this.$emit('watchChild')
        }
      })
    },
    handleCheckChange() {
      console.log('handleCheckChange')
    },
    // 点击取消
    cancel: function() {
      this.dialogFormVisible = false
      this.$emit('watchChild')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .el-dialog{
    min-width:350px !important;
  }
  .el-tree{
    max-height:300px;
  }
  .el-select{
    width: 100%;
  }
</style>
