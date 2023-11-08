<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="costomerCrud"
        :selection="multipleSelection"
        :button-items="BtnItems"
        :download-loading.sync="downloadLoading"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toPrint="handlePrints()"
        @toDownload="handleDownloadPast()"
      />
    </div>
    <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
    <!-- <table>
      <tr>
        <td
          style="
            width: 33mm;
            line-height: 3.5mm;
            height: 7mm;
            overflow: hidden;
            font-size: 6pt;
            text-overflow: ellipsis;
            white-space: normal;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          "
        >
          {{ '阿斯蒂芬即可达拉斯房间里看到撒放几块了房价都是立刻减肥的深刻理解' }}
        </td>
      </tr>
    </table> -->
    <!-- <div
      style="
        width: 33mm;
        line-height: 3.5mm;
        height: 7mm;
        overflow: hidden;
        font-size: 6pt;
        text-overflow: ellipsis;
        white-space: normal;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      "
    >
      {{ '阿斯蒂芬即可达拉斯房间里看到撒放几块了房价都是立刻减肥的深刻理解' }}
    </div> -->
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
      :limit.sync="listQuery.MaxResultCount"
      :is-sort="true"
      :sorting.sync="listQuery.Sorting"
      :dict-gather="dictGather"
      @pagination="getList"
      @tableSort="getList"
    />
    <EditForm
      :dialog-form-visible="dialogFormVisible"
      :form-title="formTitle"
      :form-list="formList"
      :form-data="form"
      :is-edit="isEdit"
      :api-name="apiName"
      :dialog-width="950"
      @create="handleCreate"
      @cancel="cancel"
      @reset="reset"
    />
    <!-- <div v-if="printBegin" id="inventoryTable" ref="printTable" style="display: none">
      <PrintTable v-for="(item, index) in printData" :key="index" :data="item" @change="handleChange" />
    </div> -->
  </div>
