<template>
  <div class="components-container">
    <div class="head-container">
      <filter-collapse :form-items="boxQueryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <CrudOperation
      :permission-crud="boxCrud"
      :button-items="boxBtnItems"
      :selection="multipleSelection"
      :download-loading.sync="downloadLoading"
      @toAdd="handleCreate"
      @toEdit="handleUpdate()"
      @toDelete="handleDelete()"
      @toBatchOutShelves="handleBatchOutShelves()"
      @toAlleyOutShelves="handleAlleyOutShelves()"
      @toImport="handleImport()"
      @toprintBarcode="handleprintBarcode()"
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
            @toCheckPrint="handleCheckPrint"
          />
        </template>
        <template slot="paneR">
          <!-- '载具明细' -->
          <h4>{{ $t('dialogHeader.boxDetails') }}</h4>
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
    <EditDetailOptDialog
      :dialog-form-visible.sync="checkDialogFormVisible"
      :layout="layout"
      :form-title="formTitle"
      :form-data="form"
      :detail-table.sync="editDetailTable"
      :is-edit="true"
      :table-list="boxTableList"
      :api-name="apiNames"
      :detail-title="detailTitle"
      :dict-gather="dictGather"
      :dialogWidth="800"
      :SourceSysNo="SourceSysNo"
      @create="handleCreate"
      @reset="reset"
      @cancel="dialogCancel"
    />
    <EditForm
      :dialog-form-visible="dialogFormVisible"
      :form-title="formTitle"
      :form-list="formList"
      :form-data="form"
      :is-edit="isEdit"
      :api-name="apiName"
      :dialog-width="750"
      :layout="layout"
      @create="handleCreate"
      @cancel="cancel"
      @reset="reset"
    />
    <UploadDialog
      :dialog-visible.sync="uploadDialogVisible"
      :api-name="apiName"
      :has-template="true"
      :template-path="templatePath"
      @reset="reset"
      @cancel="dialogCancel"
    />
    <!-- <EditBatchDialog
      :dialog-visible.sync="batchDialogVisible"
      :form-title="formTitle"
      :form-data="batchForm"
      :batch-form-list="batchFormList"
      :data-list="tableList"
      :detail-table.sync="list"
      api-name="outshelves"
      :batch-table-list="column"
      :dict-gather="dictGather"
      @reset="reset"
      @cancel="dialogCancel"
    />
    <EditAlleyOutShelves
      :dialog-visible.sync="alleyDialogVisible"
      :form-title="formTitle"
      :form-list="AlleyFormList"
      :form-data="form"
      api-name="outshelves"
      @reset="reset"
      @cancel="dialogCancel"
    /> -->
    <div v-if="printBegin" id="boxBarcode" ref="boxBarcode" style="display: none">
      <boxBarcode v-for="(item, index) in printData" :key="index" :data="item" />
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table'
import UploadDialog from '@/components/Upload/UploadDialog'
import EditDetailOptDialog from './module/EditDetailOptDialog'
import EditForm from '@/components/EditDialog'
import EditBatchDialog from './module/EditBatchDialog'
import EditAlleyOutShelves from './module/EditAlleyOutShelves'
import { API } from '@/api/generalAPI'
// import { newAPI } from '@/api/newgeneralAPI'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import splitPane from '@/mixins/splitPane'
import basics from '@/mixins'
import Functions from '@/utils/functions'
import boxBarcode from '@/views/printable-template/boxBarcode'
import { getLodop } from '@/utils/lodop'

