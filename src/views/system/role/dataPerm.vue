<template>
  <el-dialog :visible.sync="dialogFormVisible" :title="titleText" width="330px" append-to-body>
    <!--功能-->
    <div class="tool-line">
      <el-checkbox v-model="treeExpand" @change="handleCheckedTreeExpand($event)">
        展开
      </el-checkbox>
      <el-checkbox v-model="nodeCheckedAll" @change="handleCheckedTreeNodeAll($event)">
        全选
      </el-checkbox>
      <el-checkbox v-model="treeCheckStrictly">
        父子联动
      </el-checkbox>
    </div>
    <el-scrollbar>
      <el-tree
        ref="tree"
        v-loading="loading"
        :props="defaultProps"
        :data="treeList"
        :default-expanded-keys="defaultExpanded"
        :default-checked-keys="defaultChecked"
        :check-strictly="!treeCheckStrictly"
        show-checkbox
        node-key="id"
        empty-text="加载中，请稍后"
      />
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveData">
        保存
      </el-button>
      <el-button @click="dialogFormVisible = false">
        取消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { toTreeList, getShowItem } from '@/utils/structure'
import { getDeptTreeByRole } from '@/api/system/dept'
import { dataAuthor } from '@/api/system/role'

export default {
  name: 'DataPerm',
  data() {
    return {
      roleId: '', // 角色id
      roleName: '', // 角色名称
      dialogFormVisible: false, // 对话框是否显示
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      treeList: null, // 资源树列表数据
      defaultExpanded: [], // 默认展开的项
      defaultChecked: [], // 默认选中的树
      loading: false, // 加载动态效果
      treeExpand: false, // 展开
      nodeCheckedAll: false, // 全选
      treeCheckStrictly: true // 父子联动
    }
  },
  computed: {
    titleText: function() {
      return this.roleName + ''
    }
  },
  methods: {
    // 初始化对话框
    initDialog(row) {
      this.loading = true
      this.roleId = row.id
      this.roleName = row.name
      this.dialogFormVisible = true
      this.fetchResourceTree()
    },
    // 获取资源列表
    fetchResourceTree() {
      console.log('fetchResourceTree')
      getDeptTreeByRole(this.roleId).then(response => {
        if (response.data) {
          this.treeList = toTreeList(response.data)
          const temp = getShowItem(response.data) // 获取展开项和选中项
          this.defaultExpanded = temp[0]
          this.defaultChecked = temp[1]
          this.loading = false
        }
      })
    },
    // 保存数据
    saveData() {
      this.ids = this.$refs.tree.getCheckedKeys()
      dataAuthor(this.roleId, this.ids).then(response => {
        if (response.code === 200) {
          this.$message.success('数据权限配置成功')
          this.dialogFormVisible = false
        }
      })
      console.log('授权成功')
    },
    // 展开/折叠
    handleCheckedTreeExpand(value) {
      this.changeTreeNodeStatus(this.$refs.tree.store.root, value)
    },
    /**
     * 改变树节点展开状态，递归
     * @param node 改变的节点
     * @param value 展开/折叠
     */
    changeTreeNodeStatus(node, value) {
      node.expanded = value // 给当前节点赋值
      for (let i = 0; i < node.childNodes.length; i++) { // 给子节点赋值
        node.childNodes[i].expanded = value
        if (node.childNodes[i].childNodes.length > 0) { // 如果子节点还有子节点，递归
          this.changeTreeNodeStatus(node.childNodes[i], value)
        }
      }
    },
    // 全选或全不选
    handleCheckedTreeNodeAll(value) {
      this.$refs.tree.setCheckedNodes(value ? this.treeList : [])
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tool-line{
  margin-bottom: 10px;
  margin-top: -15px;
}
.el-dialog{
  min-width:350px !important;
}
.el-tree{
  min-height:100px;
  max-height:300px;
}
.el-select{
  width: 100%;
}
</style>
