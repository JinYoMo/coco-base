<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" append-to-body>
    <el-form ref="dataForm" :rules="rules" :model="roleForm" label-position="right" label-width="110px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model.trim="roleForm.name" type="text" placeholder="必填" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="" prop="tips">
            <span slot="label">
              别名
              <el-tooltip content="用于后台身份识别。administrator表示超级管理员, user表示其他用户" placement="top">
                <i class="el-icon-warning-outline" />
              </el-tooltip>
            </span>
            <el-input v-model.trim="roleForm.tips" type="text" placeholder="必填" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="父角色" prop="pid">
            <select-tree v-model="roleForm.pid" :options="roleTreeList" :props="roleProps" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序" prop="num">
            <el-input-number v-model.number="roleForm.num" style="width:100%" placeholder="必填" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="所在组织机构" prop="deptId">
            <dept-select v-model="roleForm.deptId" placeholder="请选择组织机构" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="数据权限类型" prop="dataScopeType">
            <el-select v-model="roleForm.dataScopeType" placeholder="请选择">
              <el-option
                v-for="item in dataScopeTypeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
            <!--<el-input v-model="resourceForm.resourceType" type="text" placeholder="必填"/>-->
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
import DeptSelect from '@/components/DeptSelect'
import SelectTree from '@/components/SelectTree/singleSelect'
// import { getDeptTreeList } from '@/api/system/dept'
import { getRoleTreeList, addRole, updateRole, getDataScopeTypeList } from '@/api/system/role'

export default {
  name: 'EditRole',
  components: { SelectTree, DeptSelect },
  data() {
    return {
      dialogFormVisible: false, // 对话框是否显示
      dialogStatus: '', // 对话框类型：create,update
      btnLoading: false, // 保存按钮的加载中状态
      roleForm: {
        id: '', // 编号
        pid: '', // 父级编号
        name: '', // 角色名
        tips: '', // 别名，
        deptId: '', // 组织机构编号
        version: '', // 保留字段
        num: 99, // 排序
        dataScopeType: '' // 数据权限类型
      }, // 表单
      deptProps: {
        parent: 'pid',
        value: 'id',
        label: 'name',
        children: 'children'
      },
      roleProps: {
        parent: 'pid',
        value: 'id',
        label: 'name',
        children: 'children'
      },
      deptTreeList: [], // 组织树列表数据
      roleTreeList: [], // 角色树列表数据
      dataScopeTypeList: [], // 数据权限类型列表
      textMap: {
        update: '编辑',
        create: '新增'
      }, // 表头显示标题
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: ['blur', 'change'] }],
        pid: [{ required: true, message: '父角色必选', trigger: ['blur', 'change'] }],
        deptId: [{ required: true, message: '组织机构必选', trigger: ['blur', 'change'] }],
        tips: [{ required: true, message: '别名必填', trigger: ['blur', 'change'] }],
        num: [{ required: true, message: '排序必填' }, { type: 'number', message: '必须为数字值' }],
        dataScopeType: [{ required: true, message: '数据权限类型必选' }]
      } // 前端校验规则
    }
  },
  computed: {
    roleTree: function() {
      const tree = toTreeList(this.roleTreeList)
      console.log(tree)
      return tree
    }
  },
  created: function() {
    this.fetchRoleTree()
    this.fetchDataScopeType()
  },
  methods: {
    // 初始化对话框
    initDialog: function(dialogStatus, row = null) {
      this.dialogStatus = dialogStatus
      this.dialogFormVisible = true
      this.btnLoading = false
      this.fetchRoleTree()
      if (dialogStatus === 'create') { // 如果是新增，清除验证
        this.resetForm()
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      } else if (dialogStatus === 'update') { // 如果是修改，将row中数据填写到输入框中
        this.roleForm = {
          id: row.id, // 编号
          pid: row.pid, // 父级编号
          name: row.name, // 角色名
          tips: row.tips, // 别名，
          deptId: row.deptId, // 组织机构编号
          version: row.version, // 保留字段
          dataScopeType: row.dataScopeType, // 数据权限类型
          num: row.num // 排序
        }
      }
    },
    // 加载组织机构树形下拉菜单
    fetchDataScopeType: function() {
      getDataScopeTypeList().then(response => {
        if (response.data) {
          this.dataScopeTypeList = response.data
          console.log(this.resourceTreeList)
        }
      })
    },
    // 加载角色树形下拉菜单
    fetchRoleTree: function() {
      getRoleTreeList(this.listQuery).then(response => {
        console.log(response.data)
        if (response.data.list) {
          this.roleTreeList = toTreeList(response.data.list, '0')
          console.log(this.roleTreeList)
        }
      })
    },
    // 重置表单
    resetForm() {
      this.roleForm = {
        id: '', // 编号
        pid: '', // 父级编号
        name: '', // 角色名
        tips: '', // 别名，
        deptId: '', // 组织机构编号
        version: '', // 保留字段
        num: 99, // 排序
        dataScopeType: '' // 数据权限类型
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
        console.log(this.roleForm)
        if (valid) {
          this.btnLoading = true
          addRole(this.roleForm).then(response => {
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
                  this.fetchRoleTree()
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
          updateRole(this.roleForm).then(response => {
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
