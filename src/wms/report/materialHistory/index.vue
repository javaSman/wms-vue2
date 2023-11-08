<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse
        :form-items="materialHistoryItems"
        :list-query.sync="listQuery"
        @query="getList"
        @reset="reset"
      />
      <CrudOperation
        :selection="multipleSelection"
        :button-items="BtnItems"
        :download-loading.sync="downloadLoading"
        @toDownload="handleDownloadPast()"
      />
    </div>
    <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
    <Table
      v-if="tableShow"
      ref="table"
      v-loading="listLoading"
      :has-selection="false"
      :height="-1"
      :data-list="list"
      :column="column"
      :selection.sync="multipleSelection"
      :total="totalCount"
      :page.sync="page"
      :limit.sync="listQuery.MaxResultCount"
      :is-sort="true"
      :has-index="true"
      :dict-gather="dictGather"
      :sorting.sync="listQuery.Sorting"
      @pagination="getList"
      @tableSort="getList"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import CrudOperation from '@/components/Crud/CRUD.operation'

import { materialHistoryItems, BtnItems } from './config'
import { API } from '@/api/generalAPI'

export default {
  name: 'MaterialHistory',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'MaterialResume',
      apiName: 'materialresume',
      materialHistoryItems,
      isEdit: true,
      BtnItems,
      exportParams: { IsPage: false },
      downloadLoading: false,
      isData: false
    }
  },
  created() {
    this.getDict()
    // this.getWarehouse()
  },
  methods: {
    // getWarehouse() {
    //   API.get('warehouse', { IsPage: false }, 'all').then(res => {
    //     res.items.forEach(item => {
    //       item.label = item.warehouseName
    //       item.value = item.warehouseID
    //       item.asign = item.warehouseID
    //     })
    //     this.materialHistoryItems[6].options = res.items
    //   })
    // },
    getDict() {
      //移动类型
      API.getDict('dict', { name: 'MovementType' }).then(res => {
        this.materialHistoryItems[7].options = res.details
      })
      //载具装载状态
      API.getDict('dict', { name: 'BoxState' }).then(res => {
        this.materialHistoryItems[16].options = res.details
      })
      //载具位置状态
      API.getDict('dict', { name: 'BoxPositionStatus' }).then(res => {
        this.materialHistoryItems[17].options = res.details
      })
      //物料位置
      API.getDict('dict', { name: 'MaterialLocation' }).then(res => {
        this.materialHistoryItems[18].options = res.details
      })
    },

    handleDownloadPast() {
      if (this.list === null) {
        this.$message.warning('当前表格数据为空！')
      } else {
        let Ids = [] // 选中的id集
        if (this.multipleSelection.length > 0) {
          //  如果有选中的数据，就导出选中的数据，否则全部导出或根据搜索条件导出
          this.multipleSelection.map(item => {
            Ids.push(item.id)
          })
          this.exportPast('materialresume', { Ids: Ids }, 'export')
        } else {
          this.exportPast('materialresume', this.exportParams, 'export')
        }
      }
    }
  }
}
</script>
