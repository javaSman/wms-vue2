<template>
  <div class="app-container">
    <div class="head-container" style="position: relative">
      <filter-collapse
        :form-items="inventoryReportItems"
        :list-query.sync="listQuery"
        @query="getList"
        @reset="reset"
      />
      <CrudOperation
        style="display: inline-block"
        :selection="multipleSelection"
        :permission-crud="inventoryReportCrud"
        :button-items="inventoryReportBtnItems"
        :download-loading.sync="downloadLoading"
        @toExport="handleDownloadPast()"
      />
      <div style="display: inline-block; position: absolute; right: 4%">当前页面数量总计:{{ arrSum }}</div>
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
      :has-selection="false"
      :limit.sync="listQuery.MaxResultCount"
      :is-sort="true"
      :has-index="true"
      :dict-gather="dictGather"
      :sorting.sync="listQuery.Sorting"
      @pagination="getList"
      @tableSort="getList"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import CrudOperation from '@/components/Crud/CRUD.operation'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import { inventoryReportItems, inventoryReportCrud, inventoryReportBtnItems } from './config'
export default {
  name: 'InventoryReport',
  components: {
    Table,
    CrudOperation
  },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'InventoryReport',
      apiName: 'BoxInventory',
      inventoryReportItems,
      inventoryReportCrud,
      inventoryReportBtnItems,
      downloadLoading: false,
      exportParams: { IsPage: false },
      isEdit: true,
      arrSum: 0,
      isData: false
    }
  },
  watch: {
    list() {
      let arrSums = 0
      this.list.forEach(item => {
        arrSums += Number(item.quantity.toFixed(2))
      })
      this.arrSum = arrSums.toFixed(2)
    }
  },
  created() {
    this.getWarehouse()
    this.getDict()
    this.getNewWarehouse()
  },
  methods: {
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.warehouseName
          item.value = item.warehouseNo
        })
        this.inventoryReportItems[7].options = res.items
      })
    },
    getNewWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        if (res.items.length !== 0) {
          let index = res.items[0].warehouseNo
          console.log(index)
          this.$set(this.listQuery, 'WarehouseNo', index.toString())
        }
      })
    },
    getDict() {
      // 载具位置状态
      API.getDict('dict', { name: 'BoxPositionStatus' }).then(res => {
        this.inventoryReportItems[3].options = res.details
      })
      // 载具装载状态
      API.getDict('dict', { name: 'BoxState' }).then(res => {
        this.inventoryReportItems[4].options = res.details
      })
    },
    async handleDownloadPast() {
      if (this.list === null || this.list.length === 0) {
        this.$message.warning('当前表格数据为空！')
        return
      }
      try {
        let data = JSON.parse(JSON.stringify(this.listQuery))
        data['Type'] = 1
        let res = await API.get('BoxInventory', data, 'all')
        if (res.IsError) {
          this.$message.warning(res.ErrMsg)
          return
        }
        window.location.href = res.exportUrl
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
