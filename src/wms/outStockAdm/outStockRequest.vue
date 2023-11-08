<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse
        :form-items="outStockRequestQueryItems"
        :list-query.sync="listQuery"
        @query="getList"
        @reset="reset"
      />
      <CrudOperation
        :permission-crud="outStockRequestCrud"
        :download-loading.sync="downloadLoading"
        @toExport="handleDownload()"
      />
    </div>
    <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
    <Table
      v-if="tableShow"
      ref="table"
      v-loading="listLoading"
      has-index
      :height="-1"
      :data-list="list"
      :column="column"
      :total="totalCount"
      :page.sync="page"
      :limit.sync="listQuery.MaxResultCount"
      :is-sort="true"
      :sorting.sync="listQuery.Sorting"
      :has-selection="false"
      :dict-gather="dictGather"
      @pagination="getList"
      @tableSort="getList"
    />
  </div>
</template>
<script>
import CrudOperation from '@/components/Crud/CRUD.operation'

import Table from '@/components/Table'
// import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { outStockRequestQueryItems, outStockRequestCrud } from './config'
export default {
  name: 'OutShelves',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'OutStockRequest',
      apiName: 'OutStockRequest',
      outStockRequestQueryItems,
      outStockRequestCrud,

      downloadLoading: false,
      exportParams: {},
      listQuery: {
        IsPage: true
      }
    }
  },
  created() {},
  methods: {
    getDict() {},
    handleDownload() {
      this.export('outshelves', this.exportParams, 'Export')
    }
  }
}
</script>