import {
  boxQueryItems,
  // boxFormList,
  boxTableList,
  boxBtnItems,
  boxCrud,
  materialQueryItems,
  batchFormList,
  AlleyFormList,
  ptintFormList,
  formList,
  TableBtn
} from './config'
export default {
  name: 'Box',
  components: {
    Table,
    EditBatchDialog,
    EditAlleyOutShelves,
    CrudOperation,
    UploadDialog,
    boxBarcode,
    EditForm,
    EditDetailOptDialog
  },
  mixins: [colDesign, filterContainer, basics, splitPane],
  data() {
    return {
      colName: 'Box',
      detailColName: 'BoxDetails',
      apiName: 'box',
      apiNames: 'PrintLog',
      dialogTitle: this.$t('dialogHeader.box'), // '载具',
      templatePath: '/Temp/UploadTemp/载具注册模板.xlsx',

      boxQueryItems,
      // boxFormList,
      boxTableList,
      batchFormList,
      AlleyFormList,
      boxBtnItems,
      ptintFormList,
      boxCrud,

      checkParams: 'materialID',
      colDetailName: 'Materials',
      apiDetailName: 'materials',

      detailTitle: this.$t('dialogHeader.materials'), // '物料',

      materialQueryItems,
      layout: { gutter: 10, span: 12, xs: 12, sm: 12, md: 8, xl: 6 },

      form: {},
      dialogFormVisible: false,

      batchForm: {},
      tableList: [],
      editDetailTable: [],
      ptintFormVisible: false,
      batchDialogVisible: false,
      uploadDialogVisible: false,

      alleyDialogVisible: false,

      formTitle: '',
      isEdit: false,

      detailQuery: {
        boxID: null
      },
      detailTable: [],

      listLoading: true,
      detailListLoading: false,

      downloadLoading: false,
      exportParams: {},
      API,
      printBegin: false,
      printData: [],
      formList,
      TableBtn,
      checkDialogFormVisible: false,
      SourceSysNo: ''
      // newAPI
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    handleUpdate() {
      this.getForm(this.multipleSelection[0].id)
      this.getDetail(this.multipleSelection[0])
    },
    getDetail(row) {
      this.detailListLoading = true
      this.detailQuery.boxNo = row.boxNo
      API.getData('box', this.detailQuery, 'getDetails').then(res => {
        this.detailTable = res.items
        // this.editDetailTable = res.items
        this.detailListLoading = false
      })
    },
    getDict() {
      // 载具类型
      API.getDict('dict', { name: 'BoxType' }).then(res => {
        this.boxQueryItems[1].options = this.formList[1].options = res.details
      })
      // 载具状态
      API.getDict('dict', { name: 'BoxState' }).then(res => {
        this.AlleyFormList[3].options = this.boxQueryItems[2].options = this.formList[2].options = res.details
      })

      API.getDict('dict', { name: 'MaterialType' }).then(res => {
        this.materialQueryItems[2].options = res.details
      })
      // 载具位置状态
      API.getDict('dict', { name: 'BoxPositionStatus' }).then(res => {
        this.formList[3].options = res.details
      })
      // 料架装载状态
      API.getDict('dict', { name: 'MaterialShelfStatus' }).then(res => {
        this.boxQueryItems[4].options = this.formList[5].options = res.details
      })
    },
    getOpts() {
      API.getData('wharf', { IsPage: false }).then(res => {
        res.items.forEach(item => {
          item.label = item.name
          item.value = item.wharfID
        })
        this.AlleyFormList[1].options = this.batchFormList[0].options = res.items
      })
    },
    handleBatchOutShelves() {
      this.getOpts()
      this.formTitle = this.$t('dialog.batchShelves') + this.dialogTitle // '批量下架'
      this.batchForm = { boxIDs: [] }
      this.tableList = JSON.parse(JSON.stringify(this.multipleSelection))
      this.batchDialogVisible = true
    },
    handleAlleyOutShelves() {
      this.getOpts()
      this.formTitle = '按巷道下架'
      this.form.statusID = 'Empty'
      this.alleyDialogVisible = true
    },

    // 导入
    handleImport() {
      this.uploadDialogVisible = true
    },
    // 补签
    handleReprint() {
      // console.log(111)
      API.getForm(this.apiName, this.multipleSelection[0].id).then(res => {
        this.form = {
          printer: '',
          id: res.id
        }
        this.ptintFormVisible = true
      })
    },
    dialogCancel(val) {
      this.uploadDialogVisible = false
      this.batchDialogVisible = false
      this.alleyDialogVisible = false
      this.ptintFormVisible = false
      this.form = {}
      this.checkDialogFormVisible = false
    },
    // handleChange() {
    //   this.changeNum = this.changeNum + 1
    //   if (this.changeNum === this.multipleSelection.length) {
    //     this.print()
    //     this.changeNum = 0
    //   }
    // },
    handleprintBarcode() {
      let row = this.multipleSelection
      this.printBegin = true
      this.printData = Functions.splitArray(row, 1)
      // console.log(this.printData)
      // for (let i = 0; i < row.length; i++) {
      //   API.dataPost('PrintLog', { source: '20', sourceSysNo: row[i].boxNo }, 'Insert')
      // }
      let results = []
      row.forEach(item => {
        results.push({ source: '20', sourceSysNo: item.boxNo })
      })
      API.dataPost('PrintLog', results, 'Insert')
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
        strStyle += '.page { width: 79mm;height: 23.5mm; page-break-after: always;position: relative;overflow: hidden;}'
        strStyle += '.qrCode {width: 22mm;height: 22mm;border: 1px soild #000;position: absolute;top: 1mm;left: 0.5mm;}'
        strStyle += '.qrText {position: absolute;top: 7.5mm;left: 22.5mm;}'
        strStyle += '</style>'
        this.$nextTick(() => {
          let strHtml = document.getElementById('boxBarcode').innerHTML
          LODOP.PRINT_INIT('载具条码打印')
          LODOP.SET_PRINT_PAGESIZE(1, '80mm', '24mm') // 1纵向、2横向，纸宽，纸高，A4规格
          let printTemplate = strStyle + '<body>' + strHtml + '</body>'
          LODOP.ADD_PRINT_HTM('0mm', '0mm', '80mm', '24mm', printTemplate) // Top,Left,Width,Height
          LODOP.PREVIEW()
          this.printBegin = false
        })
      }
    },
    // 导出
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
      this.exportPast('box', this.exportParams, 'Export')
      // }
    },
    // 查看打印记录
    handleCheckPrint(row) {
      // let row = this.multipleSelection[0]
      this.SourceSysNo = row.row.boxNo
      API.get('PrintLog', { Source: '20', SourceSysNo: row.row.boxNo }, 'all').then(res => {
        console.log(res)
        if (res.items.length === 0) {
          this.$message.warning('当前打印记录为空！')
          return
        } else {
          this.formTitle = '查看打印记录'
          this.checkDialogFormVisible = true
        }
      })
    }
  }
}
</script>
