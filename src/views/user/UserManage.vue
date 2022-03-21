<template>
  <div class="user-manage">
    <!-- 弹出对话框 -->
    <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="isShow">
      <common-form inline :formLabel="operateFormLabel" :form="operateForm"></common-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form inline :model="searchForm" :formLabel="formLabel" :form="searchForm">
        <el-button type="primary" @click="getUserList">搜索</el-button>
      </common-form>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList"
      @edit="editUser"
      @del="delUser"
    >
    </common-table>
  </div>
</template>
<script>
import CommonForm from '@/components/CommonForm'
import CommonTable from '@/components/CommonTable'
export default {
  components: {
    CommonForm,
    CommonTable
  },
  data() {
    return {
      isShow: false,
      operateType: 'add',
      tableData: [],
      tableLabel: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'sexLabel',
          label: '性别'
        },
        {
          prop: 'birth',
          label: '出生日期',
          width: 200
        },
        {
          prop: 'addr',
          label: '地址',
          width: 320
        }
      ],
      config: {
        page: 1,
        total: 20,
        loading: false
      },
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名'
        },
        {
          model: 'addr',
          label: '地址'
        },
        {
          model: 'age',
          label: '年龄'
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        }
      ],
      searchForm: {
        keyword: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: ''
        }
      ],
      userList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.config.loading = true
      this.$http
        .get('/user/getUser', {
          params: {
            page: this.config.page
          }
        })
        .then(res => {
          this.tableData = res.data.list.map(item => {
            item.sexLabel = item.sex === 0 ? '女' : '男'
            return item
          })
          this.config.total = res.data.count
          this.config.loading = false
        })
    },
    getUserList() {
      this.config.loading = true
      //let name = this.searchForm.keyword
      this.$http
        .get('/user/getUser', {
          params: this.searchForm
        })
        .then(res => {
          //console.log(res.data)
          this.userList = res.data.list
          this.config.total = res.data.count
          this.config.loading = false
        })
    },
    //新增用户
    addUser() {
      this.operateForm = {}
      this.operateType = 'add'
      this.isShow = true
    },
    //编辑用户信息
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      //console.log(row)
      this.operateForm = row
    },
    //删除用户
    delUser(row) {
      this.$confirm('您将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let id = row.id
          this.$http
            .get('/user/del', {
              params: {
                id
              }
            })
            .then(res => {
              console.log(res.data)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getList()
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    //弹出框确认操作
    confirm() {
      if (this.operateType === 'edit') {
        this.$http.post('/user/edit', this.operateForm).then(res => {
          console.log(res.data)
          this.isShow = false
          this.getList()
        })
      } else {
        this.$http.post('/user/add', this.operateForm).then(res => {
          console.log(res.data)
          this.isShow = false
          this.getList()
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/common.scss';
</style>
