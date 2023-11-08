<template>
  <div class="app-container">
    <div class="head-container" style="position: relative">
      <filter-container
        :form-items="inventoryItems"
        :list-query.sync="listQuery"
        :high-search-list="stockSearchItems"
        @query="getList"
        @reset="reset"
      />
      <CrudOperation
        style="display: inline-block"
        :selection="multipleSelection"
        :permission-crud="inventoryCrud"
        :button-items="inventoryBtnItems"
        :download-loading.sync="downloadLoading"
        @toExport="handleDownloadGet()"
        @toPrint="handlePrint()"
        @toOffShelf="handleOffShelf()"
      />
      <!-- <div style="display: inline-block; position: absolute; right: 4%">当前页面数量总计:{{ arrSum }}</div> -->
    </div>
    <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
    <Table
      v-if="tableShow"
      ref="table"
      v-loading="listLoading"
      :height="-1"
      :data-list="list"
      :column="column"
      :selection.sync="multipleSelection"
      :total="totalCount"
      :page.sync="page"
      :has-selection="true"
      :limit.sync="listQuery.MaxResultCount"
      :is-sort="true"
      :has-index="true"
      :dict-gather="dictGather"
      :sorting.sync="listQuery.Sorting"
      @pagination="getList"
      @tableSort="getList"
    />
    <EditForm
      :dialog-form-visible="dialogFormVisible"
      :form-title="formTitle"
      :form-list="formList"
      :form-data="form"
      :is-edit="isEdit"
      :dialog-width="750"
      :layout="layout"
      :submit="submit"
      @create="handleCreate"
      @cancel="cancel"
      @reset="reset"
    />
    <ShelfForm
      :dialog-form-visible="dialogShelfVisible"
      :form-title="shelfTitle"
      :dialog-width="850"
      :form-list="configFormList"
      :form-data="shelfForm"
      :is-edit="isEdit"
      :submit="toReportShelf"
      @cancel="dialogShelfVisible = false"
    />
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
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import CrudOperation from '@/components/Crud/CRUD.operation'
import filterContainer from '@/mixins/filterContainer'
import EditForm from '@/components/EditDialog'
import ShelfForm from '@/components/EditDialog'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import materialHanover from '@/views/printable-template/handoverList'
import Functions from '@/utils/functions'
import { getLodop } from '@/utils/lodop'
import { inventoryItems, inventoryCrud, inventoryBtnItems, formList, configFormList, stockSearchItems } from './config'
export default {
  name: 'InventoryManage',
  components: {
    Table,
    CrudOperation,
    EditForm,
    ShelfForm,
    materialHanover
  },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'Inventory',
      apiName: 'Inventory',
      inventoryItems,
      inventoryCrud,
      inventoryBtnItems,
      stockSearchItems,
      downloadLoading: false,
      exportParams: { IsPage: false },
      isEdit: true,
      arrSum: 0,
      isData: false,
      dialogFormVisible: false,
      dialogShelfVisible: false,
      shelfTitle: '下架',
      formTitle: '',
      formList,
      configFormList,
      layout: { gutter: 10, span: 12, xs: 12, sm: 12, md: 8, xl: 6 },
      form: {},
      shelfForm: {},
      printData: [],
      printBegin: false,
      preliminary: [],
      theadData: {},
      result: {},
      listQuery: {
        IsPage: true
      },
      warehouse_Wharf: '',
      warehouseNew: '',
      DictName: '',
      value: ''
    }
  },
  // watch: {
  //   list() {
  //     let arrSums = 0
  //     this.list.forEach(item => {
  //       arrSums += Number(item.quantity.toFixed(2))
  //     })
  //     this.arrSum = arrSums.toFixed(2)
  //   }
  // },
  created() {
    this.getwarehouse()
    this.getDict()
    this.inventoryItems.forEach(item => {
      switch (item.prop) {
        case 'warehouseNo': {
          item.change = () => {
            this.value = this.listQuery.warehouseNo
            console.log(this.value)
          }
        }
      }
    })
  },
  methods: {
    getDict() {
      // 载具位置状态
      API.getDict('dict', { name: 'BoxPositionStatus' }).then(res => {
        this.stockSearchItems[0].options = res.details
      })
      // 载具装载状态
      API.getDict('dict', { name: 'BoxState' }).then(res => {
        this.stockSearchItems[1].options = res.details
      })
      // 移动类型
      API.getDict('dict', { name: 'MovementType' }).then(res => {
        this.stockSearchItems[3].options = res.details
      })
    },
    handleDownloadGet() {
      // if (this.list === null) {
      //   this.$message.warning('当前表格数据为空！')
      // } else {
      let Ids = [] // 选中的id集
      if (this.multipleSelection.length > 0) {
        //  如果有选中的数据，就导出选中的数据，否则全部导出或根据搜索条件导出
        this.multipleSelection.map(item => {
          Ids.push(item.id)
        })
        // this.exportPast('Inventory', { Ids: Ids }, 'export')
        var url =
          window.globalConfig.base.ip +
          ':' +
          window.globalConfig.base.backend_port +
          '/api/business/Inventory/export' +
          '?Ids[]=' +
          Ids
        window.location.href = url
      } else {
        let data = this.listQuery
        data['type'] = 1
        console.log(this.listQuery)
        // this.exportPast('Inventory', this.listQuery, 'export')
        // let data = {
        //   BoxNo: this.listQuery.BoxNo,
        //   materialNo: this.listQuery.materialNo,
        //   barcode: this.listQuery.barcode,
        //   ProjectNo: this.listQuery.ProjectNo,
        //   StationNo: this.listQuery.StationNo,
        //   warehouseNo: this.listQuery.warehouseNo,
        //   startCreationTime: this.listQuery.startCreationTime,
        //   endCreationTime: this.listQuery.endCreationTime,
        //   position: this.listQuery.position,
        //   BoxStatus: this.listQuery.BoxStatus,
        //   materialDesc: this.listQuery.materialDesc,
        //   oclas: this.listQuery.oclas,
        //   Batch: this.listQuery.Batch,
        //   LocationNo: this.listQuery.LocationNo,
        //   AreaNo: this.listQuery.AreaNo,
        //   SourceBarcode: this.listQuery.SourceBarcode,
        //   ResultMsg: this.listQuery.ResultMsg,
        //   type: 1
        // }
        API.get('Inventory', data, 'all').then(res => {
          window.location.href = res.exportUrl
          delete data['type']
        })
      }
      // }
    },
    // 打印弹窗显示方法
    handlePrint() {
      let row = this.multipleSelection
      if (row.length > 0) {
        this.formTitle = '打印'
        this.dialogFormVisible = true
        this.form = {}
      } else {
        this.$message.warning('请先勾选数据，在进行打印！')
      }
    },
    // 打印提交按钮
    async submit() {
      let LODOP = getLodop()
      if (LODOP.statusHtml) {
        this.$alert(LODOP.statusHtml, '打印提示', {
          dangerouslyUseHTMLString: true,
          showClose: true,
          showConfirmButton: false
        })
      } else {
        let row = this.multipleSelection
        let boxNos = []
        row.forEach(item => {
          boxNos.push(item.boxNo)
        })
        this.$set(this.form, 'BoxNo', [...new Set(boxNos)])
        this.result = await API.dataPost('Inventory', this.form, 'AddMaterialHandover')
        console.log(this.result)
        if (this.result.success === false) {
          this.$message.warning(this.result.message)
          return true
        }
        if (this.result.details.length === 0 || this.result.details === null) {
          this.$message.warning('当前数据明细为空，请选择其他数据进行打印')
          return true
        }

        this.theadData = this.form
        this.printBegin = true
        this.preliminary = []
        for (var i = 0; i < this.result.details.length; i++) {
          let printData = Functions.splitArray(this.result.details[i], 14)
          console.log(printData, '第' + i + '次')
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
        return true
      }
    },
    /* 获取仓库信息 */
    getwarehouse() {
      API.getData('warehouse', { IsPage: false }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.warehouseName
          item.value = item.warehouseNo
        })
        this.configFormList[0].options = this.inventoryItems[5].options = res.items
      })
    },
    /* 下架 */
    handleOffShelf() {
      // console.log(this.value)
      this.dialogShelfVisible = true
      this.getwarehouse()
      this.$set(this.shelfForm, 'warehouse', this.value)
      if (this.listQuery.warehouseNo === undefined) {
        this.configFormList.forEach(item => {
          switch (item.prop) {
            case 'warehouse': {
              item.change = () => {
                this.warehouseNew = this.shelfForm.warehouse
                this.warehouse_Wharf = this.warehouseNew + '_' + 'Wharf'
                API.getData('dict', { SkipCount: 0, MaxResultCount: 20 }, 'all').then(res => {
                  res.items.forEach(item => {
                    this.DictName = item.name
                    if (this.DictName.includes(this.warehouse_Wharf)) {
                      API.getDict('dict', { name: this.warehouse_Wharf }).then(res => {
                        this.configFormList[1].options = res.details
                      })
                    } else {
                      // setTimeout(() => {
                      this.configFormList[1].options = [{ label: '', value: '' }]
                      this.$set(this.shelfForm, 'wharfNo', '')
                      // }, 100)
                    }
                  })
                })
              }
              break
            }
          }
        })
      } else {
        if (this.shelfForm.warehosue !== '') {
          this.warehouseNew = this.shelfForm.warehouse
          this.warehouse_Wharf = this.warehouseNew + '_' + 'Wharf'
          API.getData('dict', { SkipCount: 0, MaxResultCount: 20 }, 'all').then(res => {
            res.items.forEach(item => {
              this.DictName = item.name
              if (this.DictName.includes(this.warehouse_Wharf)) {
                API.getDict('dict', { name: this.warehouse_Wharf }).then(res => {
                  this.configFormList[1].options = res.details
                })
              } else {
                // setTimeout(() => {
                this.configFormList[1].options = [{ label: '', value: '' }]
                this.$set(this.shelfForm, 'wharfNo', '')
                // }, 100)
              }
            })
          })
        }
        if (this.shelfForm.warehosue === undefined) {
          this.configFormList.forEach(item => {
            switch (item.prop) {
              case 'warehouse': {
                item.change = () => {
                  this.warehouseNew = this.shelfForm.warehouse
                  this.warehouse_Wharf = this.warehouseNew + '_' + 'Wharf'
                  API.getData('dict', { SkipCount: 0, MaxResultCount: 20 }, 'all').then(res => {
                    res.items.forEach(item => {
                      this.DictName = item.name
                      if (this.DictName.includes(this.warehouse_Wharf)) {
                        API.getDict('dict', { name: this.warehouse_Wharf }).then(res => {
                          this.configFormList[1].options = res.details
                        })
                      } else {
                        // setTimeout(() => {
                        this.configFormList[1].options = [{ label: '', value: '' }]
                        this.$set(this.shelfForm, 'wharfNo', '')
                        // }, 100)
                      }
                    })
                  })
                }
                break
              }
            }
          })
        }
      }
    },
    /* 下架确定 */
    toReportShelf() {
      console.log(this.shelfForm.wharfNo)
      const newList = []
      const Array = []
      const arr = []
      this.multipleSelection.forEach(item => {
        newList.push(item.boxNo)
        Array.push(item.warehouseNo)
        arr.push(item.locationNo)
      })
      let params = {
        details: { boxNo: newList, warehouseNo: Array, locationNo: arr },
        wharfNo: this.shelfForm.wharfNo
      }
      API.dataPost('Inventory', params, 'BatchOutShelves')
        .then(res => {
          if (res.success) {
            this.$notify({
              title: this.$t('notify.success') /* 成功 */,
              message: res.message /* 返回成功信息 */,
              type: 'success',
              duration: 2000
            })
            this.shelfForm = {}
            this.dialogShelfVisible = false
          } else {
            this.$notify({
              title: this.$t('notify.failure') /* 失败 */,
              message: res.message /* 返回失败信息 */,
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(e => {})
      return true
    }
  }
}
</script>
