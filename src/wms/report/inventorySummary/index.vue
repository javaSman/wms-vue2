<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse
        :form-items="inventorySummaryItems"
        :list-query.sync="listQuery"
        @query="getList"
        @reset="reset"
      />
      <CrudOperation
        :selection="multipleSelection"
        :button-items="inventorySummaryBtnItems"
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
// import { API } from '@/api/generalAPI'
import CrudOperation from '@/components/Crud/CRUD.operation'
import { inventorySummaryItems, inventorySummaryBtnItems } from './config'
export default {
  name: 'InventorySummary',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'MaterialReportDto',
      apiName: 'MaterialInventory',
      inventorySummaryItems,
      inventorySummaryBtnItems,
      downloadLoading: false,
      isEdit: true,
      exportParams: { IsPage: false },
      isData: false
    }
  },
  created() {},
  methods: {
    handleDownloadPast() {
      if (this.list === null) {
        this.$message.warning('当前表格数据为空！')
      } else {
        this.exportPast('MaterialInventory', this.exportParams, 'export')
      }
    }
  }
}
</script>
