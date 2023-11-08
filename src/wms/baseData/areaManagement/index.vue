<template>
  <div class="app-container">
    <div class="head-container">
      <filter-container :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="AreasCrud"
        :selection="multipleSelection"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
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
      :dialog-width="650"
      :layout="layout"
      @create="handleCreate"
      @cancel="cancel"
      @reset="reset"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import EditForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import { formList, queryItems, AreasCrud } from './config'
export default {
  name: 'AreaManagement',
  components: { Table, EditForm, CrudOperation },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'Area',
      apiName: 'area',
      dialogTitle: this.$t('dialogHeader.areas'), // '区域',

      formList,
      queryItems,
      AreasCrud,

      form: {},
      dialogFormVisible: false,
      formTitle: '',
      isEdit: false,
      layout: { gutter: 10, span: 24, xs: 24, sm: 12, md: 8, xl: 6 }
    }
  },
  created() {},
  methods: {
    handleCreate() {
      this.form = {}
      this.dialogOpen()
      this.getNewWarehouse()
    },
    handleUpdate() {
      this.getForm(this.multipleSelection[0].id)
      this.getNewWarehouse()
    },
    getNewWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        // let arr = []
        res.items.forEach(item => {
          // arr.push(item.WarehouseNo)
          item.label = item.warehouseName
          item.value = item.warehouseNo
        })
        this.formList[1].options = res.items
      })
    }
  }
}
</script>
