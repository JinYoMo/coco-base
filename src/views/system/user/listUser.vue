<template>
  <div class="app-container">
    <el-row>
      <!--左半部分-->
      <el-col :span="5">
        <div class="dept-div">
          <el-card class="box-card" shadow="always">
            <div slot="header" class="clearfix">
              <span>组织机构</span>
            </div>
            <el-scrollbar ref="deptScroll" :style="{'height':(bodyHeight-116)+'px'}" class="user-dept-scroll">
              <el-tree
                ref="tree2"
                v-loading="treeLoading"
                :data="deptTree"
                :props="defaultProps"
                :default-expand-all="expandAllNode"
                :expand-on-click-node="expandNodeClick"
                class="filter-tree"
                @node-click="handleNodeClick"
              />
            </el-scrollbar>
          </el-card>
        </div>
      </el-col>
      <!--右半部分-->
      <el-col :span="19">
        <!--筛选条件-->
        <search-area ref="searchArea" size="small" @search="search">
          <search-item>
            <el-input v-model.trim="listQuery.keywords" size="small" placeholder="账号/真实姓名/手机号" clearable />
          </search-item>
          <search-item>
            <el-date-picker
              v-model="registerTime"
              type="daterange"
              format="yyyy-MM-dd"
              size="small"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="注册开始日期"
              end-placeholder="注册结束日期"
            />
          </search-item>
          <template slot="btns">
            <div style="margin-bottom: 10px;">
              <el-button v-if="hasPerm('/sys/mgr/add')" size="small" type="primary" icon="el-icon-plus" @click="add">
                新增
              </el-button>
              <el-button v-if="hasPerm('/sys/mgr/update')" size="small" type="primary" icon="el-icon-edit" @click="edit">
                修改
              </el-button>
              <el-button v-if="hasPerm('/sys/mgr/delete')" size="small" type="primary" icon="el-icon-delete" @click="del">
                删除
              </el-button>
              <el-button v-if="hasPerm('/sys/mgr/reset')" size="small" type="primary" icon="el-icon-key" @click="resetPwd">
                重置密码
              </el-button>
              <el-button v-if="hasPerm('/sys/mgr/roleAssign')" size="small" type="primary" icon="el-icon-magic-stick" @click="roleAssign">
                角色分配
              </el-button>
            </div>
          </template>
        </search-area>
        <!--查询结果Table显示-->
        <normal-table
          ref="normalTable"
          :style="{'min-height':(bodyHeight-118)+'px'}"
          class="table"
          :data="list"
          :total="total"
          :columns="columns"
          :query="listQuery"
          :list-loading="listLoading"
          size="small"
          @change="changePage"
        >
          <template slot="preColumns">
            <el-table-column label="选择" width="55" header-align="center" align="center">
              <template v-slot="scope">
                <el-radio v-model="radio" :label="scope.$index" class="radio">
