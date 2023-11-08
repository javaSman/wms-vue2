<template>
  <div class="components-container">
    <div class="head-container">
      <filter-collapse :form-items="QueryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <CrudOperation
      :permission-crud="Crud"
      :button-items="BtnItems"
      :selection="multipleSelection"
      :download-loading.sync="downloadLoading"
      @toDownload="handleDownloadPast()"
    />
    <!-- @toReprint="handleReprint()" -->
    <div ref="splitArea" class="splitArea">
      <split-pane split="horizontal" :min-percent="25.5" :default-percent="50" @resize="resize">
        <template slot="paneL">
          <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
          <Table
            v-if="tableShow"
            ref="table"
            v-loading="listLoading"
            :height="topTableH"
            :data-list="list"
            :column="column"
            :selection.sync="multipleSelection"
            :total="totalCount"
            :table-btn="TableBtn"
            :page.sync="page"
            :limit.sync="listQuery.MaxResultCount"
            :is-sort="true"
            :sorting.sync="listQuery.Sorting"
            :dict-gather="dictGather"
            @getDetail="getDetail"
            @pagination="getList"
            @tableSort="getList"
            @toAgree="handleAgree"
            @toCancel="handlecancel"
          />
        </template>
        <template slot="paneR">
          <!-- '载具明细' -->
          <h4>{{ $t('dialogHeader.adjust') }}</h4>
          <ColDesign
            tid="DetailTable"
            :col-list="columnDetail"
            :table-show.sync="detailTableShow"
            @resetColDetail="resetColDetail"
          />
          <Table
            v-if="detailTableShow"
            ref="tableDetail"
            v-loading="detailListLoading"
            :height="bottomTableH"
            :data-list="multipleSelection.length === 1 ? detailTable : []"
            :column="columnDetail"
            :has-selection="false"
            :page-hidden="true"
            :dict-gather="dictGather"
            :has-index="true"
          />
        </template>
      </split-pane>
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import splitPane from '@/mixins/splitPane'
import basics from '@/mixins'

import { QueryItems, Crud, TableBtn, BtnItems } from './config'
export default {
  name: 'Box',
  components: {
    Table,
    CrudOperation
  },
  mixins: [colDesign, filterContainer, basics, splitPane],
  data() {
    return {
      colName: 'AdjustHeader',
      detailColName: 'AdjustDetail',
      apiName: 'Adjust',

      QueryItems,
      Crud,
      BtnItems,
      TableBtn,

      detailQuery: {
        id: null
      },
      detailTable: [],

      listLoading: true,
      detailListLoading: false,
      downloadLoading: false,
      exportParams: {}
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    getDict() {
      API.getDict('dict', { name: 'AdjustStatus' }).then(res => {
        this.QueryItems[2].options = res.details
      })
    },
    getDetail(row) {
      this.detailListLoading = true
      this.detailQuery.id = row.id
      API.getData('Adjust', this.detailQuery, this.multipleSelection[0].id).then(res => {
        this.detailTable = res
        this.detailListLoading = false
      })
    },
    // 导出
    handleDownloadPast() {
      this.exportPast('Adjust', this.exportParams, 'Export')
    },
    handleAgree(row) {
      if (row.row.status === '1') {
        this.$message({
          message: '状态为已审核不可点击同意',
          type: 'error',
          duration: 5000
        })
      } else if (row.row.status === '-1') {
        this.$message({
          message: '状态为作废不可以点击同意',
          type: 'error',
          duration: 5000
        })
      } else {
        this.$confirm('是否同意该库存调整申请', this.$t('dialog.tip'), {
          confirmButtonText: this.$t('button.confirm'), // '确认'
          cancelButtonText: this.$t('button.cancel'), // '取消'
          type: 'warning'
        }).then(() => {
          let params = {
            id: row.row.id,
            auditID: sessionStorage.getItem('users_name'),
            auditName: sessionStorage.getItem('name')
          }
          API.dataPost('Adjust', params, 'Agree').then(res => {
            if (res.success) {
              this.$notify({
                title: this.$t('notify.success') /* 成功 */,
                message: res.message /* 返回成功信息 */,
                type: 'success',
                duration: 2000
              })
              this.getList()
            } else {
              this.$notify({
                title: this.$t('notify.failure') /* 失败 */,
                message: res.message /* 返回失败信息 */,
                type: 'error',
                duration: 2000
              })
            }
          })
        })
      }
    },
    handlecancel(row) {
      if (row.row.status === '1') {
        this.$message({
          message: '状态为已审核不可点击作废',
          type: 'error',
          duration: 5000
        })
      } else if (row.row.status === '-1') {
        this.$message({
          message: '状态为作废不可再次点击作废',
          type: 'error',
          duration: 5000
        })
      } else {
        this.$confirm('是否作废该库存调整申请', this.$t('dialog.tip'), {
          confirmButtonText: this.$t('button.confirm'), // '确认'
          cancelButtonText: this.$t('button.cancel'), // '取消'
          type: 'warning'
        }).then(() => {
          let params = {
            id: row.row.id,
            auditID: sessionStorage.getItem('users_name'),
            auditName: sessionStorage.getItem('name')
          }
          API.dataPost('Adjust', params, 'DisAgree').then(res => {
            if (res.success) {
              this.$notify({
                title: this.$t('notify.success') /* 成功 */,
                message: res.message /* 返回成功信息 */,
                type: 'success',
                duration: 2000
              })
              this.getList()
            } else {
              this.$notify({
                title: this.$t('notify.failure') /* 失败 */,
                message: res.message /* 返回失败信息 */,
                type: 'error',
                duration: 2000
              })
            }
          })
        })
      }
    }
  }
}
</script>
