<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="onlineUsersItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :selection="multipleSelection"
        :button-items="onlineUsersBtnItems"
        :download-loading.sync="downloadLoading"
        @toSelectedUsers="handleSelectedUsers()"
        @toAllUsers="handleAllUsers()"
      />
    </div>
    <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
    <Table
      v-if="tableShow"
      ref="table"
      v-loading="listLoading"
      :has-selection="true"
      :height="-1"
      :data-list="list"
      :column="column"
      :selection.sync="multipleSelection"
      :total="totalCount"
      :page.sync="page"
      :limit.sync="listQuery.MaxResultCount"
      :is-sort="true"
      :sorting.sync="listQuery.Sorting"
      @pagination="getList"
      @tableSort="getList"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import { API } from '@/api/generalAPI'
import CrudOperation from '@/components/Crud/CRUD.operation'
import { onlineUsersItems, onlineUsersBtnItems } from './config'
export default {
  name: 'OnlineUsers',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'OnlineUserDto',
      apiName: 'systems',
      onlineUsersItems,
      onlineUsersBtnItems,
      downloadLoading: false,
      isEdit: true,
      exportParams: { IsPage: false }
    }
  },
  created() {},
  methods: {
    // handleDownloadPast() {
    //   if (this.list === null) {
    //     this.$message.warning('当前表格数据为空！')
    //   } else {
    //     this.exportPast('MaterialInventory', this.exportParams, 'export')
    //   }
    // }
    //清空所选
    handleSelectedUsers() {
      this.$confirm('确定清空所选用户吗？', '提示', {
        confirmButtonText: this.$t('button.confirm'), // '确认'
        cancelButtonText: this.$t('button.cancel'), // '取消'
        type: 'warning'
      })
        .then(() => {
          let row = this.multipleSelection
          if (row.length === 0) {
            this.$message.warning('请先勾选表格数据，在执行清空！')
            return
          }
          let ids = []
          row.forEach(item => {
            ids.push(item.id)
          })
          this.onlineUsersBtnItems[0].loading = true
          API.dataPost('systems', { isAll: '0', ids: ids }, 'Delete')
            .then(res => {
              if (res.success) {
                this.onlineUsersBtnItems[0].loading = false
                this.$notify({
                  title: this.$t('notify.success'), // '成功'
                  message: this.$t('notify.operateSuccess'), // '操作成功',
                  type: 'success',
                  duration: 2000
                })
                this.getList()
              } else {
                this.onlineUsersBtnItems[0].loading = false
                this.$notify({
                  title: this.$t('notify.failure'), // '失败'
                  // 接口返回数据，待中英配置
                  message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',
                  type: 'error',
                  duration: 2000
                })
              }
            })
            .catch(() => {
              this.onlineUsersBtnItems[0].loading = false
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('notify.hasCanceled') // '已取消'
          })
        })
    },
    //清空所有
    handleAllUsers() {
      this.$confirm('确定清空所有用户吗？', '提示', {
        confirmButtonText: this.$t('button.confirm'), // '确认'
        cancelButtonText: this.$t('button.cancel'), // '取消'
        type: 'warning'
      })
        .then(() => {
          this.onlineUsersBtnItems[1].loading = true
          API.dataPost('systems', { isAll: '1' }, 'Delete')
            .then(res => {
              if (res.success) {
                this.onlineUsersBtnItems[1].loading = false
                this.$notify({
                  title: this.$t('notify.success'), // '成功'
                  message: this.$t('notify.operateSuccess'), // '操作成功',
                  type: 'success',
                  duration: 2000
                })
                this.getList()
              } else {
                this.onlineUsersBtnItems[1].loading = false
                this.$notify({
                  title: this.$t('notify.failure'), // '失败'
                  // 接口返回数据，待中英配置
                  message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',
                  type: 'error',
                  duration: 2000
                })
              }
            })
            .catch(() => {
              this.onlineUsersBtnItems[1].loading = false
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('notify.hasCanceled') // '已取消'
          })
        })
    }
  }
}
</script>
