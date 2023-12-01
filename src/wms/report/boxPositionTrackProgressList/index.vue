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

import { queryItems, BtnItems } from './config'
import { API } from '@/api/generalAPI'
import { GetRpBoxPositionTrackProgressList } from '@/api/wcsAPI'
export default {
  name: 'BoxPositionTrackProgressList',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'BoxPositionTrackProgressDto',
      // apiName: 'inStockStatistics',
      queryItems,
      isEdit: true,
      BtnItems,
      downloadLoading: false,
      exportParams: { IsPage: false }
    }
  },
  created() {
    this.getList()
    this.getDict()
    this.getTime()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.SkipCount = (this.page - 1) * this.listQuery.MaxResultCount
      GetRpBoxPositionTrackProgressList(this.listQuery).then(res => {
        this.list = res.items
        this.totalCount = res.totalCount
        this.listLoading = false
      })
    },
    getDict() {
      // 类型
      API.getDict('dict', { name: 'BoxPositionTrackProgressDto' }).then(res => {
        this.queryItems[1].options = res.details
      })
    },
    // 给时间一个默认值，当天
    getTime() {
      // let oneMonthAgo = new Date().setMonth(new Date().getMonth() - 1) // 获取一个月前的日期
      this.$set(this.listQuery, 'EndCreateTime', this.formatterTime(new Date()) + ' 23:59:59') // 获取当前日期
      this.$set(this.listQuery, 'BeginCreateTime', this.formatterTime(new Date()) + ' 00:00:00')
    },
    // 时间戳转换成年月日时分秒
    formatterTime(timestamp) {
      const date = new Date(timestamp)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1)
      const day = (date.getDate() < 10 ? '0' : '') + date.getDate()
      // const hours = (date.getHours() < 10 ? '0' : '') + date.getHours()
      // const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
      // const seconds = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()
      const formattedDate = `${year}-${month}-${day}`
      return formattedDate
    },

    async handleDownloadPast() {
      if (this.list === null || this.list.length === 0) {
        this.$message.warning('当前表格数据为空！')
        return
      }
      try {
        let data = JSON.parse(JSON.stringify(this.listQuery))
        data['IsExport'] = 1
        GetRpBoxPositionTrackProgressList(data).then(res => {
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
