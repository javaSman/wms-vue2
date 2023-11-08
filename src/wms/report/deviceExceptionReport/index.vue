<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="Crud"
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
import { queryItems, Crud, BtnItems } from './config'
export default {
  name: 'DeviceExceptionReport',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'DeviceError',
      apiName: 'deviceerror',
      queryItems,
      Crud,
      BtnItems,
      loading: false,
      formLoading: false
      // isData: false
    }
  },
  created() {
    // this.getDict()
    this.queryItems.forEach(item => {
      switch (item.prop) {
        case 'warehouseID': {
          item.change = row => {
            this.getWarehouseName(row)
            if (row === '') {
              this.queryItems[1].options = []
            }
          }
        }
      }
    })
    this.getWarehouse()
  },
  methods: {
    // getDict() {
    //   API.getDict('dict', { name: 'WarehouseType' }).then(res => {
    //     this.formList[3].options = res.details
    //   })
    // },
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        // let arr = []
        res.items.forEach(item => {
          // arr.push(item.WarehouseNo)
          item.label = item.warehouseName
          item.value = item.warehouseNo
        })
        this.queryItems[0].options = res.items
      })
    },
    getWarehouseName(row) {
      API.get('deviceerror', { IsPage: false, WarehouseID: row }, 'GetDevice').then(res => {
        res.device.forEach(item => {
          item.label = item.deviceName
          item.value = item.deviceID
        })
        this.queryItems[1].options = res.device
      })
    }
  }
}
</script>
