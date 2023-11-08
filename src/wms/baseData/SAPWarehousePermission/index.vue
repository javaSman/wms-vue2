<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="sapWarehouseCrud"
        :selection="multipleSelection"
        :button-items="BtnItems"
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
import EditForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
// import { API } from '@/api/generalAPI'
import { formList, queryItems, sapWarehouseCrud, BtnItems } from './config'
export default {
  name: 'SAPWarehousePermission',
  components: { Table, EditForm, CrudOperation },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'SapFactoryWarehouse',
      apiName: 'sapFactoryWarehouse',
      dialogTitle: this.$t('dialogHeader.SAPWarehousePermission'), // '仓库',

      formList,
      queryItems,
      sapWarehouseCrud,
      BtnItems,
      form: {},
      dialogFormVisible: false,
      formTitle: '',
      isEdit: false,
      layout: { gutter: 10, span: 12, xs: 24, sm: 12, md: 8, xl: 6 }
    }
  },
  created() {
    // this.getDict()
    // this.getWarehouse()
  },
  methods: {
    // /** 获取仓库编码下拉框值WarehouseType: 'Waste,Shelf,Nonproductive' */
    // getWarehouse() {
    //   API.get('warehouse', { IsPage: false }, 'all').then(res => {
    //     res.items.forEach(item => {
    //       item.label = item.warehouseID
    //       item.value = item.warehouseID
    //     })
    //     this.correspondForm[0].options = res.items
    //   })
    // },
    // getDict() {
    //   API.getDict('dict', { name: 'WarehouseType' }).then(res => {
    //     this.formList[3].options = res.details
    //   })
    // },
  }
}
</script>
