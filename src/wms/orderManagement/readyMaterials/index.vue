<template>
  <div class="app-container">
    <div class="head-container">
      <filter-container
        :form-items="readyMaterialsQueryItems"
        :list-query.sync="listQuery"
        @query="getList"
        @reset="reset"
      />
      <CrudOperation
        :button-items="readyMaterialsHeaderBtnItems"
        :selection="multipleSelection"
        @toOutShelves="handleOutShelves"
        @toBatchOutShelves="handleBatchOutShelvesHeader"
        @toCancel="handleCancel"
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
            :has-selection="true"
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
          <!-- '备料单明细' -->
          <h4>{{ $t('dialogHeader.readyMaterialsOrderDetails') }}</h4>
          <CrudOperation
            :permission-crud="readyMaterialsCrud"
            :button-items="readyMaterialsBtnItems"
            :selection="treeSelection"
            @toPrint="attrChoose"
            @toBatchOutShelves="handleBatchOutShelves"
            @toCancel="DetailsCancel"
          />
          <ColDesign
            tid="DetailTable"
            :col-list="columnDetail"
            :table-show.sync="detailTableShow"
            :selection.sync="treeSelection"
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
            :selection.sync="treeSelection"
            :dict-gather="dictGather"
            :has-index="true"
          />
          <!-- :page-hidden="true" :has-expand-table="true" -->
          <!-- :expand-all="true" -->
          <!-- :expand-list="columnTree" -->
          <!-- @loadExpandData="loadExpandData" -->
        </template>
      </split-pane>
    </div>
    <OutShelvesForm
      :form-title="dialogTitle"
      :dialog-form-visible="outShelvesDialogVisible"
      :form-list="outShelvesForm"
      :form-data="batchData"
      :is-edit="true"
      :submit="submitOutShelves"
      @cancel="dialogCancel"
    />
    <!-- <ChooseForm
      form-title="打印配置"
      :dialog-form-visible="dialogFormVisible"
      :form-list="printForm"
      :form-data="theadData"
      :is-edit="true"
      :submit="submitPrintAttr"
      @cancel="cancel"
    /> -->
    <div v-if="printBegin" id="readyMaterial" ref="printTable" style="display: none">
      <PrintTable v-for="(item, index) in printData" :key="index" :data="item" @change="handleChange" />
    </div>
    <!-- :thead="theadData"
        :page="printData.length"
        :current-page="index + 1" -->
  </div>
