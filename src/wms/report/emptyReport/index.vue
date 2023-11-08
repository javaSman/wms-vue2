<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="receiptReportItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :selection="multipleSelection"
        :button-items="BtnItems"
        :download-loading.sync="downloadLoading"
        @toOffShelf="handleOffShelf()"
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
      :dict-gather="dictGather"
      :sorting.sync="listQuery.Sorting"
      @pagination="getList"
      @tableSort="getList"
    />
    <EditForm
      :dialog-form-visible="dialogFormVisible"
      :form-title="formTitle"
      :form-list="configFormList"
      :form-data="form"
      :is-edit="isEdit"
      :submit="toReportShelf"
      @cancel="cancel"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import CrudOperation from '@/components/Crud/CRUD.operation'
import EditForm from '@/components/EditDialog'
import { receiptReportItems, BtnItems, configFormList } from './config'
import { API } from '@/api/generalAPI'

export default {
  name: 'ReceiptReport',
  components: { Table, CrudOperation, EditForm },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'BlankBox',
      apiName: 'blankbox',
      receiptReportItems,
      isEdit: true,
      formTitle: '下架',
      configFormList,
      BtnItems,
      form: {},
      listQuery: {
        IsPage: true
      },
      exportParams: { IsPage: false },
      downloadLoading: false,
      isData: false,
      dialogFormVisible: false,
      warehouse_Wharf: '',
      warehouseNew: '',
      DictName: ''
    }
  },
  created() {
    this.getDict()
    this.getWarehouse()
  },
  methods: {
    // handleDownloadPast() {
    //   if (this.list === null) {
    //     this.$message.warning('当前表格数据为空！')
    //   } else {
    //     let Ids = [] // 选中的id集
    //     if (this.multipleSelection.length > 0) {
    //       //  如果有选中的数据，就导出选中的数据，否则全部导出或根据搜索条件导出
    //       this.multipleSelection.map(item => {
    //         Ids.push(item.id)
    //       })
    //       this.exportPast('ReceiveInventory', { Ids: Ids }, 'Export', true)
    //     } else {
    //       this.exportPast('ReceiveInventory', this.exportParams, 'Export', true)
    //     }
    //   }
    // },
    getDict() {
      // 载具类型
      API.getDict('dict', { name: 'BoxType' }).then(res => {
        this.receiptReportItems[1].options = res.details
      })
      API.getDict('dict', { name: 'BoxPositionStatus' }).then(res => {
        this.receiptReportItems[4].options = res.details
      })
    },
    /* 获取仓库信息 */
    getWarehouse() {
      API.getData('warehouse', { IsPage: false }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.warehouseName
          item.value = item.warehouseNo
        })
        this.configFormList[0].options = this.receiptReportItems[3].options = res.items
      })
    },
    /* 下架 */
    handleOffShelf() {
      this.dialogFormVisible = true
      this.getWarehouse()
      this.configFormList.forEach(item => {
        switch (item.prop) {
          case 'warehouse': {
            item.change = () => {
              this.warehouseNew = this.form.warehouse
              this.warehouse_Wharf = this.warehouseNew + '_' + 'Wharf'
              API.getData('dict', { SkipCount: 0, MaxResultCount: 20 }, 'all').then(res => {
                res.items.forEach(item => {
                  this.DictName = item.name
                  if (this.DictName.includes(this.warehouse_Wharf)) {
                    API.getDict('dict', { name: this.warehouse_Wharf }).then(res => {
                      this.configFormList[1].options = res.details
                    })
                  } else {
                    this.configFormList[1].options = []
                  }
                })
              })
            }
            break
          }
        }
      })
    },
    /* 下架确定 */
    toReportShelf() {
      let newList = []
      let Array = []
      let arr = []
      this.multipleSelection.forEach(item => {
        newList.push(item.boxNo)
        Array.push(item.warehouseNo)
        arr.push(item.locationNo)
      })
      let params = {
        details: { boxNo: newList, warehouseNo: Array, locationNo: arr },
        wharfID: this.form.wharfNo
      }
      API.dataPost('blankbox', params, 'blankout')
        .then(res => {
          if (res.success) {
            this.dialogFormVisible = false
            this.$notify({
              title: this.$t('notify.success') /* 成功 */,
              message: res.message /* 返回成功信息 */,
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: this.$t('notify.failure') /* 失败 */,
              message: res.message /* 返回失败信息 */,
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(e => {})
      return true
    }
  }
}
</script>
