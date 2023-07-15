<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" append-to-body>
    <el-form ref="dataForm" :rules="rules" :model="deptForm" label-position="right" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="组织名称" prop="simpleName">
            <el-input v-model.trim="deptForm.simpleName" type="text" placeholder="必填" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组织全称" prop="fullName">
            <el-input v-model.trim="deptForm.fullName" type="text" placeholder="必填" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="父组织" prop="pid">
            <dept-select ref="deptSelect" v-model="deptForm.pid" :dept-show="true" placeholder="请选择父组织" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序" prop="num">
            <el-input-number v-model.number="deptForm.num" style="width:100%" placeholder="必填" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="组织类型" prop="deptType">
            <el-select v-model="deptForm.deptType" placeholder="请选择">
              <el-option
                v-for="item in deptTypList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" 备注" prop="tips">
            <el-input v-model.trim="deptForm.tips" type="text" placeholder="非必填" />
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
import { addDept, updateDept } from '@/api/system/dept'
import DeptSelect from '@/components/DeptSelect'

export default {
  name: 'EditDept',
  components: { DeptSelect },
  data() {
    return {
      dialogFormVisible: false, // 对话框是否显示
      dialogStatus: '', // 对话框类型：create,update
      deptForm: {
        id: '',
        simpleName: '',
        fullName: '',
        pid: '',
        pids: '',
        version: '',
        num: '',
        tips: '',
        deptType: ''
      }, // 表单
      defaultProps: {
        parent: 'pid',
        value: 'id',
        label: 'name',
        children: 'children'
      },
      deptTypList: [
        { name: '公司/单位', value: '03' },
        { name: '部门/组', value: '04' }
      ],
      btnLoading: false, // 保存按钮的加载中状态
      multiData: false, // 组织树是否为多级列表
      deptTreeList: [], // 组织树列表数据
      textMap: {
        update: '编辑',
        create: '新增'
      }, // 表头显示标题
      rules: {
        simpleName: [{ required: true, message: '组织名称不能为空', trigger: ['blur', 'change'] }],
        fullName: [{ required: true, message: '组织全称不能为空', trigger: ['blur', 'change'] }],
        pid: [{ required: true, message: '父组织必选', trigger: ['blur', 'change'] }],
        num: [{ required: true, message: '排序不能为空' }, { type: 'number', message: '必须为数字值' }],
        deptType: [{ required: true, message: '组织类型必选', trigger: ['blur', 'change'] }]
      } // 前端校验规则
    }
  },
  computed: {
    deptTree: function() {
      const tree = toTreeList(this.deptTreeList)
      console.log(tree)
      return tree
    }
  },
  methods: {
    // 初始化对话框
    initDialog: function(dialogStatus, row = null) {
      this.dialogStatus = dialogStatus
      this.dialogFormVisible = true
      this.btnLoading = false
      this.$refs.deptSelect.fetchPcode()
      if (dialogStatus === 'create') { // 如果是新增，清除验证
        this.resetForm()
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      } else if (dialogStatus === 'update') { // 如果是修改，将row中数据填写到输入框中
        this.deptForm = {
          id: row.id,
          simpleName: row.simpleName,
          fullName: row.fullName,
          pid: row.pid,
          pids: row.pids,
          num: row.num,
          tips: row.tips,
          version: row.version,
          deptType: row.deptType
        }
      }
    },
    // 重置表单
    resetForm() {
      this.deptForm = {
        id: '',
        simpleName: '',
        fullName: '',
        pid: '',
        pids: '',
        num: '',
        tips: '',
        version: '',
        deptType: ''
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
        console.log(this.deptForm)
        if (valid) {
          this.btnLoading = true
          addDept(this.deptForm).then(response => {
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
                  this.$refs.deptSelect.fetchPcode()
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
          this.dialogFormVisible = true
          updateDept(this.deptForm).then(response => {
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
