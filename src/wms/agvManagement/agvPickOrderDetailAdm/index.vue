<template>
  <div class="app-container">
    <div class="head-container">
      <filter-container
        :form-items="materialQequisitionItems"
        :list-query.sync="listQuery"
        @query="getList"
        @reset="reset"
      />
      <CrudOperation :button-items="BtnItems" :selection="multipleSelection" @toDownload="handleDownloadPast()" />
    </div>
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
            :page.sync="page"
            :limit.sync="listQuery.MaxResultCount"
            :is-sort="true"
            :sorting.sync="listQuery.Sorting"
            :dict-gather="dictGather"
            @getDetail="getDetail"
            @pagination="getList"
            @tableSort="getList"
            @headRowClick="headRowClick"
          />
        </template>
        <template slot="paneR">
          <!-- '领料单明细' -->
          <h4>{{ $t('dialogHeader.PickOrderDetail') }}</h4>
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
            row-key="id"
            :height="bottomTableH"
            :data-list="multipleSelection.length === 1 ? detailTable : []"
            :column="columnDetail"
            :tree-selection.sync="treeSelection"
            :has-selection="false"
            :dict-gather="dictGather"
          />
        </template>
      </split-pane>
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table'
import CrudOperation from '@/components/Crud/CRUD.operation'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import splitPane from '@/mixins/splitPane'
import basics from '@/mixins'
import { materialQequisitionItems, BtnItems } from './config'
export default {
  name: 'AgvPickOrderDetailAdm',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics, splitPane],
  data() {
    return {
      colName: 'AGVPickOrderDetail',
      detailColName: 'PickOrderDetail',
      apiName: 'pickingResume',
      materialQequisitionItems,
      BtnItems,
      detailListLoading: false,
      detailTable: [],
      columnTree: [],
      expandDataList: [],
      treeSelection: [],
      listQuery: {
        IsPage: true
      },
      exportParams: { IsPage: false },
      batchData: {},
      outShelvesDialogVisible: false,
      lodop: '',
      printData: [],
      printBegin: false,
      theadData: {},
      dialogFormVisible: false,
      // bottomH: 40, // 下表格按钮高度
      dialogTitle: '' // 弹窗标题
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    /** 获取数据字典-领料单状态 */
    getDict() {
      API.getDict('dict', { name: 'ReceiveStatus' }).then(res => {
        this.materialQequisitionItems[4].options = res.details
      })
    },
    /** 获取领料明细 */
    getDetail(row) {
      this.detailListLoading = true
      if (!row.pickingNo) {
        this.detailTable = []
        this.detailListLoading = false
        return
      }
      API.getData(this.apiName, { pickingNo: row.pickingNo }, 'getDetails').then(res => {
        this.detailTable = res.items
        if (res) {
          // 加载所有展开行数据
          let i = 0
          this.detailTable.map(row => {
            row.expanded = false // 增加行展开状态
            this.$refs.tableDetail.expandChange(row, i) // rowIndex 在渲染表格 rowClass 时加入，未渲染时，根据数据行顺序 i 写入
            i++
          })
        }
        this.detailListLoading = false
      })
    },
    headRowClick() {
      this.treeSelection = []
      this.$refs.tableDetail.treeRowsObj = {}
    },
    handleDownloadPast() {
      // let Ids = [] // 选中的id集
      // if (this.multipleSelection.length > 0) {
      //   //  如果有选中的数据，就导出选中的数据，否则全部导出或根据搜索条件导出
      //   this.multipleSelection.map(item => {
      //     console.log(item)
      //     Ids.push(item.id)
      //   })
      //   this.exportPast('pickingResume', { Ids: Ids }, 'export')
      // } else {
      this.exportPast('pickingResume', this.exportParams, 'export')
      // }
    }
  }
}
</script>
