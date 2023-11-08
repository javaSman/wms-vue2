<template>
  <div class="app-container">
    <div class="head-container">
      <filter-container :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="UserWarehouseCrud"
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
      :cbg-remote="cbgRemote"
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
import { identityAPI } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import { API } from '@/api/generalAPI'
import { formList, queryItems, UserWarehouseCrud } from './config'
export default {
  name: 'UserWarehouse',
  components: { Table, EditForm, CrudOperation },
  mixins: [colDesign, combogrid, filterContainer, basics],
  data() {
    return {
      colName: 'UserWarehouse',
      apiName: 'userwarehouse',
      dialogTitle: this.$t('dialogHeader.userWarehouse'), // '用户仓库权限',

      formList,
      queryItems,
      UserWarehouseCrud,

      form: {},
      dialogFormVisible: false,
      formTitle: '',
      isEdit: false,
      warehousecbgAttr: formList[2] // 远程
    }
  },
  created() {
    this.formList.forEach(item => {
      switch (item.prop) {
        case 'userID': {
          item.change = row => {
            this.inputUserName(row)
          }
          break
        }
      }
    })
  },
  methods: {
    handleCreate() {
      this.form = {}
      this.getOpts()
      this.getCreate()
      this.dialogOpen()
    },
    handleUpdate() {
      this.getOpts()
      this.getCreate()
      this.getForm(this.multipleSelection[0].id)
    },
    getOpts() {
      this.formList[2].optStatus = 'init'
      identityAPI.getData('users', { SkipCount: 0, MaxResultCount: 1000 }, null).then(res => {
        res.items.forEach(item => {
          item.label = item.userName
          item.value = item.userName
        })
        this.formList[0].options = res.items
      })
    },
    inputUserName(row) {
      this.formList[0].options.forEach(item => {
        if (row === item.userName) {
          this.form.userName = item.name
        } else if (row === '') {
          this.form.userName = ''
          this.getNewWarehouse()
        }
      })
    },
    getCreate() {
      this.getCbgRemoteOpts(this.warehousecbgAttr, 'warehouse')
      // this.getCbgOpts('warehouse', { IsPage: false })
    },
    // 仓库网格远程下拉搜索
    cbgRemote(node, str) {
      // if (node === this.boxcbgAttr.prop) {
      //   this.getCbgRemoteSearch(this.boxcbgAttr, 'box', { BoxID: str })
      // }
      if (node === this.warehousecbgAttr.prop) {
        this.getCbgRemoteSearch(this.warehousecbgAttr, 'warehouse', { WarehouseNo: str })
      }
    },
    //仓库赋值
    getNewWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        // let arr = []
        res.items.forEach(item => {
          // arr.push(item.WarehouseNo)
          item.label = item.warehouseNo
          item.value = item.warehouseNo
        })
        this.formList[2].options = res.items
      })
    }
  }
}
</script>
