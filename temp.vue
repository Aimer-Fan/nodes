<template>
  <div v-loading="loading" style="padding: 20px">
    <el-row type="flex" justify="end">
      <!-- <el-button size="mini" type="primary" icon="el-icon-plus">添加</el-button> -->
      <el-row type="flex" justify="space-between">
        <el-input v-model="param.search.title" size="mini" placeholder="请输入标题" clearable @clear="bindData" />
        <el-button style="margin-left: 20px" size="mini" type="primary" icon="el-icon-search" @click="bindData">搜索</el-button>
      </el-row>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%;margin-top: 10px">
      <el-table-column label="封面">
        <template slot-scope="scope">
          <img :src="scope.row.cover" class="cover_img" @click="previewImg(scope.row.cover)">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="房屋名称" />
      <el-table-column prop="landlordName" label="房东姓名" />
      <el-table-column prop="tenantName" label="租客姓名" />
      <el-table-column prop="phone" label="联系方式" />
      <el-table-column prop="pStartTime" label="预计开始时间" />
      <el-table-column prop="pEndTime" label="预计结束时间" />
      <el-table-column prop="startTime" label="实际开始时间" />
      <el-table-column prop="endTime" label="实际结束时间" />
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      class="pagination"
      :page-size.sync="param.page.pageSize"
      :current-page.sync="param.page.pageNum"
      :total="param.page.total"
      @current-change="bindData"
    />

    <el-dialog
      title="编辑"
      width="40%"
      :visible.sync="editDialogVisible"
    >
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeEditDialog">取 消</el-button>
        <el-button size="mini" type="primary" @click="edit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import cover1 from '@/assets/img/download.jpg'
import cover2 from '@/assets/img/download2.jpg'
const tableData = [
  { cover: cover1, title: '整租·融科玖瑞尚城 1室1厅1卫', landlordName: 'fd001', tenantName: 'zk001', phone: '13512341234', pStartTime: '2020/01/01', pEndTime: '2021/01/01', startTime: '2020/01/01', endTime: '2020/05/19' },
  { cover: cover2, title: '整租·禹洲大学城 1室0厅 北', landlordName: 'fd001', tenantName: 'zk001', phone: '13512341234', pStartTime: '2020/05/20', pEndTime: '2021/01/01', startTime: '2020/05/20', endTime: null }
]
export default {
  data() {
    return {
      param: {
        page: {
          pageSize: 10,
          pageNum: 1,
          total: 0
        },
        search: {
        }
      },
      form: {},
      tableData: tableData,
      loading: false,
      editDialogVisible: false
    }
  },
  mounted() {
    // this.bindData()
  },
  methods: {
    bindData() {
      this.loading = true
      getRecordPage(this.param).then(res => {
        this.tableData = res.data.data
        this.tableData.forEach(data => {
          if (data.tags) {
            data.tags = data.tags.split(',')
          }
        })
        this.param.page.total = res.data.total
      }).finally(() => {
        this.loading = false
      })
    },
    previewImg(data) {
      const blob = dataURLtoBlob(data)
      const url = window.URL.createObjectURL(blob)
      window.open(url)
    },
    edit() {
      const data = JSON.parse(JSON.stringify(this.form))
      data.tags = data.tags.join(',')
      editRecord(data).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.closeEditDialog()
        this.bindData()
      })
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delete(id)
      })
    },
    delete(id) {
      deleteRecordById(id).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.bindData()
        }
      })
    },
    handleEdit(scope) {
      this.editDialogVisible = true
      getRecordById(scope.id).then(res => {
        if (res.data.tags) {
          res.data.tags = res.data.tags.split(',')
        }
        this.form = res.data
      })
    },
    closeEditDialog() {
      this.form = {}
      this.editDialogVisible = false
    }
  }
}
</script>

<style scoped lang='sass'>
.pagination
  float: right
  margin-top: 10px
.cover_img
  width: 60px
  height: 42px
  cursor: pointer
</style>
