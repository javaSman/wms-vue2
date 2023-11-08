<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="LocationsCrud"
        :button-items="locationsBtnItems"
        :selection="multipleSelection"
        :download-loading.sync="downloadLoading"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toImport="handleImport()"
        @toExport="handleDownload()"
        @toprintBarcode="handleprintBarcode()"
        @todownSet="handleDownSet()"
        @toDownload="handleDownloadPast()"
      />
      <!-- @toImport="handleImport()" -->
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
      :table-btn="TableBtn"
      :page.sync="page"
      :limit.sync="listQuery.MaxResultCount"
      :is-sort="true"
      :sorting.sync="listQuery.Sorting"
      :dict-gather="dictGather"
      @pagination="getList"
      @tableSort="getList"
      @toCheckPrint="handleCheckPrint"
      @getDetails="handleChange"
    />
    <EditForm
      :dialog-form-visible="dialogFormVisible"
      :form-title="formTitle"
      :form-list="formList"
      :form-data="form"
      :is-edit="isEdit"
      :api-name="apiName"
      :dialog-width="950"
      :layout="layout"
      @create="handleCreate"
      @cancel="cancel"
      @reset="reset"
    />
    <EditBatchDialog
      :dialog-visible.sync="batchDialogVisible"
      :form-title="formTitle"
      :form-data="form"
      :batch-form-list="batchFormList"
      :data-list="tableList"
      :detail-table.sync="list"
      :api-name="apiName"
      :batch-table-list="column"
      :dict-gather="dictGather"
      @reset="reset"
      @cancel="dialogCancel"
    />
    <UploadDialog
      :dialog-visible.sync="uploadDialogVisible"
      :api-name="apiName"
      :has-template="true"
      :template-path="templatePath"
      @reset="reset"
      @cancel="dialogCancel"
    />
    <!-- 打印类型选择弹窗 -->
    <el-dialog title="打印标签" :visible.sync="printDlgVisible" width="370px" @close="cancelPrinting()">
      <div style="text-align: center">
        <el-button type="primary" @click="printSamllTag()">小货架标签</el-button>
        <el-button type="primary" @click="printBigTag()">大货架标签</el-button>
      </div>
    </el-dialog>
    <!-- 打印预览 -->
    <div v-if="printBeginB" ref="bigTag" style="display: none">
      <PrintBigTag v-for="(item, index) in printData" :key="index" :data-arr="item" />
    </div>
    <div v-if="printBeginS" ref="smallTag" style="display: none">
      <PrintSmallTag v-for="(item, index) in printData" :key="index" :data-arr="item" />
    </div>
    <EditDetailOptDialog
      :dialog-form-visible.sync="checkDialogFormVisible"
      :layout="layout"
      :form-title="formTitle"
      :form-data="form"
      :detail-table.sync="editDetailTable"
      :is-edit="true"
      :table-list="boxTableList"
      :dialog-width="800"
      :api-name="apiNames"
      :source-sys-no="SourceSysNo"
      @create="handleCreate"
      @reset="reset"
      @cancel="dialogCancel"
    />
    <ShelfForm
      :dialog-form-visible="dialogShelfVisible"
      :form-title="shelfTitle"
      :dialog-width="850"
      :form-list="configFormList"
      :form-data="shelfForm"
      :is-edit="true"
      :submit="toReportShelf"
      @cancel="dialogShelfVisible = false"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import UploadDialog from '@/components/Upload/UploadDialog'
