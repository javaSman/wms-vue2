<template>
  <div class="components-container">
    <div class="head-container">
      <filter-collapse :form-items="inStockQueryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="inStockCrud"
        :button-items="BtnItems"
        :selection="multipleSelection"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
      />
    </div>
    <div ref="splitArea" class="splitArea">
      <split-pane split="horizontal" :min-percent="25.5" :default-percent="50" @resize="resize">
        <template slot="paneL">
          <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
          <Table
            v-if="tableShow"
            ref="table"
            v-loading="listLoading"
            :height="topTableH"
            :data-list="list"
            :column="column"
            :selection.sync="multipleSelection"
            :total="totalCount"
            :page.sync="page"
            :limit.sync="listQuery.MaxResultCount"
            :is-sort="true"
            :sorting.sync="listQuery.Sorting"
            :dict-gather="dictGather"
            @getDetail="getDetail"
            @pagination="getList"
            @tableSort="getList"
          />
        </template>
        <template slot="paneR">
          <!-- '入库单明细' -->
          <h4>{{ $t('dialogHeader.inStockOrderDetails') }}</h4>
          <ColDesign
            tid="DetailTable"
            :col-list="columnDetail"
            :table-show.sync="detailTableShow"
            @resetColDetail="resetColDetail"
          />
          <Table
            v-if="detailTableShow"
            ref="tableDetail"
            v-loading="detailListLoading"
            :height="bottomTableH"
            :data-list="multipleSelection.length === 1 ? detailTable : []"
            :column="columnDetail"
            :has-selection="false"
            :page-hidden="true"
            :dict-gather="dictGather"
          />
        </template>
      </split-pane>
    </div>
    <EditDetailOptDialog
      v-if="dialogFormVisible"
      :dialog-form-visible.sync="dialogFormVisible"
      :layout="layout"
      :form-title="formTitle"
      :form-data="form"
      :detail-table.sync="detailTable"
      :is-edit="isEdit"
      :form-list="inStockFormList"
      :table-list="inStockTableList"
      :detail-all="detailAll"
      :api-name="apiName"
      :detail-title="detailTitle"
      :col-detail-name="colDetailName"
      :api-detail-name="apiDetailName"
      :detail-query-items="materialQueryItems"
      :check-params="checkParams"
      :dict-gather="dictGather"
      :apiSuffix="apiSuffix"
      @create="handleCreate"
      @reset="reset"
      @cancel="cancel"
    />
  </div>
</template>
<script>
import CrudOperation from '@/components/Crud/CRUD.operation'
import Table from '@/components/Table'
import EditDetailOptDialog from './module/index'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import splitPane from '@/mixins/splitPane'
import basics from '@/mixins'
import {
  inStockQueryItems,
  inStockCrud,
  inStockFormList,
  inStockTableList,
  materialQueryItems,
  BtnItems
} from './config'
export default {
  name: 'InStockOrder',
  components: { Table, EditDetailOptDialog, CrudOperation },
  mixins: [colDesign, filterContainer, basics, splitPane],
  data() {
    return {
      colName: 'InStockAllDto',
      detailColName: 'InStockDetail',
      dialogTitle: this.$t('dialogHeader.inStockOrder'), // '入库单',
      apiName: 'inStock',

      inStockQueryItems,
      inStockCrud,
      inStockFormList,
      inStockTableList,

      checkParams: 'materialNo',
      colDetailName: 'Material',
      apiDetailName: 'material',
      detailTitle: this.$t('dialogHeader.materials'), // '物料',

      materialQueryItems,
      detailAll: [],
      layout: { span: 8 },
      rowIndex: 0,

      form: {},
      listQuery: {
        IsPage: true
      },
      dialogFormVisible: false,
      formTitle: '',
      isEdit: false,

      detailListLoading: false,
      detailTable: [], // 明细表
      bottomH: '70',
      BtnItems,
      apiSuffix: ''
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    //获取子表明细
    getDetail(row) {
      this.detailListLoading = true
      API.get('inStock', { orderNo: row.orderNo }, 'GetInStockDetailList').then(res => {
        this.detailTable = res
        this.detailListLoading = false
      })
    },
    handleDelete() {
      let row = this.multipleSelection
      if (row.length === 0) {
        this.$message.error('请勾选数据后在执行操作！')
        return
      }
      this.$confirm(this.$t('dialog.deleteTips'), this.$t('dialog.tip'), {
        confirmButtonText: this.$t('button.confirm'), // '确认'
        cancelButtonText: this.$t('button.cancel'), // '取消'
        type: 'warning'
      })
        .then(() => {
          this.BtnItems[2].loading = true

          let ids = []
          row.forEach(item => {
            ids.push(item.id)
          })
          API.dataPost('inStock', ids, 'Delete')
            .then(res => {
              if (res.success) {
                this.BtnItems[2].loading = false
                this.$notify({
                  title: this.$t('notify.success'), // '成功'
                  message: this.$t('notify.operateSuccess'), // '操作成功',
                  type: 'success',
                  duration: 2000
                })
                this.getList()
              } else {
                this.BtnItems[2].loading = true
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
              this.BtnItems[0].loading = true
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('notify.cancelDel') // '已取消删除'
          })
        })
    },
    getDict() {
      API.getDict('dict', { name: 'ReceiptStatus' }).then(res => {
        this.inStockQueryItems[2].options = res.details
      })
    },
    handleUpdate() {
      this.isEdit = true
      this.apiSuffix = 'Update'
      this.formTitle = '修改入库单管理'
      let row = this.multipleSelection[0]
      API.get('inStock', { orderNo: row.orderNo }, 'GetInStockDetailList').then(res => {
        this.detailTable = res
      })
      if (row.status === 'Finish') {
        this.$notify({
          title: this.$t('notify.failure'), // '失败'
          dangerouslyUseHTMLString: true,
          message: this.$t('notify.banEdit'), // '该单据已完成，无法进行修改',
          type: 'error',
          duration: 3000
        })
        this.dialogFormVisible = false
      } else {
        API.get('inStock', { id: row.id }, 'Get').then(res => {
          this.form = res
        })
        this.dialogFormVisible = true
      }
    },
    handleCreate() {
      // this.formTitle = ''
      this.isEdit = false
      this.apiSuffix = 'Create'
      this.rowIndex = 0
      this.form = {}
      this.dialogOpen()
    }
    // submit() {
    //   console.log(this.isEdit, this.apiSuffix)
    //   let param = { inStockInfo: this.form, inStockDetailList: this.detailTable }
    //   console.log(param)
    //   return true
    // }
  }
}
</script>
