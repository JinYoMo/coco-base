<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" append-to-body>
    <el-form ref="dataForm" :rules="rules" :model="resourceForm" label-position="right" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="资源名称" prop="name">
            <el-input v-model.trim="resourceForm.name" type="text" placeholder="必填" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="" prop="url">
            <span slot="label">
              资源路径
              <el-tooltip content="资源路径必须对应后台接口名,用于功能权限判断" placement="top">
                <i class="el-icon-warning-outline" />
              </el-tooltip>
            </span>
            <el-input v-model.trim="resourceForm.url" type="text" placeholder="必填" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="资源编码" prop="code">
            <el-input v-model.trim="resourceForm.code" :disabled="dialogStatus=='update'" type="text" placeholder="必填" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="父资源" prop="pid">
            <select-tree v-model="resourceForm.pid" :options="resourceTreeList" :props="defaultProps" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="资源类型" prop="resourceType">
            <el-select v-model="resourceForm.resourceType" placeholder="请选择">
              <el-option
                v-for="item in resourceTypeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
            <!--<el-input v-model="resourceForm.resourceType" type="text" placeholder="必填"/>-->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序" prop="num">
            <el-input-number v-model.number="resourceForm.num" style="width:100%" placeholder="必填" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="" prop="icon">
            <span slot="label">
              图标
              <el-tooltip content="对应src/icons/svg图标名称" placement="top">
                <i class="el-icon-warning-outline" />
              </el-tooltip>
            </span>
            <el-input v-model.trim="resourceForm.icon" type="text" placeholder="非必填" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="btnLoading" type="primary" @click="saveData">
        保存
      </el-button>
      <el-button @click="cancel">
        取消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { toTreeList } from '@/utils/structure'
import SelectTree from '@/components/SelectTree/singleSelect'
import { getResourceTreeList, getResourceTypeList, addResource, updateResource } from '@/api/system/resource'

export default {
  name: 'EditResource',
  components: { SelectTree },
  data() {
    return {
      dialogFormVisible: false, // 对话框是否显示
      dialogStatus: '', // 对话框类型：create,update
      btnLoading: false, // 保存按钮的加载中状态
      resourceForm: {
        id: '',
        name: '',
        url: '',
        code: '',
        pid: '',
        resourceType: '',
        num: '',
        icon: ''
      }, // 表单
      defaultProps: {
        parent: 'pid',
        value: 'id',
        label: 'name',
        children: 'children'
      },
      resourceTypeList: [
        { value: '02', name: '系统' },
        { value: '03', name: '菜单' },
        { value: '04', name: '按钮' }
      ], // 资源类型
      resourceTreeList: null, // 资源树列表数据
      textMap: {
        update: '编辑',
        create: '新增'
      }, // 表头显示标题
      rules: {
        name: [{ required: true, message: '资源名称不能为空', trigger: ['blur', 'change'] }],
        code: [{ required: true, message: '资源编码不能为空', trigger: ['blur', 'change'] }],
        pid: [{ required: true, message: '父资源必选', trigger: ['blur', 'change'] }],
        num: [{ required: true, message: '排序不能为空' }, { type: 'number', message: '必须为数字值' }],
        resourceType: [{ required: true, message: '资源类型必选', trigger: ['blur', 'change'] }],
        url: [{ required: true, message: '资源路径不能为空', trigger: ['blur', 'change'] }]
      } // 前端校验规则
    }
  },
  computed: {
    resourceTree: function() {
      const tree = toTreeList(this.resourceTreeList)
      console.log(tree)
      return tree
    }
  },
  mounted: function() {
    this.fetchPcode()
  },
  methods: {
    // 初始化对话框
    initDialog: function(dialogStatus, row = null) {
      this.dialogStatus = dialogStatus
      this.dialogFormVisible = true
      this.btnLoading = false
      this.fetchPcode()
      this.fetchResourceType()
      if (dialogStatus === 'create') { // 如果是新增，清除验证
        this.resetForm()
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      } else if (dialogStatus === 'update') { // 如果是修改，将row中数据填写到输入框中
        this.resourceForm = {
          id: row.id,
          name: row.name,
          url: row.url,
          code: row.code,
          pid: row.pid,
          resourceType: row.resourceType,
          num: row.num,
          icon: row.icon
        }
      }
    },
    // 加载父资源树形下拉菜单
    fetchPcode: function() {
      getResourceTreeList(this.listQuery).then(response => {
        console.log(response.data)
        if (response.data) {
          this.resourceTreeList = toTreeList(response.data, '0', true)
          console.log(this.resourceTreeList)
        }
      })
    },
    // 加载资源类型列表
    fetchResourceType: function() {
      getResourceTypeList(this.listQuery).then(response => {
        if (response.data) {
          this.resourceTypeList = response.data
        }
      })
    },
    // 重置表单
    resetForm() {
      this.resourceForm = {
        id: '',
        name: '',
        url: '',
        code: '',
        pid: '',
        resourceType: '',
        num: '',
        icon: ''
      }
    },
    // 保存数据
    saveData: function() {
      if (this.dialogStatus === 'update') {
        this.updateData()
      } else if (this.dialogStatus === 'create') {
        this.createData()
      }
    },
    // 新增数据
    createData: function() {
      this.$refs['dataForm'].validate((valid) => {
        console.log(this.resourceForm)
        if (valid) {
          this.btnLoading = true
          addResource(this.resourceForm).then(response => {
            if (response.code === 200) {
              this.$confirm('新增成功，是否继续新增?', '提示', {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'info'
              }).then(() => {
                this.btnLoading = false
                this.resetForm()
                this.$nextTick(() => {
                  this.$refs['dataForm'].clearValidate()
                  this.fetchPcode()
                })
              }).catch(() => {
                this.$emit('watchChild')
                this.dialogFormVisible = false
              })
            }
          }).catch(_ => { // 异常情况，loading置为false
            this.btnLoading = false
          })
        }
      })
    },
    // 修改数据
    updateData: function() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          updateResource(this.resourceForm).then(response => {
            if (response.code === 200) {
              this.$message.success('修改成功')
              this.$emit('watchChild')
              this.dialogFormVisible = false
            }
          }).catch(_ => { // 异常情况，loading置为false
            this.btnLoading = false
          })
        }
      })
    },
    cancel: function() {
      this.dialogFormVisible = false
      this.$emit('watchChild')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .el-dialog{
    width:700px
  }
  .el-select{
    width: 100%;
  }
</style>
