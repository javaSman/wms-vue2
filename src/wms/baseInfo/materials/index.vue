<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="MaterialCrud"
        :selection="multipleSelection"
        :button-items="BtnItems"
        :download-loading.sync="downloadLoading"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toDownload="handleDownloadPast()"
        @toInStorage="handleStorage(1)"
        @toNoInStorage="handleStorage(0)"
      />
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
      :dialog-width="800"
      :layout="layout"
      @create="handleCreate"
      @cancel="cancel"
      @reset="reset"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import CrudOperation from '@/components/Crud/CRUD.operation'
import EditForm from '@/components/EditDialog'
// import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { API } from '@/api/generalAPI'
import { queryItems, MaterialCrud, BtnItems, formList } from './config'
export default {
  name: 'Materials',
  components: { Table, CrudOperation, EditForm },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'Material',
      apiName: 'material',
      dialogTitle: this.$t('dialogHeader.materials'), // '物料',
      queryItems,
      MaterialCrud,
      BtnItems,
      formList,
      tableList: [],
      form: {},
      formTitle: '',
      isEdit: false,
      dialogFormVisible: false,
      downloadLoading: false,
      exportParams: {},
      layout: { gutter: undefined, span: 12, xs: 24, sm: 12, md: 8, xl: 6 }
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    getDict() {
      API.getDict('dict', { name: 'MaterialType' }).then(res => {
        this.formList[2].options = res.details
      })
    },
    handleImport() {
      this.uploadDialogVisible = true
    },
    handleDownloadPast() {
      let Ids = [] // 选中的id集
      if (this.multipleSelection.length > 0) {
        //  如果有选中的数据，就导出选中的数据，否则全部导出或根据搜索条件导出
        this.multipleSelection.map(item => {
          Ids.push(item.id)
        })
        // this.exportParams.Ids = Ids
        this.exportPast('material', { Ids: Ids }, 'Export')
      } else {
        // delete this.exportParams.Ids
        this.exportPast('material', this.exportParams, 'Export')
      }
    },
    /* 是否可入库 */
    async handleStorage(type) {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择数据',
          type: 'warning'
        })
        return
      }
      let _params = {
        id: this.multipleSelection.map(item => item.id),
        type: type
      }
      let res = await API.dataPost('material', _params, 'SetMaterialCube')
      if (!res.success) {
        this.$message({
          message: res.message,
          type: 'warning'
        })
        return
      }
      this.$message({
        message: res.message,
        type: 'success'
      })
      this.getList()
    }
  }}
</script>
