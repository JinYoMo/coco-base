<!--区域单选列表，懒加载-->
<template>
  <el-dialog :visible.sync="dialogFormVisible" custom-class="area-select-dialog" title="选择区域" append-to-body>
    <el-scrollbar style="height: 400px">
      <el-tree
        ref="tree"
        :expand-on-click-node="false"
        :props="defaultProps"
        :load="loadNode"
        node-key="id"
        lazy
      />
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirmSelect">
        确定
      </el-button>
      <el-button @click="cancel">
        取消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getAreaTree } from '@/api/system/area'
export default {
  name: 'AreaSelectTree',
  data() {
    return {
      dialogFormVisible: false,
      defaultProps: {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf'
      },
      listQuery: {
        pid: ''
      }
    }
  },
  methods: {
    // 初始化对话框
    initDialog() {
      this.dialogFormVisible = true
    },
    // 加载数据
    loadNode(node, resolve) {
      if (node.data && node.data.id) {
        this.listQuery.pid = node.data.id
      }
      getAreaTree(this.listQuery).then(response => {
        const data = response.data
        resolve(data)
      })
    },
    // 确认选择后的操作，传给父组件并关闭弹窗
    confirmSelect() {
      const node = this.$refs.tree.getCurrentNode()
      this.dialogFormVisible = false
      this.$emit('selectDone', node)
    },
    cancel() {
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>

</style>

<style rel="stylesheet/scss" lang="scss">
  .area-select-dialog{
    width: 400px;
    .el-scrollbar__wrap{
      overflow-x: hidden !important;
    }
  }
</style>
