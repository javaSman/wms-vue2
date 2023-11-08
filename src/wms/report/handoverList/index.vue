<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="handoverListItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation :button-items="BtnItems" :selection="multipleSelection" @toPrint="handlePrint()" />
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
          <!-- '交接清单明细' -->
          <h4>{{ $t('dialogHeader.handoverListDetail') }}</h4>
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
    <div v-if="printBegin" id="HandoveList" ref="HandoveLists" style="display: none">
      <div v-for="(printData, query) in preliminary" :key="query">
        <materialHanover
          v-for="(item, index) in printData"
          :key="index"
          :data="item"
          :thead="theadData"
          :page="printData.length"
          :current-page="index + 1"
        />
      </div>
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
import combogrid from '@/mixins/combogrid'
import { getLodop } from '@/utils/lodop'
import { handoverListItems, BtnItems } from './config'
import materialHanover from '@/views/printable-template/handoverList'
import Functions from '@/utils/functions'
export default {
  name: 'AgvPickOrderDetailAdm',
  components: { Table, CrudOperation, materialHanover },
  mixins: [colDesign, filterContainer, basics, splitPane, combogrid],
  data() {
    return {
      colName: 'MaterialHandoverDto',
      detailColName: 'MaterialHandoverDetials',
      apiName: 'materialHandover',
      handoverListItems,
      BtnItems,
      detailListLoading: false,
      detailTable: [],
      treeSelection: [],
      exportParams: { IsPage: false },
      dialogFormVisible: false,
      isData: false,
      // bottomH: 40, // 下表格按钮高度
      form: {},
      printData: [],
      printBegin: false,
      preliminary: [],
      theadData: {},
      result: {}
    }
  },
  created() {
    // this.getDict()
  },
  methods: {
    /** 获取领料明细 */
    getDetail(row) {
      this.detailListLoading = true
      // this.detailQuery.boxID = row.boxID
      API.getData('materialHandover/getDetails', {}, row.orderNo).then(res => {
        this.detailTable = res.items
        this.detailListLoading = false
      })
    },
    // 打印
    async handlePrint() {
      let LODOP = getLodop()
      if (LODOP.statusHtml) {
        this.$alert(LODOP.statusHtml, '打印提示', {
          dangerouslyUseHTMLString: true,
          showClose: true,
          showConfirmButton: false
        })
      } else {
        let row = this.multipleSelection[0]
        this.result = await API.get('materialHandover/GetModelByOrderID', {}, row.orderNo)
        if (this.result.success === false) {
          this.$message.warning(this.result.message)
          return
        }
        if (this.result.details.length === 0 || this.result.details === null) {
          this.$message.warning('当前数据明细为空，请选择其他数据进行打印')
          return
        }
        this.printBegin = true
        this.preliminary = []
        for (var i = 0; i < this.result.details.length; i++) {
          let printData = Functions.splitArray(this.result.details[i], 14)
          // console.log(printData, '第' + i + '次')
          this.preliminary.push(printData)
          // console.log(this.preliminary, '第' + i + '次')
        }
        // console.log(this.preliminary)
        let strStyle = '<style>'
        strStyle += 'html,body {padding: 0;margin: 0;}'
        strStyle += '.logo {width: 10mm;position: absolute;left:2mm;top:1mm}'
        strStyle += '.page { width: 282mm; page-break-after: always;}'
        strStyle +=
          'table {position:relative;border-collapse: collapse;font-family: 宋体;font-size: 10pt;table-layout: fixed;word-break: break-all;page-break-after:always;}'
        strStyle += '.table td {text-align: left;height: 8mm;border: 1px solid #000;padding: 0 3px;}'
        strStyle += '.td-title td {text-align: center;height: 14mm !important;}'
        strStyle += '.table tr {height: 8mm;}'
        strStyle += '.top-title td { height: 14mm;}'
        strStyle += '.barcode {height: 16mm;position: absolute;top: 17mm;}'
        strStyle +=
          ' .main-title { height: 12mm !important; line-height: 12mm; font-size: 16pt; font-weight: bold;text-align: center !important;border:none !important;border-bottom:1px solid}'
        strStyle +=
          '.top-right {text-align: left;font-size: 9pt;font-weight: normal;position: absolute;right: 1mm;line-height: 4mm;}'
        strStyle += '.col_design {height: 0 !important}'
        strStyle += '.col_design td {height: 0;visibility: hidden;border: none;}'
        strStyle += '.tb-footer td {line-height: 7mm;text-align:right;border: none;}'
        strStyle += '.footer-page {font-family: 宋体; font-size: 10pt;text-align: center;}'
        strStyle += '</style>'
        this.$nextTick(() => {
          let strHtml = document.getElementById('HandoveList').innerHTML
          LODOP.PRINT_INIT('物料交接清单打印')
          LODOP.SET_PRINT_PAGESIZE(2, 0, 0, 'A4') // 1纵向、2横向，纸宽，纸高，A4规格
          let printTemplate = strStyle + '<body>' + strHtml + '</body>'
          LODOP.ADD_PRINT_HTM('2mm', '3mm', '293mm', '204mm', printTemplate) // Top,Left,Width,Height
          LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1) // 横向时的正向显示
          LODOP.PREVIEW()
          this.printBegin = false
        })
        this.dialogFormVisible = false
      }
    }
    // handleDownloadPast() {
    //   // let Ids = [] // 选中的id集
    //   // if (this.multipleSelection.length > 0) {
    //   //   //  如果有选中的数据，就导出选中的数据，否则全部导出或根据搜索条件导出
    //   //   this.multipleSelection.map(item => {
    //   //     console.log(item)
    //   //     Ids.push(item.id)
    //   //   })
    //   //   this.exportPast('pickingResume', { Ids: Ids }, 'export')
    //   // } else {
    //   this.exportPast('pickingResume', this.exportParams, 'export')
    //   // }
    // }
  }
}
</script>
