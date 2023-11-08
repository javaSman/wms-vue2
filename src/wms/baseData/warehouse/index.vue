<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="WarehouseCrud"
        :selection="multipleSelection"
        :button-items="BtnItems"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toExport="handleExport()"
        @toSynchronizeWarehouse="handSynchronizeWarehouse()"
        @toCorrespond="handleCorrespond()"
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
      :form-data="form"
      :is-edit="isEdit"
      :api-name="apiName"
      :dialog-width="550"
      :layout="layout"
      @create="handleCreate"
      @cancel="cancel"
      @reset="reset"
    />
    <TBShelf
      :form-title="dialogTitles"
      :dialog-form-visible="TBDialogVisible"
      :form-list="ShelfForm"
      :form-data="ShelfData"
      :is-edit="true"
      :submit="submit"
      @reset="reset"
      @cancel="dialogCancel"
    />
    <Correspond
      :form-title="corresponddialogTitles"
      :dialog-form-visible="correspondVisible"
      :form-list="correspondForm"
      :form-data="correspondData"
      :is-edit="true"
      :submit="correspondSubmit"
      @reset="reset"
      @cancel="dialogCancel"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import TBShelf from '@/components/EditDialog'
import Correspond from '@/components/EditDialog'

import EditForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { API } from '@/api/generalAPI'
import { formList, queryItems, WarehouseCrud, BtnItems, ShelfForm, correspondForm } from './config'
export default {
  name: 'Warehouse',
  components: { Table, EditForm, CrudOperation, TBShelf, Correspond },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'Warehouse',
      apiName: 'warehouse',
      dialogTitle: this.$t('dialogHeader.warehouse'), // '仓库',

      formList,
      queryItems,
      WarehouseCrud,
      BtnItems,
      form: {},
      dialogFormVisible: false,
      formTitle: '',
      isEdit: false,
      dialogTitles: '同步仓库信息',
      TBDialogVisible: false,
      ShelfForm,
      ShelfData: {},
      loading: false,
      formLoading: false,
      layout: { gutter: 10, span: 24, xs: 24, sm: 12, md: 8, xl: 6 },
      corresponddialogTitles: '',
      correspondVisible: false,
      correspondForm,
      correspondData: {}
    }
  },
  created() {
    this.getDict()
    this.getWarehouse()
  },
  methods: {
    // /** 获取仓库编码下拉框值WarehouseType: 'Waste,Shelf,Nonproductive' */
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.warehouseID
          item.value = item.warehouseID
        })
        this.correspondForm[0].options = res.items
      })
    },
    getDict() {
      API.getDict('dict', { name: 'WarehouseType' }).then(res => {
        this.formList[3].options = res.details
      })
    },
    handSynchronizeWarehouse() {
      this.ShelfData = {}
      this.TBDialogVisible = true
    },
    dialogCancel(val) {
      this.TBDialogVisible = false
      this.correspondVisible = false
    },
    async submit() {
      await API.get(
        'erp',
        { starttime: this.ShelfData.starttime, endtime: this.ShelfData.endtime },
        'SyncWarehouseInfo'
      )
        .then(res => {
          if (res.success) {
            this.TBDialogVisible = false
            this.$notify({
              title: this.$t('notify.success'), // '成功'
              message: this.$t('notify.operateSuccess'), // '操作成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          } else {
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
          this.TBDialogVisible = false
        })
      return true
    },
    handleCorrespond() {
      let row = this.multipleSelection[0]
      console.log(row)
      if (row.isRealWarehouse == true) {
        this.correspondData = {}
        this.correspondVisible = true
        this.corresponddialogTitles = '物理仓对应'
        API.get('warehouse', { Actual: row.warehouseID }, 'GetWareHouseBanding').then(res => {
          if (res.success) {
            let fictitiousList = []
            res.datas.forEach(item => {
              fictitiousList.push(item.fictitious)
            })
            this.$set(this.correspondData, 'fictitious', fictitiousList)
          }
        })
      } else {
        this.$message.warning('请先选择物理仓库进行操作！')
      }
    },
    correspondSubmit() {
      let row = this.multipleSelection[0]
      this.$set(this.correspondData, 'actual', row.warehouseID)
      console.log(this.correspondData)
      API.dataPost('warehouse', this.correspondData, 'WareHoseBanding').then(res => {
        // console.log(res)
        if (res.success) {
          this.correspondVisible = false
          this.getList()
          this.$notify({
            title: this.$t('notify.success'), // '成功'
            message: '操作成功', // '操作成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: this.$t('notify.failure'), // '失败'
            message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',
            type: 'error',
            duration: 2000
          })
        }
      })
      return true
    }
  }
}
</script>
