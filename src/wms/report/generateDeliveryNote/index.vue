<template>
  <div class="app-container">
    <div class="head-container">
      <filterContainer
        :form-items="queryItems"
        :list-query.sync="listQuery"
        :high-search-list="highSearchList"
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
      :has-index="true"
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

import { queryItems, highSearchList, BtnItems } from './config'
import { getGenerateDeliveryNote } from '@/api/wcsAPI'
export default {
  name: 'GenerateDeliveryNote',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'generateDeliveryNote',
      queryItems,
      highSearchList,
      BtnItems,
      downloadLoading: false,
      isEdit: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.SkipCount = (this.page - 1) * this.listQuery.MaxResultCount
      getGenerateDeliveryNote(this.listQuery).then(res => {
        this.list = res.items
        this.totalCount = res.totalCount
        this.listLoading = false
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
        getGenerateDeliveryNote(data).then(res => {
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