&nbsp
                </el-radio>
              </template>
            </el-table-column>
          </template>
          <template slot="columns">
            <!--冻结状态-->
            <el-table-column label="状态" width="80" align="center">
              <template v-slot="scope">
                <el-tag :type="tagNames[scope.row.statusName]" size="medium">
                  {{ scope.row.statusName }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column v-if="hasPerm('/sys/mgr/freeze')" label="操作" align="center" width="70">
              <template slot-scope="scope">
                <el-button v-if="hasPerm('/sys/mgr/freeze')" :type="btnStatus[scope.row.statusName]" size="mini" @click="freeze(scope.row)">
                  {{ btnNames[scope.row.statusName] }}
                </el-button>
              </template>
            </el-table-column>
          </template>
        </normal-table>
      </el-col>
    </el-row>
    <!--编辑用户的对话框-->
    <edit-user v-show="editShow" ref="edituser" @watchChild="fetchData" />
    <!--配置角色对话框-->
    <role-assign v-show="roleAssignShow" ref="roleassign" @watchChild="fetchData" />
  </div>
</template>

<script>
import { RSAencrypt } from '@/utils/security'
import editUser from '@/views/system/user/editUser'
import roleAssign from '@/views/system/user/roleAssign'
import { getUserList, delUser, freezeUser, unfreezeUser, resetPwd } from '@/api/system/user'
import { getDeptTreeList } from '@/api/system/dept'
import { toTreeList } from '@/utils/structure'
import { mapGetters } from 'vuex'

export default {
  name: 'ListUser',
  components: {
    roleAssign,
    editUser
  },
  data() {
    return {
      radio: '',
      password: '111111',
      listQuery: {
        keywords: '',
        beginTime: '',
        endTime: '',
        deptId: '',
        offset: 1,
        limit: 20,
        sort: 'id'
      },
      registerTime: [], // 注册时间范围
      tagNames: { '已冻结': 'danger', '启用': 'success' },
      btnNames: { '已冻结': '解冻', '启用': '冻结' },
      btnStatus: { '已冻结': '', '启用': 'primary' },
      columns: [
        { text: '账号', value: 'account' },
        { text: '所在组织机构', value: 'deptName', width: 150 },
        { text: '真实姓名', value: 'name' },
        { text: '角色', value: 'roleName' },
        { text: '手机号', value: 'phone' },
        { text: '注册时间', value: 'createtime' }
      ],
      list: [],
      total: 0,
      deptTree: null,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeLoading: false,
      listLoading: false,
      editShow: false, // 编辑组件是否显示
      roleAssignShow: false, // 角色分配组件是否显示
      expandAllNode: true,
      expandNodeClick: false
    }
  },
  computed: {
    ...mapGetters(['bodyHeight'])
  },
  watch: {
    registerTime(val) {
      if (val && val.length > 0) {
        this.listQuery.beginTime = val[0]
        this.listQuery.endTime = val[1]
      } else {
        this.listQuery.beginTime = ''
        this.listQuery.endTime = ''
      }
    }
  },
  created() {
    this.fetchDeptTree()
    this.fetchData()
  },
  methods: {
    // 打开新增对话框
    add() {
      this.editShow = true
      this.$refs.edituser.initDialog('create')
    },
    // 打开修改对话框
    edit() {
      if (this.singleCheck()) {
        this.editShow = true
        const row = this.list[this.radio]
        this.$refs.edituser.initDialog('update', row)
      } else {
        this.$message.error('必须选中一项')
      }
    },
    // 打开角色分配对话框
    roleAssign() {
      if (this.singleCheck()) {
        this.roleAssignShow = true
        const row = this.list[this.radio]
        this.$refs.roleassign.initDialog(row)
      } else {
        this.$message.error('必须选中一项')
      }
    },
    // 删除
    del() {
      if (this.singleCheck()) {
        const row = this.list[this.radio]
        this.$confirm(
          '确定要删除' + row.name + '吗？',
          '确认删除',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          delUser(row.id).then(response => {
            if (response.code === 200) {
              this.$message.success('删除成功')
              this.fetchData()
            }
          })
        })
      } else {
        this.$message.error('必须选中一项')
      }
    },
    // 重置密码
    resetPwd() {
      if (this.singleCheck()) {
        const row = this.list[this.radio]
        this.$confirm(
          '确定要重置' + row.name + '的密码为' + this.password + '吗？',
          '确认重置密码',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          // 加密
          const pwd = RSAencrypt(this.password)
          const params = {
            id: row.id,
            newPwd: pwd
          }
          resetPwd(params).then(response => {
            if (response.code === 200) {
              this.$message.success('重置密码成功')
            }
          })
        })
      } else {
        this.$message.error('必须选中一项')
      }
    },
    // 冻结或解冻
    freeze(row) {
      console.log(row.id)
      if (row.statusName === '已冻结') {
        this.$confirm(
          '确定要对' + row.name + '解除冻结吗？',
          '确认操作',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          unfreezeUser(row.id).then(response => {
            if (response.code === 200) {
              this.$message.success('解除冻结成功')
              row.statusName = '启用'
              console.log('rowStatusName:' + row.statusName)
            }
          })
        })
      } else {
        this.$confirm(
          '确定要冻结' + row.name + '吗？',
          '确认操作',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          freezeUser(row.id).then(response => {
            if (response.code === 200) {
              this.$message.success('冻结用户成功')
              row.statusName = '已冻结'
            }
          })
        })
      }
    },
    // 查询数据
    search() {
      this.fetchData(false)
    },
    // 获取用户数据
    fetchData(isNowPage = true) {
      this.listLoading = true
      if (!isNowPage) { // 是否显示当前页，否则跳转第一页
        this.listQuery.offset = 1
      }
      getUserList(this.listQuery).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
        this.listLoading = false
        this.radio = ''
      })
    },
    // 获取组织结构树
    fetchDeptTree() {
      this.treeLoading = true
      getDeptTreeList(this.listQuery).then(response => {
        this.deptTree = toTreeList(response.data, '0', true)
        this.treeLoading = false
      })
    },
    // 点击左侧组织结构项触发
    handleNodeClick(data) {
      this.listQuery.deptId = data.id
      this.fetchData()
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
    // 在嵌套列表list中删除指定元素
    deleteItem(list, des) {
      list.forEach((value, index) => {
        if (value.id === des.id) {
          list.splice(index, 1)
        } else {
          if (value.children && value.children.length > 0) {
            this.deleteItem(value.children, des)
          }
        }
      })
    },
    // 检查单选,选中
    singleCheck() {
      if (this.radio === '') {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dept-div{
    padding-right: 12px;
    .box-card{
      width:100%;
      .user-dept-scroll{
        width:100%;
        height: calc(100vh - 265px);
        .filter-tree{

        }
      }
    }
  }

</style>
<style>
  .dept-div .el-scrollbar__wrap{
    overflow-x: auto;
    background-color: #fff;
    padding: 0px;
  }

</style>
