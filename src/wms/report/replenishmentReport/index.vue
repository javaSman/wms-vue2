<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse
        :form-items="warehousingReportItems"
        :list-query.sync="listQuery"
        @query="getList"
        @reset="reset"
      />
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
import { GetReplenishmentReportList } from '@/api/wcsAPI'
import { warehousingReportItems, BtnItems } from './config'

export default {
  name: 'ReplenishmentReport',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'ReplenishmentReport',
      // apiName: 'inStockStatistics',
      warehousingReportItems,
      isEdit: true,
      BtnItems,
      exportParams: { IsPage: false },
      downloadLoading: false,
      isData: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.SkipCount = (this.page - 1) * this.listQuery.MaxResultCount
      GetReplenishmentReportList(this.listQuery).then(res => {
        this.list = res.items
        this.totalCount = res.totalCount
        this.listLoading = false
      })
    },
    // 导出
    async handleDownloadPast() {
      if (this.list === null || this.list.length === 0) {
        this.$message.warning('当前表格数据为空！')
        return
      }
      try {
        let data = JSON.parse(JSON.stringify(this.listQuery))
        data['Type'] = 1
        GetReplenishmentReportList(data).then(res => {
          if (res.IsError) {
            this.$message.warning(res.ErrMsg)
            return
          }
          window.location.href = res.exportUrl
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
