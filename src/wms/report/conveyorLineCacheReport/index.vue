<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="Crud"
        :selection="multipleSelection"
        :button-items="BtnItems"
        @toDelete="handleDelete"
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
      :is-edit="true"
      :submit="confirm"
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
import { API } from '@/api/generalAPI'
import { query, submit } from '@/api/wcsAPI'
import { queryItems, Crud, BtnItems, formList } from './config'
export default {
  name: 'ConveyorLineCacheReport',
  components: { Table, CrudOperation, EditForm },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'BoxDeviceCache',
      // apiName: 'deviceerror',
      queryItems,
      Crud,
      BtnItems,
      loading: false,
      formLoading: false,
      dialogFormVisible: false,
      formTitle: '',
      formList,
      form: {}
      // isData: false
    }
  },
  created() {
    // this.getDict()
    this.getList()
    this.getWarehouse()
  },
  methods: {
    getList() {
      // let data = {
      //   WarehouseId: this.listQuery.warehouseNo
      // }
      query(this.listQuery).then(res => {
        this.list = res.BoxDeviceCacheList
      })
    },
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
    handleEdit() {
      this.dialogFormVisible = true
      this.$set(this.form, 'WarehouseID', 'ZNC03')
      this.$set(this.form, 'DeviceID', this.multipleSelection[0].DeviceId)
      this.$set(this.form, 'source', '0')
    },
    confirm() {
      submit(this.form).then(res => {
        if (res.IsError === false) {
          this.$notify({
            title: this.$t('notify.success'),
            message: this.$t('notify.operateSuccess'),
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: this.$t('notify.failure'),
            message: res.ErrMsg,
            type: 'error',
            duration: 2000
          })
        }
      })
      return true
    },
    handleDelete() {
      this.$confirm('确定删除选中数据?', this.$t('dialog.tip'), {
        confirmButtonText: this.$t('button.confirm'), // '确认'
        cancelButtonText: this.$t('button.cancel'), // '取消'
        type: 'warning'
      }).then(() => {
        let data = {
          WarehouseID: 'ZNC03',
          BoxNo: this.multipleSelection[0].BoxNo,
          Type: 1
        }
        submit(data).then(res => {
          if (res.IsError === false) {
            this.$notify({
              title: this.$t('notify.success'),
              message: res.message,
              type: 'success',
              duration: 2000
            })
            this.getList()
          } else {
            this.$notify({
              title: this.$t('notify.failure'),
              message: res.message,
              type: 'error',
              duration: 2000
            })
          }
        })
      })
    }
  }
}
</script>