</template>
<script>
import Table from '@/components/Table'
import OutShelvesForm from '@/components/EditDialog'
// import ChooseForm from '@/components/EditDialog'
import PrintTable from '@/views/printable-template/readyMaterial'
import CrudOperation from '@/components/Crud/CRUD.operation'
import { API } from '@/api/generalAPI'
import { outShelves } from '@/api/wcsAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
// import PrintTable from '@/views/printable-template/inventoryTable'
import splitPane from '@/mixins/splitPane'
import basics from '@/mixins'
import Functions from '@/utils/functions'
import { getLodop } from '@/utils/lodop'
import {
  readyMaterialsQueryItems,
  readyMaterialsCrud,
  outShelvesForm,
  printForm,
  readyMaterialsHeaderBtnItems,
  readyMaterialsBtnItems
} from './config'
export default {
  name: 'ReadyMaterials',
  components: { Table, PrintTable, CrudOperation, OutShelvesForm },
  mixins: [colDesign, filterContainer, basics, splitPane],
  data() {
    return {
      colName: 'ReadyMaterials',
      detailColName: 'ReadyMaterialsDetails',
      apiName: 'picking',

      readyMaterialsQueryItems,
      readyMaterialsHeaderBtnItems,
      readyMaterialsBtnItems,
      readyMaterialsCrud,
      outShelvesForm,
      printForm,

      detailListLoading: false,
      detailTable: [],

      columnTree: [],
      expandDataList: [],
      // multipleSelection: []
      treeSelection: [],
      listQuery: {
        IsPage: true
      },

      batchData: {},
      outShelvesDialogVisible: false,

      lodop: '',
      printData: [],
      printBegin: false,
      theadData: {},
      dialogFormVisible: false,
      changeNum: 0,
      // bottomH: 40, // 下表格按钮高度
      dialogTitle: '' // 弹窗标题
    }
  },
  created() {
    this.getDict()
    this.getTreeCol()
    this.getWarehouse()
  },
  methods: {
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.warehouseName
          item.value = item.warehouseNo
        })
        this.outShelvesForm[0].options = this.readyMaterialsQueryItems[2].options = res.items
      })
    },
    /** 获取数据字典-备料单状态 */
    getDict() {
      API.getDict('dict', { name: 'PrepareStatus' }).then(res => {
        this.readyMaterialsQueryItems[0].options = res.details
      })
      API.getDict('dict', { name: 'ZNC03_WharfOne' }).then(res => {
        this.outShelvesForm[1].options = res.details
      })
    },
    /** 获取下拉位置 下拉选项 */
    getLocationOpts() {
      API.getData('wharf', { IsPage: false }).then(res => {
        res.items.forEach(item => {
          item.label = item.wharfName
          item.value = item.wharfID
        })
        this.outShelvesForm[0].options = res.items
      })
    },
    getTreeCol() {
      API.getForm('usertabletemplatedetail', 'Box').then(res => {
        this.columnTree = res
      })
    },
    /** 获取备料明细 */
    getDetail(row) {
      this.detailListLoading = true
      if (!row.pickingNo) {
        this.detailTable = []
        this.detailListLoading = false
        return
      }
      API.getData(this.apiName, null, 'GetDetails/' + row.pickingNo).then(res => {
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
    /* 展开子表逻辑：
（子表 ref=expandTable_i，表格明细表 row 加 rowIndex、expanded、expandDataList，子表 row 加 parentIndex、details）
1、点击主表，获取明细表数据，根据每条明细进行查询请求；
2、查出各自的子表数据，赋值于子表的 row.expandDataList 中，并将子表隐含的 box 明细（用于打印）赋于子表 row.details 中；
3、表格默认全部展开，则在每张子表数据初始获取成功后，设置全选；
4、折叠行后再次展开，已选行未同步，则根据展开行号 rowIndex，查找已选数据中与 parentIndex 对应的行，设置选中状态true；
5、给每行明细数据增加 expanded 的展开状态，在点击展开时切换状态，折叠时直接返回，展开时选中已选行
*/
    loadExpandData(row, index) {
      // 当展开行的行号与已选中行的父行号相同，设置选中（解决重新展开渲染不选中）
      if (row.expandDataList !== undefined) {
        for (let i = 0; i < this.treeSelection.length; i++) {
          let row = this.treeSelection[i]
          if (row.parentIndex === index) {
            this.$nextTick(() => {
              this.$refs.tableDetail.$refs['expandTable_' + index].toggleRowSelection(row, true)
            })
            return
          }
        }
        return // 已加载过数据，不再次请求
      }
      let params = {
        ProjectID: row.projectID,
        StationID: row.stationID,
        OrderID: row.readyMaterialsID,
        MaterialID: row.materialID
      }
      API.getData('box', params, 'GetBoxList').then(res => {
        if (res.datas) {
          let arr = []
          res.datas.map(item => {
            // 转换数据格式，以便打印所展开的子表的明细
            item.box.details = item.details
            // 增加父行号标记
            item.box.parentIndex = index
            arr.push(item.box)
          })
          this.$set(row, 'expandDataList', arr)
          // 获取展开明细后全选
          this.$refs.tableDetail.$refs['expandTable_' + index].toggleAllSelection()
        } else {
          this.$set(row, 'expandDataList', [])
        }
      })
    },
    headRowClick() {
      this.treeSelection = []
      this.$refs.tableDetail.treeRowsObj = {}
    },
    /** 打印功能 */
    attrChoose() {
      // 判断是否需要下载打印控件，不需要则进行配置，再打印
      // let LODOP = getLodop()
      // if (LODOP.statusHtml) {
      //   this.$alert(LODOP.statusHtml, '打印提示', {
      //     dangerouslyUseHTMLString: true,
      //     showClose: false,
      //     showConfirmButton: false
      //   })
      //   return
      // } else {
      //   this.lodop = LODOP
      // }

      // this.dialogFormVisible = true
      this.printBegin = true
      let row = this.treeSelection
      this.printData = Functions.splitArray(row, 1)
      // this.theadData = {}
    },
    /** 打印自定义提交方法 */
    // submitPrintAttr(form) {
    //   this.theadData = form
    //   this.theadData.orderID = this.multipleSelection[0].orderID
    //   this.dialogFormVisible = false
    //   this.changeNum = this.changeNum + 1
    //   if (this.changeNum === this.treeSelection.length) {
    //     this.print()
    //     this.changeNum = 0
    //   }
    //   // this.print()
    //   return true
    // },

    handleChange() {
      // console.log('aaaaaaaaaaaaaaaaa')
      this.changeNum = this.changeNum + 1
      if (this.changeNum === this.treeSelection.length) {
        this.print()
        this.changeNum = 0
      }
    },
    /** 打印样式 */
    print() {
      // this.printBegin = true
      // let details = []
      // this.treeSelection.map(item => {
      //   details = details.concat(item)
      // })
      // let row = this.treeSelection
      // this.printData = Functions.splitArray(row, 1)let LODOP = getLodop()
      let LODOP = getLodop()
      if (LODOP.statusHtml) {
        this.$alert(LODOP.statusHtml, '打印提示', {
          dangerouslyUseHTMLString: true,
          showClose: true,
          showConfirmButton: false
        })
      } else {
        let strStyle = '<style>'
        strStyle += 'html,body {padding: 0;margin: 0;}'
        strStyle += '.page { width: 80mm; height: 50mm;position: relative; page-break-after: always;overflow: hidden;}'
        //   strStyle += '.content {border: 1px soild #000;width:100%;display: flex;align-items: center;align-content: center;justify-content: flex-start;}'
        // strStyle += '.content .fieldContent { width: 60mm;border: 1px soild #000;}'
        // strStyle += '.content .codeContent {flex:1;border: 1px soild #000;}'
        // strStyle += '.qrCode{width: 22mm;height: 22mm;border: 1px soild #000;position: absolute;top: 1mm;left: 0.5mm;}'
        // strStyle += '.qrText {position: absolute;top: 7.5mleft: 22.5mm;}'
        strStyle +=
          'table {position:relative;margin: auto;border-collapse: collapse;font-family: 宋体;font-weight:bolder;font-size: 12px;table-layout: fixed;word-break: break-all;page-break-after:always;  table-layout: fixed;  margin-left: 5mm;}'
        strStyle += '.table td {text-align: left;text-valign: top;height: 7mm;border: 1px solid #000;padding: 0 3px;}'
        strStyle += '.td-title td {text-align: center;height: 7mm !important;}'
        strStyle += '.table tr {height: 7mm;}'
        strStyle += '.top-title td { height: 7mm;border: none !important;}'
        // strStyle +=
        //   ' .main-title { height: 12mm !important; line-height: 12mm; font-size: 16pt; font-weight: bold;text-align: center !important;border:none !important;border-bottom:1px solid}'
        strStyle +=
          '.top-right {text-align: left;font-size: 7pt;font-weight: normal;position: absolute;right: 1mm;line-height: 4mm;}'
        strStyle += '.col_design {height: 0 !important}'
        strStyle += '.col_design td {height: 0;visibility: hidden;border: none;}'
        strStyle += '.newTitle {font-size: 20px;font-weight: 800;text-align: center;}'
        strStyle += '.newText  {height: 7mm;}'
        strStyle += '.qrcodestyle {margin-left: 8px;}'
        strStyle += '.textSt {margin: 10px 8px;font-size: 12px;}'
        strStyle += '.werks {margin:10px 8px 10px 8px;font-size: 12px;}'
        strStyle +=
          '.ruleStyle {   display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}'
        strStyle += '.materialText {text-valign: top;}'
        strStyle += '</style>'
        // let LODOP = this.lodop
        this.$nextTick(() => {
          let strHtml = document.getElementById('readyMaterial').innerHTML
          LODOP.PRINT_INIT('标签打印')
          LODOP.SET_PRINT_PAGESIZE(1, '80mm', '50mm') // 1纵向、2横向，纸宽，纸高，A4规格
          let printTemplate = strStyle + '<body>' + strHtml + '</body>'
          LODOP.ADD_PRINT_HTM('0mm', '0mm', '80mm', '50mm', printTemplate) // Top,Left,Width,Height
          // LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1) // 横向时的正向显示
          LODOP.PREVIEW()
          this.printBegin = false
        })
      }
    },
    /** 表头-批量下架功能-自动下架(齐套库) */
    handleBatchOutShelvesHeader() {
      let arr = []
      this.multipleSelection.map(item => {
        arr.push(item.readyMaterialsID)
      })
      // '确认下架选中项','提示'
      this.$confirm(this.$t('dialog.outShelvesTips'), this.$t('dialog.tip'), {
        confirmButtonText: this.$t('button.confirm'), // '确认'
        cancelButtonText: this.$t('button.cancel'), // '取消'
        type: 'warning'
      })
        .then(() => {
          API.dataPost('outshelves', arr, 'ReadyMaterialsBatchOutShelves').then(res => {
            if (res.IsError === false) {
              this.$notify({
                title: this.$t('notify.success'), // '成功'
                message: this.$t('notify.operateSuccess'), // '操作成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: this.$t('notify.failure'), // '失败'
                // 接口返回数据，待中英配置
                message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',
                type: 'error',
                duration: 2000
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('notify.cancelOutShelves') // '已取消下架'
          })
        })
    },
    /* 表头取消功能 */
    handleCancel() {
      let data = []
      this.multipleSelection.forEach(item => {
        data.push(item.statusID)
      })
      const newArr = data.every(item => {
        return item === 'Apply'
      })
      if (newArr === true) {
        let array = []
        this.multipleSelection.forEach(item => {
          array.push(item.id)
        })
        this.$confirm('确定取消选中的' + this.multipleSelection.length + '条？', this.$t('dialog.tip'), {
          confirmButtonText: this.$t('button.confirm'), // '确认'
          cancelButtonText: this.$t('button.cancel'), // '取消'
          type: 'warning'
        }).then(() => {
          API.dataPost('picking', array, 'Cancel').then(res => {
            if (res.success) {
              this.$notify({
                title: this.$t('notify.success') /* 成功 */,
                message: res.message /* 返回成功信息 */,
                type: 'success',
                duration: 2000
              })
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
      } else {
        this.$message({
          message: '仅允许状态为申请备料单的备料单',
          type: 'error'
        })
      }
    },
    /* 明细表取消功能 */
    DetailsCancel() {
      let data = []
      this.treeSelection.forEach(item => {
        data.push(item.statusID)
      })
      const newArr2 = data.every(item => {
        return item === 'Apply'
      })
      if (newArr2 === true) {
        let array = []
        this.treeSelection.forEach(item => {
          array.push(item.id)
        })
        this.$confirm('确定取消选中的' + this.treeSelection.length + '条？', this.$t('dialog.tip'), {
          confirmButtonText: this.$t('button.confirm'), // '确认'
          cancelButtonText: this.$t('button.cancel'), // '取消'
          type: 'warning'
        }).then(() => {
          API.dataPost('picking', array, 'CancelDetails').then(res => {
            if (res.success) {
              this.$notify({
                title: this.$t('notify.success') /* 成功 */,
                message: res.message /* 返回成功信息 */,
                type: 'success',
                duration: 2000
              })
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
      } else {
        this.$message({
          message: '仅允许状态为申请备料单的备料单',
          type: 'error'
        })
      }
    },
    /** 下架功能 */
    handleOutShelves() {
      // 获取下拉框的值
      // this.getLocationOpts()
      this.getWarehouse()
      this.batchData = {}
      this.dialogTitle = '齐套出库'
      this.outShelvesDialogVisible = true
    },
    /** 批量下架功能 */
    handleBatchOutShelves() {
      // this.getLocationOpts()
      this.getWarehouse()
      this.batchData = {}
      this.dialogTitle = '批量下架载具'
      this.outShelvesDialogVisible = true
    },
    /** 批量下架自定义提交方法 */
    async submitOutShelves() {
      if (this.dialogTitle === '批量下架载具') {
        // 批量下架载具
        // let params = {
        //   boxIDs: [],
        //   deliverLocation: ''
        // }
        // let boxIDs = []
        // // 获取选中项，将箱号拼接成数组
        // this.treeSelection.map(item => {
        //   boxIDs = params.boxIDs.concat(item.boxID)
        // })
        // // 箱号数组去重
        // params.boxIDs = Array.from(new Set(boxIDs))
        // params.deliverLocation = this.batchData.deliverLocation
        let list = []
        this.treeSelection.forEach(item => {
          list.push(item.barcode)
        })
        let data = {
          Barcodes: list,
          PickingNo: this.treeSelection[0].pickingNo,
          WharfID: this.batchData.WharfID,
          WarehouseId: this.batchData.warehouseNo
        }
        await outShelves(data)
          .then(res => {
            if (res.IsError === false) {
              this.$notify({
                title: this.$t('notify.success') /* 成功 */,
                message: res.ErrMsg /* 返回成功 */,
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: this.$t('notify.failure') /* 失败 */,
                message: res.ErrMsg /* 返回失败信息 */,
                type: 'error',
                duration: 2000
              })
            }
            // if (res.success) {
            //   this.outShelvesDialogVisible = false
            //   this.$notify({
            //     title: this.$t('notify.success'), // '成功'
            //     message: this.$t('notify.operateSuccess'), // '操作成功',
            //     type: 'success',
            //     duration: 2000
            //   })
            // } else {
            //   this.$notify({
            //     title: this.$t('notify.failure'), // '失败'
            //     // 接口返回数据，待中英配置
            //     message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',
            //     type: 'error',
            //     duration: 2000
            //   })
            // }
          })
          .catch(() => {
            this.outShelvesDialogVisible = false
          })
        return true
      } else if (this.dialogTitle === '齐套出库') {
        // 下架载具
        // console.log(this.batchData)
        // var row = this.multipleSelection[0]
        // let paramsData = {
        //   sourceID: row.readyMaterialsID,
        //   deliverLocation: this.batchData.deliverLocation
        // }
        let Array = []
        this.multipleSelection.forEach(item => {
          Array.push(item.pickingNo)
        })
        let data = {
          PickingNos: Array,
          WarehouseId: this.batchData.warehouseNo,
          WharfID: this.batchData.WharfID
        }
        await outShelves(data)
          .then(res => {
            if (res.IsError === false) {
              this.outShelvesDialogVisible = false
              this.$notify({
                title: this.$t('notify.success') /* 成功 */,
                message: res.ErrMsg /* 返回成功信息 */,
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: this.$t('notify.failure') /* 失败 */,
                message: res.ErrMsg /* 返回失败信息 */,
                type: 'error',
                duration: 2000
              })
            }
            // if (res.success) {
            //   this.outShelvesDialogVisible = false
            //   this.$notify({
            //     title: this.$t('notify.success'), // '成功'
            //     message: this.$t('notify.operateSuccess'), // '操作成功',
            //     type: 'success',
            //     duration: 2000
            //   })
            // } else {
            //   this.$notify({
            //     title: this.$t('notify.failure'), // '失败'
            //     // 接口返回数据，待中英配置
            //     message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',
            //     type: 'error',
            //     duration: 2000
            //   })
            // }
          })
          .catch(() => {
            this.outShelvesDialogVisible = false
          })
        return true
      }
    },
    /** 批量下架对话框关闭 */
    dialogCancel() {
      this.outShelvesDialogVisible = false
    }
  }
}
</script>
