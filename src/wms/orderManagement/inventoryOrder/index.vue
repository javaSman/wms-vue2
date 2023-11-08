<template>
  <div class="components-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />

      <CrudOperation
        :permission-crud="InventoryOrderCrud"
        :button-items="inventoryBtnItems"
        :selection="multipleSelection"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toInventory="handleInventory()"
        @toBatchAdd="handleBatchAdd"
        @toPrint="print()"
      />
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
          />
        </template>
        <template slot="paneR">
          <!-- '盘点单明细' -->
          <h4>{{ $t('dialogHeader.inventoryOrderDetails') }}</h4>
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
          />
        </template>
      </split-pane>
    </div>
    <EditDetailOptDialog
      :dialog-form-visible.sync="dialogFormVisible"
      :layout="layout"
      :form-title="formTitle"
      :form-data="form"
      :detail-table.sync="detailTable"
      :is-edit="isEdit"
      :form-list="inventoryFormList"
      :table-list="inventoryTableList"
      :api-name="apiName"
      :detail-title="detailTitle"
      :col-detail-name="colDetailName"
      :api-detail-name="apiDetailName"
      :detail-query-items="stockQueryItems"
      :check-params="checkParams"
      :dict-gather="dictGather"
      @regainDetail="regainDetail"
      @create="handleCreate"
      @reset="reset"
      @cancel="cancel"
    />
    <!-- 盘点操作对话框 -->
    <EditDialog
      :dialog-visible.sync="dialogVisible"
      :form-title="formTitle"
      :form-data.sync="form"
      :table-data-list.sync="dataList"
      :form-list="inventoryHeadList"
      :is-edit="isEdit"
      :api="API"
      :api-name="apiName"
      :dict-gather="dictGather"
      @reset="reset"
    />
    <!-- 流量测试-批量建单 -->
    <BatchAddDlg
      :dialog-visible.sync="batchDlgVisible"
      :form-title="formTitle"
      :form-list="batchAddFormList"
      :form-data="form"
      api-name="inventoryheader"
      api-method="FlowTest"
      @reset="reset"
    />
    <div v-if="printBegin" id="inventoryTable" ref="printTable" style="display: none">
      <PrintTable
        v-for="(item, index) in printData"
        :key="index"
        :data="item"
        :thead="multipleSelection[0]"
        :page="printData.length"
        :current-page="index + 1"
      />
    </div>
  </div>