</template>
<script>
import Table from '@/components/Table'
import EditForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
// import PrintTable from '@/views/printable-template/inventoryTable'
import Functions from '@/utils/functions'
import { getLodop } from '@/utils/lodop'
import basics from '@/mixins'
import { formList, queryItems, batchFormList, costomerCrud, BtnItems } from './config'
export default {
  name: 'Label',
  components: { Table, EditForm, CrudOperation },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'MaterialBarCode',
      apiName: 'materialbarcode',
      dialogTitle: this.$t('dialogHeader.label'), // 标签,
      BtnItems,
      formList,
      queryItems,
      batchFormList,
      costomerCrud,

      tableList: [],
      form: {},
      dialogFormVisible: false,
      formTitle: '',
      isEdit: false,

      downloadLoading: false,
      printBegin: false,
      printData: [],
      changeNum: 0,
      exportParams: {} // 导出搜索条件
    }
  },
  created() {
    // this.formChange()
    this.getDict()
    this.getWarehouse()
  },
  methods: {
    formChange() {
      this.formList.forEach(item => {
        switch (item.prop) {
          case 'materialID': {
            item.blur = row => {
              this.getmaterial()
            }
            item.clear = row => {
              this.clearmaterial()
            }
            break
          }
          case 'supplierCode': {
            item.blur = row => {
              this.getsipplier()
            }
            item.clear = row => {
              this.clearsipplier()
            }
            break
          }
        }
      })
    },
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        // let arr = []
        res.items.forEach(item => {
          // arr.push(item.warehouseID)
          item.label = item.warehouseName
          item.value = item.warehouseID
          item.asign = item.warehouseID
        })
        this.queryItems[11].options = res.items
      })
    },
    // 输入物料编号失焦获取值
    getmaterial() {
      if (this.form.materialID !== '' || this.form.materialID !== undefined) {
        API.get('materials', { materialID: this.form.materialID }, 'GetMaterialID').then(res => {
          // console.log(res.data.materialDesc)
          // console.log(res.data.specs)
          // console.log(res.data.baseUnit)
          this.$set(this.form, 'materialDesc', res.data.materialDesc)
          this.$set(this.form, 'specs', res.data.specs)
          this.$set(this.form, 'baseUnit', res.data.baseUnit)
        })
      }
    },
    // 清除删除对应带出来得值
    clearmaterial() {
      this.form.materialDesc = ''
      this.form.specs = ''
      this.form.baseUnit = ''
    },
    // 输入供应商编号带出名称
    getsipplier() {
      if (this.form.supplierCode !== '' || this.form.supplierCode !== undefined) {
        API.get('Supplier', { supplierCode: this.form.supplierCode }, 'all').then(res => {
          // console.log(res.items[0].supplierName)
          this.$set(this.form, 'supplierName', res.items[0].supplierName)
        })
      }
    },
    // 清除删除对应带出来得值
    clearsipplier() {
      this.form.supplierName = ''
    },
    handleUpdate() {
      // this.getOpts()
      this.getForm(this.multipleSelection[0].id)
    },

    // dialogCancel(val) {
    //   this.uploadDialogVisible = false
    //   this.batchDialogVisible = false
    // },
    handleChange() {
      console.log('aaaaaaaaaaaaaaaaa')
      this.changeNum = this.changeNum + 1
      if (this.changeNum === this.multipleSelection.length) {
        this.print()
        this.changeNum = 0
      }
    },
    handlePrints() {
      let row = this.multipleSelection
      for (let i = 0; i < row.length; i++) {
        let trueL = this.getByteLen(row[i].specs)
        if (trueL > 24) {
          let sliceWord = row[i].specs.slice(0, 24) + '...'
          // console.log(row[i].specs.indexOf('家'))
          this.$set(row[i], 'specsNew', sliceWord)
          // console.log(row)
        } else {
          this.$set(row[i], 'specsNew', row[i].specs)
        }

        if (row[i].grossWeight === 0) {
          // console.log(111)
          console.log(row[i])
          this.$set(row[i], 'grossWeight', '')
        }
      }
      this.printBegin = true
      this.printData = Functions.splitArray(row, 1)
    },
    // 识别字符串长度
    getByteLen(str) {
      var len = 0
      if (str !== null) {
        for (var i = 0; i < str.length; i++) {
          var a = str.charAt(i)
          if (a.match(/[^\x00-\xff]/gi) != null) {
            len += 2
          } else {
            len += 1
          }
        }
        return len
      }
    },
    print() {
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
        strStyle += '.page { width: 94mm; height: 69mm; page-break-after: always;position: relative;overflow: hidden;}'
        strStyle +=
          'table {position:relative;margin: auto;border-collapse: collapse;font-family: 宋体;font-size: 7pt;table-layout: fixed;word-break: break-all;page-break-after:always;  table-layout: fixed;  margin-left: 5mm;}'
        strStyle += '.table td {text-align: left;height: 7mm;border: 1px solid #000;padding: 0 3px;}'
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
        strStyle += '.qrcodestyle {margin-left: 27px;}'
        strStyle += '.textSt {margin: 10px 40px;font-size: 12px;}'
        strStyle +=
          '.ruleStyle {   display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}'
        strStyle += '</style>'
        this.$nextTick(() => {
          let strHtml = document.getElementById('inventoryTable').innerHTML
          LODOP.PRINT_INIT('标签打印')
          LODOP.SET_PRINT_PAGESIZE(1, '100mm', '70mm') // 1纵向、2横向，纸宽，纸高，A4规格
          let printTemplate = strStyle + '<body>' + strHtml + '</body>'
          LODOP.ADD_PRINT_HTM('0mm', '0mm', '100mm', '70mm', printTemplate) // Top,Left,Width,Height
          LODOP.PREVIEW()
          this.printBegin = false
        })
      }
    },
    getDict() {
      API.getDict('dict', { name: 'MovementType' }).then(res => {
        // console.error(res)
        this.queryItems[3].options = res.details
      })
    },
    handleDownloadPast() {
      let Ids = [] // 选中的id集
      if (this.multipleSelection.length > 0) {
        //  如果有选中的数据，就导出选中的数据，否则全部导出或根据搜索条件导出
        this.multipleSelection.map(item => {
          Ids.push(item.id)
        })
        // this.exportParams.Ids = Ids
        this.exportPast('MaterialBarcode', { Ids: Ids }, 'Export')
      } else {
        // delete this.exportParams.Ids
        this.exportPast('MaterialBarcode', this.exportParams, 'Export')
      }
    }
  }
}
</script>
