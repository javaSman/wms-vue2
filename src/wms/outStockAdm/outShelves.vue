<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse
        :form-items="outShelvesQueryItems"
        :list-query.sync="listQuery"
        @query="getList"
        @reset="reset"
      />
      <CrudOperation
        :permission-crud="ReportsCrud"
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
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { outShelvesQueryItems, ReportsCrud } from './config'
export default {
  name: 'OutShelves',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'OutShelves',
      apiName: 'outshelves',
      outShelvesQueryItems,
      ReportsCrud,

      downloadLoading: false,
      exportParams: {},
      listQuery: {
        IsPage: true
      }
    }
  },
  created() {
    this.getDict()
    this.getWarehouse()
  },
  methods: {
    getDict() {
      // API.getDict('dict', { name: 'ShelvesType' }).then(res => {
      //   this.outShelvesQueryItems[7].options = res.details
      // })
      API.getDict('dict', { name: 'BoxState' }).then(res => {
        this.outShelvesQueryItems[6].options = res.details
      })
    },
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.warehouseID
          item.value = item.warehouseID
        })
        this.outShelvesQueryItems[1].options = res.items
      })
    },
    handleDownload() {
      this.export('outshelves', this.exportParams, 'Export')
    }
  }
}
</script>
