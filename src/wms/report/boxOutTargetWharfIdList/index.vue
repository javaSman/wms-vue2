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
  </div>
</template>
<script>
import Table from '@/components/Table'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
// import { API } from '@/api/generalAPI'
import { GetBoxOutTargetWharfIdList, ResetCache } from '@/api/wcsAPI'
import { queryItems, Crud, BtnItems } from './config'
export default {
  name: 'BoxOutTargetWharfIdList',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'BoxOutTargetWharfIdDto',
      // apiName: '',
      queryItems,
      Crud,
      BtnItems,
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.SkipCount = (this.page - 1) * this.listQuery.MaxResultCount
      GetBoxOutTargetWharfIdList(this.listQuery).then(res => {
        this.list = res.Items
        this.totalCount = res.totalCount
        this.listLoading = false
      })
    },

    handleDelete() {
      this.$confirm('确定删除选中数据?', this.$t('dialog.tip'), {
        confirmButtonText: this.$t('button.confirm'), // '确认'
        cancelButtonText: this.$t('button.cancel'), // '取消'
        type: 'warning'
      }).then(() => {
        let data = {
          Key: this.multipleSelection[0].Key
        }
        ResetCache(data).then(res => {
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
