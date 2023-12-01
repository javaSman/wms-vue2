<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :selection="multipleSelection"
        :button-items="locationsBtnItems"
        :download-loading.sync="downloadLoading"
        @toDownload="handleDownloadTwo()"
        @toReportTask="dialogFormVisible = true"
      />
    </div>
    <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
    <Table
      v-if="tableShow"
      ref="table"
      v-loading="listLoading"
      :height="-1"
      :data-list="list"
      :column="column"
      :selection.sync="multipleSelection"
      :total="totalCount"
      :page.sync="page"
      :limit.sync="listQuery.MaxResultCount"
      :is-sort="true"
      :sorting.sync="listQuery.Sorting"
      :dict-gather="dictGather"
      @pagination="getList"
      @tableSort="getList"
    />
    <EditForm
      :dialog-form-visible="dialogFormVisible"
      :form-title="formTitle"
      :form-list="configFormList"
      :form-data="form"
      :is-edit="isEdit"
      :cbg-filter="optFilter"
      :submit="toReportTask"
      @cancel="cancel"
      @reset="reset"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import EditForm from '@/components/EditDialog'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import { agvAPI } from '@/api/agvAPI'
import { API } from '@/api/generalAPI'
import CrudOperation from '@/components/Crud/CRUD.operation'
import { queryItems, locationsBtnItems, configFormList } from './config'
export default {
  // AGV任务管理
  name: 'AgvTaskAdm',
  components: { Table, CrudOperation, EditForm },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'AGVTaskDto',
      apiName: 'agvTask',
      queryItems,
      locationsBtnItems,
      downloadLoading: false,
      exportParams: { IsPage: false },
      configFormList,
      form: {},
      dialogFormVisible: false,
      formTitle: '',
      isEdit: true,
      listQuery: {
        TaskArea: 'PS'
      }
    }
  },
  created() {
    this.getDict()
    this.getList()
  },
  methods: {
    getList() {
      this.listQuery.SkipCount = (this.page - 1) * this.listQuery.MaxResultCount
      agvAPI.get('agvTask', this.listQuery, 'all').then(res => {
        this.list = res.items
        this.totalCount = res.totalCount
      })
    },
    handleDownloadTwo() {
      this.exportPast('agvTask', this.exportParams, 'export')
    },
    async toReportTask(formData) {
      // 报工
      await agvAPI
        .put(
          'agvTask/updateTaskStatus?taskNo=' + this.multipleSelection[0].taskNo + '&taskStatus=' + formData.taskStatus
        )
        .then(res => {
          if (res.success) {
            this.$notify({
              title: this.$t('notify.success'), // '成功'
              message: res.message, // '操作成功',
              type: 'success',
              duration: 2000
            })
            this.dialogFormVisible = false
            this.reset()
          } else {
            this.$notify({
              title: this.$t('notify.failure'), // '失败'
              message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败
              type: 'error',
              duration: 2000
            })
          }
        })
      return true
    },
    getDict() {
      // 任务状态
      API.getDict('dict', { name: 'TaskStatus' }).then(res => {
        this.queryItems[2].options = res.details
      })
      // 任务类型
      API.getDict('dict', { name: 'TaskType' }).then(res => {
        this.queryItems[3].options = res.details
      })
    }
  }
}
</script>