</template>
<script>
import CrudOperation from '@/components/Crud/CRUD.operation'
import Table from '@/components/Table'
import EditDetailOptDialog from './module/EditDetailOptDialog'
import EditDialog from './module/inventoryDialog'
import BatchAddDlg from './module/BatchAddDlg'
import PrintTable from '@/views/printable-template/inventoryTable'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import splitPane from '@/mixins/splitPane'
import basics from '@/mixins'
import Functions from '@/utils/functions'
import { getLodop } from '@/utils/lodop'
import {
  queryItems,
  inventoryFormList,
  inventoryHeadList,
  inventoryTableList,
  stockQueryItems,
  InventoryOrderCrud,
  inventoryBtnItems,
  batchAddFormList
} from './config'
export default {
  name: 'InventoryOrder',
  components: { Table, EditDetailOptDialog, CrudOperation, EditDialog, PrintTable, BatchAddDlg },
  mixins: [colDesign, filterContainer, basics, splitPane],
  data() {
    return {
      colName: 'InventoryHeaderDto',
      detailColName: 'InventoryDetailDto',
      apiName: 'inventoryheader',
      dialogTitle: this.$t('dialogHeader.inventoryOrder'), // '盘点单',

      queryItems,
      inventoryFormList,
      inventoryHeadList,
      inventoryTableList,
      InventoryOrderCrud,
      inventoryBtnItems,
      batchAddFormList,

      API,

      checkParams: 'boxID',
      detailTitle: this.$t('dialogHeader.stock'), // '库存',
      colDetailName: 'Inventory',
      apiDetailName: 'inventory',
      stockQueryItems,

      layout: { span: 8 },

      form: {},
      dialogFormVisible: false,
      dialogVisible: false,
      batchDlgVisible: false,

      formTitle: '',
      isEdit: false,

      detailQuery: {
        boxID: null
      },
      detailTable: [],
      detailListLoading: false,
      listLoading: true,

      dataList: [],
      printData: [],
      printBegin: false
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    /** 添加明细的数据方法-自定义事件-载具中状态与盘点单据状态字段一致，需覆盖数据 */
    regainDetail(data) {
      data.forEach(item => {
        item.statusID = null
      })
    },
    /** 获取数据字典 */
    getDict() {
      API.getDict('dict', { name: 'InvertoryOrderType' }).then(res => {
        this.inventoryFormList[2].options = this.queryItems[1].options = res.details
      })
    },
    /** 编辑 */
    handleUpdate() {
      // this.getForm(this.multipleSelection[0].id)
      this.getDetail(this.multipleSelection[0])
      if (this.multipleSelection[0].statusID === '完成') {
        this.$notify({
          title: this.$t('notify.failure'), // '失败'
          dangerouslyUseHTMLString: true,
          message: this.$t('notify.banEdit'), // '该单据已完成，无法进行修改',
          type: 'error',
          duration: 3000
        })
        this.dialogFormVisible = false
      } else {
        this.dialogFormVisible = true
        this.getForm(this.multipleSelection[0].id)
      }
    },
    /** 重写获取明细方法 */
    getDetail(row) {
      this.detailListLoading = true
      this.detailQuery.OrderID = row.inventoryID
      API.getData('inventorydetail', { IsPage: false, OrderID: this.detailQuery.OrderID }).then(res => {
        this.detailTable = res.items
        this.detailListLoading = false
      })
    },
    /** 盘点按钮 */
    handleInventory() {
      this.formTitle = '盘点单过账'
      if (this.multipleSelection[0].statusID === 'Finish') {
        this.dialogVisible = false
        this.$message.warning('当前盘点单已完成')
      } else {
        API.getData('inventorydetail', this.detailQuery).then(res => {
          this.dataList = res.items
        })
        API.getForm(this.apiName, this.multipleSelection[0].id).then(res => {
          this.form = res
        })
        this.dialogVisible = true
      }
    },
    /** 打开流量测试弹窗-批量简单 */
    handleBatchAdd() {
      this.formTitle = '流量测试'
      this.form = {}
      this.batchDlgVisible = true
    },
    /** 打印 */
    print() {
      if (this.multipleSelection.length !== 1) {
        this.$message.warning('请选择一个盘点单进行打印')
        return
      }
      if (this.detailTable.length === 0) {
        this.$message.error('当前盘点单无明细数据！')
        return
      }
      let LODOP = getLodop()
      if (LODOP.statusHtml) {
        this.$alert(LODOP.statusHtml, '打印提示', {
          dangerouslyUseHTMLString: true,
          showClose: false,
          showConfirmButton: false
        })
      } else {
        this.printBegin = true
        this.printData = Functions.splitArray(this.detailTable, 16)
        let strStyle = '<style>'
        strStyle += 'html,body {padding: 0;margin: 0;}'
        strStyle += '.logo {width: 10mm;position: absolute;}'
        strStyle +=
          '.page { width: 196mm; height: 293mm; page-break-after: always;position: relative;overflow: hidden;}'
        strStyle +=
          'table {position:relative;margin: auto;border-collapse: collapse;font-family: 宋体;font-size: 10pt;table-layout: fixed;word-break: break-all;page-break-after:always;}'
        strStyle += '.table td {text-align: left;height: 13mm;border: 1px solid #000;padding: 0 3px;}'
        strStyle += '.td-title td {text-align: center;height: 14mm !important;}'
        strStyle += '.table tr {height: 7mm;}'
        strStyle += '.top-title td { height: 7mm;border: none !important;}'
        strStyle +=
          ' .main-title { height: 12mm !important; line-height: 12mm; font-size: 16pt; font-weight: bold;text-align: center !important;border:none !important;border-bottom:1px solid}'
        strStyle +=
          '.top-right {text-align: left;font-size: 9pt;font-weight: normal;position: absolute;right: 1mm;line-height: 4mm;}'
        strStyle += '.col_design {height: 0 !important}'
        strStyle += '.col_design td {height: 0;visibility: hidden;border: none;}'
        strStyle += '.tb-footer td {line-height: 7mm;text-align:right;border: none;}'
        strStyle +=
          '.footer-page {font-family: 宋体; font-size: 10pt; text-align: center; bottom: 0; position: absolute; width: 100%;}'
        strStyle += '.newText  {height: 7mm;}'
        strStyle += '</style>'
        this.$nextTick(() => {
          let strHtml = document.getElementById('inventoryTable').innerHTML
          LODOP.PRINT_INIT('库位盘点表打印')
          LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A4') // 1纵向、2横向，纸宽，纸高，A4规格
          let printTemplate = strStyle + '<body>' + strHtml + '</body>'
          LODOP.ADD_PRINT_HTM('2mm', '3mm', '204mm', '293mm', printTemplate) // Top,Left,Width,Height
          LODOP.PREVIEW()
          this.printBegin = false
        })
      }
    }
  }
}
</script>

