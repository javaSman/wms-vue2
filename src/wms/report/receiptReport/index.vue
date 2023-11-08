<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="receiptReportItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :selection="multipleSelection"
        :button-items="BtnItems"
        :download-loading.sync="downloadLoading"
        @toDownload="handleDownloadPast()"
      />
    </div>
    <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
    <Table
      v-if="tableShow"
      ref="table"
      v-loading="listLoading"
      :has-selection="false"
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
  </div>
</template>
<script>
import Table from '@/components/Table'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import CrudOperation from '@/components/Crud/CRUD.operation'

import { receiptReportItems, BtnItems } from './config'
// import { API } from '@/api/generalAPI'

export default {
  name: 'ReceiptReport',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'ReceiveGoods',
      apiName: 'ReceiveInventory',
      receiptReportItems,
      isEdit: true,
      BtnItems,
      exportParams: { IsPage: false },
      downloadLoading: false,
      isData: false
    }
  },
  created() {},
  methods: {
    handleDownloadPast() {
      if (this.list === null) {
        this.$message.warning('当前表格数据为空！')
      } else {
        let Ids = [] // 选中的id集
        if (this.multipleSelection.length > 0) {
          //  如果有选中的数据，就导出选中的数据，否则全部导出或根据搜索条件导出
          this.multipleSelection.map(item => {
            Ids.push(item.id)
          })
          this.exportPast('ReceiveInventory', { Ids: Ids }, 'Export', true)
        } else {
          this.exportPast('ReceiveInventory', this.exportParams, 'Export', true)
        }
      }
    }
  }
}
</script>