import EditDetailOptDialog from './module/EditDetailOptDialog'
import EditBatchDialog from '@/components/EditBatchDialog'
import EditForm from '@/components/EditDialog'
import ShelfForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import Functions from '@/utils/functions'
import PrintBigTag from '@/views/printable-template/locationBigTag'
import PrintSmallTag from '@/views/printable-template/locationSmallTag'
import { getLodop } from '@/utils/lodop'
import {
  formList,
  batchFormList,
  queryItems,
  LocationsCrud,
  locationsBtnItems,
  TableBtn,
  boxTableList,
  configFormList
} from './config'
export default {
  name: 'Locations',
  components: {
    Table,
    EditForm,
    CrudOperation,
    EditBatchDialog,
    UploadDialog,
    PrintBigTag,
    PrintSmallTag,
    EditDetailOptDialog,
    ShelfForm
  },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'Locations',
      apiName: 'location',
      apiNames: 'PrintLog',
      dialogTitle: this.$t('dialogHeader.locations'), // '货位',
      templatePath: '/Temp/UploadTemp/货位注册模板.xlsx',
      locationsBtnItems,
      formList,
      queryItems,
      batchFormList,
      LocationsCrud,
      configFormList,

      tableList: [],
      form: {},
      shelfForm: {},
      dialogFormVisible: false,
      uploadDialogVisible: false,
      batchDialogVisible: false,
      formTitle: '',
      isEdit: false,
      layout: { gutter: undefined, span: 12, xs: 24, sm: 12, md: 8, xl: 6 },
      downloadLoading: false,
      exportParams: {},
      // boxcbgAttr: formList[3], // 远程
      // warehousecbgAttr: formList[2], // 远程
      printDlgVisible: false, // 打印类型选择弹窗显示状态
      printData: [], // 二维码打印数据
      printBeginB: false, // 大货架预览标识符
      printBeginS: false, // 小货架预览标识符
      TableBtn,
      checkDialogFormVisible: false,
      editDetailTable: [],
      boxTableList,
      SourceSysNo: '',
      dialogShelfVisible: false,
      shelfTitle: '下架',
      value: ''
    }
  },
  created() {
    this.formChange()
    this.getDict()
    this.getWarehouse()
    this.getwarehouseNew()
    this.queryItems.forEach(item => {
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
    handleChange(selection) {
      // if (selection.status === 'Occupy') {
      //   this.locationsBtnItems[2].disabled = true
      // } else {
      //   this.locationsBtnItems[2].disabled = false
      // }
    },
    /** 下拉框失焦获值*/
    formChange() {
      this.formList.forEach(item => {
        switch (item.prop) {
          case 'warehouseNo': {
            item.change = row => {
              // this.inputWHName(row)
              this.Floor()
            }
            break
          }
        }
      })
    },
    getDict() {
      API.getDict('dict', { name: 'LocationsState' }).then(res => {
        this.formList[1].options = this.queryItems[1].options = this.batchFormList[0].options = res.details
      })
      API.getDict('dict', { name: 'LocalType' }).then(res => {
        this.queryItems[4].options = this.formList[9].options = res.details
      })
    },
    handleCreate() {
      this.form = {}
      // this.getOpts()
      this.dialogOpen()
      this.getNewWarehouse()
      // this.getNewBox()
    },
    handleUpdate() {
      // this.getOpts()
      this.getForm(this.multipleSelection[0].id)
      this.getFloor()
      this.getNewWarehouse()
      // this.getNewBox()
    },
    // getOpts() {
    //   this.getCbgRemoteOpts(this.warehousecbgAttr, 'warehouse')
    //   // this.getCbgOpts('warehouse', { IsPage: false })
    // },

    handleImport() {
      this.uploadDialogVisible = true // 导入
    },
    dialogCancel(val) {
      this.uploadDialogVisible = false
      this.batchDialogVisible = false
      this.checkDialogFormVisible = false
    },
    inputWHName(val) {
      this.formList[2].options.forEach(item => {
        if (item.value === val) {
          this.form.whName = item.warehouseName
        } else if (val === '') {
          this.form.whName = ''
          this.getNewWarehouse()
        }
      })
    },
    // cbgRemote(node, str) {
    //   // if (node === this.boxcbgAttr.prop) {
    //   //   this.getCbgRemoteSearch(this.boxcbgAttr, 'box', { BoxID: str })
    //   // }
    //   if (node === this.warehousecbgAttr.prop) {
    //     this.getCbgRemoteSearch(this.warehousecbgAttr, 'warehouse', { WarehouseNo: str })
    //   }
    // },

    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        // let arr = []
        res.items.forEach(item => {
          // arr.push(item.WarehouseNo)
          item.label = item.warehouseName
          item.value = item.warehouseNo
        })
        this.queryItems[2].options = res.items
      })
    },
    // 下拉框获取新的仓库编码options
    getNewWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        // let arr = []
        res.items.forEach(item => {
          // arr.push(item.WarehouseNo)
          item.label = item.warehouseName
          item.value = item.warehouseNo
        })
        this.formList[2].options = res.items
      })
    },
    // 获取层高
    getFloor() {
      API.get('floorHeight', { warehouseNo: this.multipleSelection[0].warehouseNo }, 'all').then(res => {
        // console.log(res.items)
        res.items.forEach(item => {
          item.label = item.floorDescription
          item.value = item.floor
        })
        this.formList[11].options = res.items
      })
    },
    // 根据仓库号来获取层高
    getNewFloor() {
      API.get('floorHeight', { warehouseNo: this.form.warehouseNo }, 'all').then(res => {
        res.items.map(item => {
          item.label = item.floorDescription
          item.value = item.floor
        })
        this.formList[11].options = res.items
      })
    },
    Floor() {
      this.getNewFloor()
    },
    getwarehouseNew() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        // let arr = []
        res.items.forEach(item => {
          // arr.push(item.WarehouseNo)
          item.label = item.warehouseName
          item.value = item.warehouseNo
        })
        this.configFormList[0].options = res.items
      })
    },
    handleDownSet() {
      // this.$confirm('确定执行下架操作吗？', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   let row = this.multipleSelection
      //   let multipeResult = row.map(item => {
      //     return { locationID: item.locationID, WarehouseNo: item.WarehouseNo }
      //   })
      //   API.dataPost('locations', multipeResult, 'CreateOutTask').then(res => {
      //     // console.log(res)
      //     if (res.success) {
      //       this.$notify({
      //         title: this.$t('notify.success'), // '成功'
      //         message: '下架成功', // '操作成功',
      //         type: 'success',
      //         duration: 2000
      //       })
      //       this.getList()
      //     } else {
      //       this.$notify({
      //         title: this.$t('notify.failure'), // '失败'
      //         message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',
      //         type: 'error',
      //         duration: 2000
      //       })
      //     }
      //   })
      // })
      this.dialogShelfVisible = true
      this.getwarehouseNew()
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
                      this.configFormList[1].options = []
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
                this.configFormList[1].options = []
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
                        this.configFormList[1].options = []
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
    },
    /** 小货架标签打印 */
    printSamllTag() {
      this.printDlgVisible = false
      let rows = this.multipleSelection
      let LODOP = getLodop() // 判断是否需要下载打印控件，不需要则进行配置，再打印
      if (LODOP.statusHtml) {
        this.$alert(LODOP.statusHtml, '打印提示', {
          dangerouslyUseHTMLString: true,
          showClose: false,
          showConfirmButton: false
        })
        return
      }
      // for (let i = 0; i < rows.length; i++) {
      //   API.dataPost('PrintLog', { source: '10', sourceSysNo: rows[i].locationNo }, 'Insert')
      // }
      let results = []
      rows.map(item => {
        results.push({ source: '10', sourceSysNo: item.locationNo })
      })
      API.dataPost('PrintLog', results, 'Insert')
      let params = []
      rows.map(item => {
        params.push({ locationNo: item.locationNo })
      })
      this.printDataTest = params
      this.printData = Functions.splitArray(params, 4)
      this.printBeginS = true
      let strStyle = '<style>'
      strStyle += 'body {font-family: "黑体"; font-size: 8pt;margin:0 }'
      strStyle += '.in-block {display: inline-block; }'
      strStyle +=
        '.page{ width: 281mm; height: 191.5mm; position: relative; overflow: hidden; page-break-after: always; }'
      strStyle +=
        '.tag{ width: 220mm;height: 37mm;position: absolute;left: 30mm;background: #f2f2f2;border: 1px solid;page-break-after: always; }'
      strStyle += '.tagH0{ top: 15mm; }'
      strStyle += '.tagH1{ top: 60mm; }'
      strStyle += '.tagH2{ top: 105mm; }'
      strStyle += '.tagH3{ top: 150mm; }'
      strStyle +=
        '.left{ width: 160mm;height: 31mm;position: absolute;top: 3mm;left: 3mm;vertical-align: middle;text-align: left; }'
      strStyle += '.right{ width: 50mm;height: 31mm;position: absolute;top: 3mm;right: 3mm;vertical-align: middle; }'
      strStyle += '.logo{ width: 20mm;height: 20mm;line-height: 31mm; }'
      strStyle +=
        '.text{ position: absolute;width: 150mm;height: 31mm;line-height: 31mm;left: 28mm;font-weight: bold;font-size: 35pt; }'
      strStyle += '.qrcode{ width: 31mm;height: 31mm;line-height: 31mm; }'
      strStyle += '.arrow{ width: 13mm;height: 31mm;line-height: 31mm; position: absolute;left: 35mm; }'
      strStyle += '</style>'
      LODOP.PRINT_INIT('货位标签打印') // 打印初始化
      this.$nextTick(() => {
        let strHtml = this.$refs.smallTag.innerHTML
        // debugger
        let printTemplate = strStyle + '<body>' + strHtml + '</body>'
        LODOP.SET_PRINT_PAGESIZE(2, 0, 0, 'A4') // 1纵向、2横向，纸宽，纸高// 设定纸张大小
        LODOP.ADD_PRINT_HTM('3mm', '4mm', '291mm', '202mm', printTemplate) // Top,Left,Width,Height// 增加超文本项
        LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1) // 横向时的正向显示
        LODOP.PREVIEW()
        this.printBeginS = false
      })
    },
    /** 大货架标签打印 */
    printBigTag() {
      this.printDlgVisible = false
      let rows = this.multipleSelection
      let LODOP = getLodop() // 判断是否需要下载打印控件，不需要则进行配置，再打印
      if (LODOP.statusHtml) {
        this.$alert(LODOP.statusHtml, '打印提示', {
          dangerouslyUseHTMLString: true,
          showClose: false,
          showConfirmButton: false
        })
        return
      }
      // for (let i = 0; i < rows.length; i++) {
      //   API.dataPost('PrintLog', { source: '10', sourceSysNo: rows[i].locationNo }, 'Insert')
      // }
      let results = []
      rows.map(item => {
        results.push({ source: '10', sourceSysNo: item.locationNo })
      })
      API.dataPost('PrintLog', results, 'Insert')
      let params = []
      rows.map(item => {
        params.push({ locationNo: item.locationNo })
      })
      this.printDataTest = params
      this.printData = Functions.splitArray(params, 2)
      this.printBeginB = true
      let strStyle = '<style>'
      strStyle += 'body {font-family: "黑体"; font-size: 8pt;margin:0 }'
      strStyle += '.in-block{display: inline-block; }'
      strStyle +=
        '.page{ width: 281mm; height: 191.5mm; position: relative; overflow: hidden; page-break-after: always; }'
      strStyle +=
        '.tag{ width: 280mm;height: 70mm;position: absolute;background: #f2f2f2;border: 1px solid;page-break-after: always; }'
      strStyle += '.tagH0{ top: 20mm; }'
      strStyle += '.tagH1{ top: 100mm; }'
      strStyle +=
        '.left{ width: 185mm;height: 60mm;position: absolute;top: 5mm;left: 5mm;vertical-align: middle;text-align: left; }'
      strStyle +=
        '.right{ width: 84mm;height: 60mm;position: absolute;top: 15mm;right: 15mm;vertical-align: middle;text-align: right; }'
      strStyle += '.logo{ width: 20mm;height: 20mm;line-height: 60mm; }'
      strStyle +=
        '.text{ position: absolute;width: 180mm;height: 120mm;line-height: 20mm;top: 15mm;font-weight: bold; font-size: 33pt;  text-align: center; }'
      strStyle += '.qrcode{ width: 40mm;height: 40mm;line-height: 60mm; }'
      strStyle += '.arrow{ width: 15mm;height: 40mm;line-height: 60mm; }'
      strStyle += '</style>'
      LODOP.PRINT_INIT('货位标签打印') // 打印初始化
      this.$nextTick(() => {
        let strHtml = this.$refs.bigTag.innerHTML
        let printTemplate = strStyle + '<body>' + strHtml + '</body>'
        LODOP.SET_PRINT_PAGESIZE(2, 0, 0, 'A4') // 1纵向、2横向，纸宽，纸高// 设定纸张大小
        LODOP.ADD_PRINT_HTM('3mm', '4mm', '291mm', '202mm', printTemplate) // Top,Left,Width,Height// 增加超文本项
        LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1) // 横向时的正向显示
        LODOP.PREVIEW()
        this.printBeginB = false
      })
    },
    // 大小标签打印
    handleprintBarcode() {
      this.printDlgVisible = true
    },

    /** 打印弹窗关闭 */
    cancelPrinting() {
      this.printDlgVisible = false
    },
    // 查看打印记录
    handleCheckPrint(row) {
      // let row = this.multipleSelection[0]
      // console.log(row.row)
      this.SourceSysNo = row.row.locationNo
      API.get('PrintLog', { Source: '10', SourceSysNo: row.row.locationNo }, 'all').then(res => {
        if (res.items.length === 0) {
          this.$message.warning('当前打印记录为空！')
          return
        } else {
          this.formTitle = '查看打印记录'
          this.checkDialogFormVisible = true
        }
      })
    },
    handleDownloadPast() {
      // let Ids = [] // 选中的id集
      // if (this.multipleSelection.length > 0) {
      //   //  如果有选中的数据，就导出选中的数据，否则全部导出或根据搜索条件导出
      //   this.multipleSelection.map(item => {
      //     Ids.push(item.id)
      //   })
      //   // this.exportParams.Ids = Ids
      //   this.exportPast('box', { Ids: Ids }, 'Export')
      // } else {
      // delete this.exportParams.Ids
      this.exportPast('location', this.exportParams, 'Export')
      // }
    }
  }
}
</script>
