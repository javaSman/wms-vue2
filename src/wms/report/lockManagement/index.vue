<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="LockCrud"
        :selection="multipleSelection"
        :button-items="BtnItems"
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
  </div>
</template>
<script>
import Table from '@/components/Table'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { API } from '@/api/generalAPI'
import { queryItems, LockCrud, BtnItems } from './config'
export default {
  name: 'LockManagement',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'LockStock',
      apiName: 'lockStock',
      queryItems,
      LockCrud,
      BtnItems,
      loading: false,
      formLoading: false,
      isData: false
    }
  },
  created() {
    // this.getDict()
  },
  methods: {
    // getDict() {
    //   API.getDict('dict', { name: 'WarehouseType' }).then(res => {
    //     this.formList[3].options = res.details
    //   })
    // },
  }
}
</script>
