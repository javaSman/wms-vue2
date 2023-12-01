<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
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
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import CrudOperation from '@/components/Crud/CRUD.operation'
import { GetTransferMaterialResumeList } from '@/api/wcsAPI'
import { queryItems, BtnItems } from './config'
// import { API } from '@/api/generalAPI'

export default {
  name: 'TransferMaterialResumeList',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'TransferMaterialResume',
      apiName: 'TransferMaterialResume',
      queryItems,
      isEdit: true,
      BtnItems,
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
      GetTransferMaterialResumeList(this.listQuery).then(res => {
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
        GetTransferMaterialResumeList(data).then(res => {
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
