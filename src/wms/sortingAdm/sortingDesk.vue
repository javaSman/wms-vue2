<template>
  <div class="app-container">
    <div class="head-container">
      <filter-container
        :form-items="SortingDeskQueryItems"
        :list-query.sync="listQuery"
        @query="getList"
        @reset="reset"
      />
      <CrudOperation
        :button-items="sortingDeskBtnItem"
        :permission-crud="SortingDeskCrud"
        :selection="multipleSelection"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toOutEmptyBox="handleOutEmptyBox()"
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
      :form-list="SortingDeskFormList"
      :form-data="form"
      :is-edit="isEdit"
      :api-name="apiName"
      @create="handleCreate"
      @cancel="cancel"
      @reset="reset"
    />
  </div>
</template>
<script>
import CrudOperation from '@/components/Crud/CRUD.operation'
import Table from '@/components/Table'
import EditForm from '@/components/EditDialog'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { SortingDeskQueryItems, sortingDeskBtnItem, SortingDeskCrud, SortingDeskFormList } from './config'
export default {
  name: 'SortingDesk',
  components: { CrudOperation, Table, EditForm },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'SortingDesk',
      apiName: 'sortingdesk',
      dialogTitle: this.$t('dialogHeader.sortingDesk'), // '分拣台',

      SortingDeskQueryItems,
      SortingDeskFormList,
      sortingDeskBtnItem,
      SortingDeskCrud,

      form: {},
      dialogFormVisible: false,
      formTitle: '',
      isEdit: false
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    getDict() {
      API.getDict('dict', { name: 'SortingDeskStatus' }).then(res => {
        this.SortingDeskFormList[3].options = res.details
      })
    },
    /** 补空箱 */
    handleOutEmptyBox() {
      // '提示'
      this.$confirm('确认补空箱选中项吗?', this.$t('dialog.tip'), {
        confirmButtonText: this.$t('button.confirm'), // '确认'
        cancelButtonText: this.$t('button.cancel'), // '取消'
        type: 'warning'
      })
        .then(() => {
          this.sortingDeskBtnItem[0].loading = true
          let row = this.multipleSelection[0]
          API.dataPost('outShelves', { deliverLocation: row.deskID }, 'EmptyBoxOutShelves')
            .then(res => {
              this.sortingDeskBtnItem[0].loading = false
              if (res.success) {
                this.outShelvesDialogVisible = false
                this.$notify.success({
                  title: this.$t('notify.success'), // '成功'
                  message: this.$t('notify.operateSuccess'), // '操作成功',
                  duration: 2000
                })
                this.getList()
              } else {
                this.$notify.error({
                  title: this.$t('notify.failure'), // '失败'
                  // 接口返回数据，待中英配置
                  message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',
                  duration: 2000
                })
              }
            })
            .catch(() => {
              this.sortingDeskBtnItem[0].loading = false
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消补空箱'
          })
        })
    }
  }
}
</script>
