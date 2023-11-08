<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="LocationsCrud"
        :button-items="locationsBtnItems"
        :selection="multipleSelection"
        :download-loading.sync="downloadLoading"
        @toDownload="handleDownloadTwo()"
        @toWork="handlWork()"
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
      :form-list="formList"
      :form-data="formData"
      :is-edit="true"
      :dialog-width="650"
      :layout="layout"
      :submit="confirm"
      @cancel="cancel"
      @reset="reset"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import { agvAPI } from '@/api/agvAPI'
import EditForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { formList, queryItems, LocationsCrud, locationsBtnItems } from './config'
export default {
  name: 'AGVTask',
  components: { Table, EditForm, CrudOperation },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'AGVTaskDto',
      apiName: 'agvTask',
      locationsBtnItems,
      formList,
      queryItems,
      LocationsCrud,

      formData: {},
      dialogFormVisible: false,
      formTitle: '',
      layout: { gutter: undefined, span: 12, xs: 24, sm: 12, md: 8, xl: 6 },
      downloadLoading: false,
      exportParams: {},
      listQuery: {
        TaskArea: 'ZJ'
      }
    }
  },
  created() {
    this.getDict()
    this.getList()
  },
  mounted() {},
  methods: {
    getList() {
      this.listQuery.SkipCount = (this.page - 1) * 10
      agvAPI.get('agvTask', this.listQuery, 'all').then(res => {
        this.list = res.items
        this.totalCount = res.totalCount
      })
    },
    handleDownloadTwo() {
      this.exportPast('agvTask', this.exportParams, 'export')
    },
    // 获取任务状态
    getDict() {
      API.getDict('dict', { name: 'TaskStatus' }).then(res => {
        this.queryItems[2].options = this.formList[0].options = res.details
      })
      API.getDict('dict', { name: 'TaskType' }).then(res => {
        this.queryItems[3].options = res.details
      })
    },
    // 报工
    handlWork() {
      this.dialogFormVisible = true
    },
    confirm() {
      let taskNo = this.multipleSelection[0].taskNo
      // console.log(taskNo)
      let taskStatus = this.formData.TaskStatus
      agvAPI
        .put('agvTask', { taskNo: taskNo, taskStatus: taskStatus }, 'updateTaskStatus')
        .then(res => {
          if (res.success) {
            this.$notify({
              title: this.$t('notify.success'), // 成功
              message: res.message, // 返回成功信息
              type: 'success',
              duration: 2000
            })
            this.getList()
            this.dialogFormVisible = false
          } else {
            this.$notify({
              title: this.$t('notify.failure'), // 失败
              message: res.message, // 返回失败信息
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(() => {
          this.dialogFormVisible = false
        })
      return true
    }
  }
}
</script>
