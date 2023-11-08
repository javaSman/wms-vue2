<template>
  <div class="app-container">
    <div class="head-container">
      <filter-container :form-items="sortingQueryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div ref="splitArea" class="splitArea">
      <split-pane split="horizontal" :min-percent="25.5" :default-percent="50" @resize="resize">
        <template slot="paneL">
          <CrudOperation
            :button-items="sortingBtnItem"
            :selection="multipleSelection"
            @toCancel="handleCancelSorting()"
          />
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
            :has-selection="true"
            :dict-gather="dictGather"
            @getDetail="getDetail"
            @pagination="getList"
            @tableSort="getList"
          />
        </template>
        <template slot="paneR">
          <el-tabs v-model="activeName" style="margin-top: 10px">
            <!-- '分拣单明细' -->
            <el-tab-pane :label="$t('dialogHeader.sortingOrderDetails')" name="sortingOrderDetails">
              <ColDesign
                tid="DetailTable"
                :col-list="columnDetail"
                :table-show.sync="detailTableShow"
                @resetColDetail="resetColDetail"
              />
              <CrudOperation
                :button-items="sortingDetailBtnItem"
                :selection="detailMultSelection"
                @toCancel="handleCancel()"
              />
              <Table
                v-if="detailTableShow"
                ref="tableDetail"
                v-loading="detailListLoading"
                :height="bottomTableH"
                :selection.sync="detailMultSelection"
                :data-list="multipleSelection.length === 1 ? detailTable : []"
                :column="columnDetail"
                :page-hidden="true"
                :dict-gather="dictGather"
              />
            </el-tab-pane>
            <!-- '分拣箱明细' -->
            <el-tab-pane :label="$t('dialogHeader.sortingBoxDetails')" name="sortingBoxDetails">
              <ColDesign
                tid="BoxDetailTable"
                :col-list="columnBoxDetail"
                :table-show.sync="boxDetailTableShow"
                @resetColDetail="resetColBoxDetail"
              />
              <CrudOperation
                :button-items="sortingBoxBtnItems"
                :selection="boxDetailMultSelection"
                @toPosting="handlePosting()"
              />
              <Table
                v-if="detailTableShow"
                ref="tableDetail"
                v-loading="boxDetailListLoading"
                :height="bottomTableH"
                :selection.sync="boxDetailMultSelection"
                :data-list="multipleSelection.length === 1 ? boxDetailTable : []"
                :column="columnBoxDetail"
                :has-selection="true"
                :page-hidden="true"
                :dict-gather="dictGather"
              />
            </el-tab-pane>
          </el-tabs>
        </template>
      </split-pane>
    </div>
  </div>
