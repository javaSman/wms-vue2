<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="LocationsCrud"
        :button-items="locationsBtnItems"
        :selection="multipleSelection"
        :download-loading.sync="downloadLoading"
        @toAdd="handleCreate()"
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
    <CreateForm
      ref="formList"
      :dialog-form-visible="dialogFormVisible"
      :form-title="formTitle"
      :form-list="formList"
      :form-data="form"
      :is-edit="true"
      :dialog-width="950"
      :layout="layout"
      :submit="submit"
      @cancel="cancel"
      @reset="reset"
    />
    <EditForm
      :dialog-form-visible="dialogVisible"
      :form-title="formTitle"
      :form-list="formList"
      :form-data="formData"
      :is-edit="true"
      :dialog-width="950"
      :layout="layout"
      :submit="confirm"
      @cancel="cancel"
      @reset="reset"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import CreateForm from '@/components/EditDialog'
import EditForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { formList, queryItems, LocationsCrud, locationsBtnItems } from './config'
export default {
  name: 'CallAGVWarehousing',
  components: { Table, EditForm, CrudOperation, CreateForm },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'FloorHeight',
      apiName: 'floorHeight',
      locationsBtnItems,
      formList,
      queryItems,
      LocationsCrud,

      form: {},
      formData: {},
      dialogFormVisible: false,
      dialogVisible: false,
      formTitle: '',
      layout: { gutter: undefined, span: 12, xs: 24, sm: 12, md: 8, xl: 6 },
      downloadLoading: false,
      exportParams: {}
    }
  },
  created() {
    this.getWarehouse()
  },
  mounted() {},
  methods: {
    // 获取仓库
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.warehouseNo
          item.value = item.warehouseNo
        })
        this.formList[1].options = res.items
      })
    },
    handleCreate() {
      this.formList[0].disabled = false
      this.dialogFormVisible = true
      this.formTitle = '新增层高'
    },
    submit() {
      let params = {
        floor: this.form.Floor,
        height: this.form.Height,
        unit: this.form.unit,
        warehouseNo: this.form.warehouseNo
      }
      this.$refs.formList.$refs.formList.$refs.formList.validate(valid => {
        if (valid) {
          API.dataPost('floorHeight', params)
            .then(res => {
              if (res.id !== '') {
                this.$notify({
                  title: this.$t('notify.success'), // 成功
                  message: res.message, // 返回成功信息
                  type: 'success',
                  duration: 2000
                })
                this.getList()
                this.dialogFormVisible = false
              } else {
                this.$notify({
                  title: this.$t('notify.failure'), // '失败'
                  message: res.message, // '返回失败信息',
                  type: 'error',
                  duration: 2000
                })
              }
            })
            .catch(() => {
              this.dialogFormVisible = false
            })
        }
      })
      return true
    },
    handleUpdate() {
      this.formTitle = '修改层高'
      this.dialogVisible = true
      this.formList[0].disabled = true
      let row = this.multipleSelection
      let Floor = []
      let Height = []
      let unit = []
      let warehouse = []
      row.forEach(items => {
        Floor.push(items.floor)
        Height.push(items.height)
        unit.push(items.unit)
        warehouse.push(items.warehouseNo)
      })
      this.$set(this.formData, 'Floor', Floor.toString())
      this.$set(this.formData, 'Height', Height.toString())
      this.$set(this.formData, 'unit', unit.toString())
      this.$set(this.formData, 'warehouseNo', warehouse.toString())
    },
    confirm() {
      let params = {
        floor: this.formData.Floor,
        height: this.formData.Height,
        unit: this.formData.unit,
        warehouseNo: this.formData.warehouseNo,
        id: this.multipleSelection[0].id
      }
      API.dataPut('floorHeight', params, 'Update').then(res => {
        if (res.success) {
          this.$notify({
            title: this.$t('notify.success'), // 成功
            message: res.message, // 返回成功信息
            type: 'success',
            duration: 2000
          })
          this.getList()
          this.dialogVisible = false
        } else {
          this.$notify({
            title: this.$t('notify.failure'), // '失败'
            message: res.message, // '操作失败',
            type: 'error',
            duration: 2000
          })
        }
      })
      return true
    },
    handleDelete() {
      let Array = []
      let rows = this.multipleSelection
      rows.filter(items => {
        Array.push(items.id)
      })
      API.dataPost(this.apiName, Array, 'Delete').then(res => {
        if (res.success) {
          this.$notify({
            title: this.$t('notify.success'), // 成功
            message: res.message, // 返回成功信息
            type: 'success',
            duration: 2000
          })
          this.getList()
        } else {
          this.$notify({
            title: this.$t('notify.failure'), // '失败'
            message: res.message, // '返回失败信息'
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    cancel() {
      this.dialogVisible = false
      this.dialogFormVisible = false
    }
  }
}
</script>