</template>
<script>
import CrudOperation from '@/components/Crud/CRUD.operation'
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import splitPane from '@/mixins/splitPane'
import basics from '@/mixins'
import { sortingQueryItems, sortingBtnItem, sortingBoxBtnItems, sortingDetailBtnItem } from './config'
export default {
  name: 'Sorting',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics, splitPane],
  data() {
    return {
      colName: 'SortingHeader',
      detailColName: 'SortingDetails',
      boxDetailColName: 'SortingBoxs',
      apiName: 'sortingheader',
      apiColName: 'usertabletemplatedetail',
      apiDetailsName: 'sortingdetails',
      sortingQueryItems,
      sortingBtnItem,
      sortingDetailBtnItem,
      sortingBoxBtnItems,

      detailTable: [],
      boxDetailTable: [],
      detailMultSelection: [],
      boxDetailMultSelection: [],
      detailListLoading: false,
      boxDetailListLoading: false,

      columnBoxDetail: [],
      boxDetailTableShow: false,

      activeName: 'sortingOrderDetails',
      multipleSelections: [], // 分拣单明细表多选框数据

      bottomH: 30, // 下表格按钮高度
      extraH: 40 // 额外高度消耗
    }
  },
  created() {
    this.getDict()
    this.getColBox()
  },
  mounted() {
    this.topTableH = this.splitArea * 0.5 - 64 - this.extraH
  },
  methods: {
    getDict() {
      API.getDict('dict', { name: 'OrderStatus' }).then(res => {
        this.sortingQueryItems[1].options = res.details
      })
      API.getDict('dict', { name: 'SortingMode' }).then(res => {
        this.sortingQueryItems[2].options = res.details
      })
      API.getDict('dict', { name: 'Priority' }).then(res => {
        this.sortingQueryItems[6].options = res.details
      })
    },
    /** 重写获取明细方法 */
    getDetail(row) {
      this.detailListLoading = true
      this.boxDetailListLoading = true
      this.formTitle = this.$t('dialog.edit') + this.dialogTitle // '编辑'
      this.isEdit = true
      API.getForm(this.apiName, row.id).then(res => {
        this.detailTable = res.details
        this.form = res.header
        this.detailListLoading = false
      })
      API.getData(this.apiDetailsName, { orderID: row.orderID }, 'GetSortingBoxs').then(res => {
        this.boxDetailTable = res.datas
        this.boxDetailListLoading = false
      })
    },
    /** 获取分拣箱明细表头数据 */
    getColBox() {
      if (this.boxDetailColName) {
        API.getForm(this.apiColName, this.boxDetailColName).then(res => {
          this.columnBoxDetail = res
          this.boxDetailTableShow = true
        })
      }
    },
    /** 重置分拣箱明细表列自定义数据设置 */
    resetColBoxDetail(val) {
      this.columnBoxDetail = val
      this.$nextTick(function () {
        this.boxDetailTableShow = true
      })
    },
    /** 分拣箱过账 */
    handlePosting() {
      let params = { barcode: this.boxDetailMultSelection[0].barcode }
      API.post(this.apiName, params, 'BarcodePost').then(res => {
        if (res.success === true) {
          this.$message({
            message: '过账成功',
            type: 'success'
          })
          // 刷新明细数据
          this.getDetail(this.multipleSelection[0])
        } else {
          this.$message({
            message: '过账失败',
            type: 'error'
          })
        }
      })
    },
    /** 分拣单取消 */
    handleCancelSorting() {
      let unfinished = false
      let params = []
      this.multipleSelection.forEach(item => {
        if (item.statusID === '创建') {
          params.push(item.id)
        } else {
          unfinished = true
        }
      })
      if (unfinished) {
        this.$message({
          message: '只有创建状态才可以取消', // '只有创建状态才可以取消',
          type: 'warning'
        })
      } else {
        this.updateState(params)
      }
    },
    /** 分拣单取消方法 */
    updateState(params) {
      API.dataPost(this.apiName, params, 'Cancel').then(res => {
        if (res === true) {
          this.$message({
            message: this.$t('notify.hasCanceled'),
            type: 'success'
          })
          this.getList()
        } else {
          this.$message({
            message: '取消失败',
            type: 'error'
          })
        }
      })
    },
    /** 分拣单明细表取消 */
    handleCancel() {
      let unfinished = false
      let params = []
      this.detailMultSelection.forEach(item => {
        if (item.statusID !== '完成') {
          params.push(item.id)
        } else {
          unfinished = true
        }
      })
      if (unfinished) {
        this.$message({
          message: this.$t('notify.selectUnFinished'), // '请选择不是“完成”状态的数据',
          type: 'warning'
        })
      } else {
        this.updateStates(params)
      }
    },
    /** 分拣单明细取消方法 */
    updateStates(params) {
      API.dataPost(this.apiDetailsName, params, 'Cancel').then(res => {
        if (res === true) {
          this.$message({
            message: this.$t('notify.hasCanceled'),
            type: 'success'
          })
          // 刷新明细数据
          this.getDetail(this.multipleSelection[0])
        } else {
          this.$message({
            message: '取消失败',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
// content高度向上撑开，包含heade的高度，以致列自定义按钮可显示可操作
.app-container /deep/ .el-tabs__content {
  margin-top: -50px;
  padding-top: 50px;
}
</style>
