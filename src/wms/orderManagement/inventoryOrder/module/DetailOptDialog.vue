<template>
  <el-dialog
    v-dialogDrag
    :width="dialogWidth + 'px'"
    :title="detailTitle + $t('dialog.select')"
    :close-on-click-modal="false"
    :visible.sync="isShow"
  >
    <div class="head-container">
      <filter-container :form-items="detailQueryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <Table
      ref="table"
      v-loading="listLoading"
      :height="480"
      :data-list="list"
      :column="colName === '' ? detailColumn : column"
      :selection.sync="multipleSelection"
      :has-selection="true"
      :total="totalCount"
      :page.sync="page"
      :limit.sync="listQuery.MaxResultCount"
      :dict-gather="dictGather"
      @pagination="getList"
    />
    <div slot="footer" class="dialog-footer">
      <!-- '取消' -->
      <el-button size="small" type="text" @click="cancel">{{ $t('button.cancel') }}</el-button>
      <!-- '确认' -->
      <el-button size="small" type="primary" @click="save">{{ $t('button.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { API } from '@/api/generalAPI'
import Table from '@/components/Table'
import basics from '@/mixins'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
export default {
  name: 'DetailOptDialog',
  components: { Table },
  mixins: [filterContainer, colDesign, basics],
  props: {
    dialogLoading: { type: Boolean },
    dialogWidth: { type: Number, default: 1200 },
    detailTitle: { type: String, require: true, default: '' },
    detailQueryItems: { type: Array, default: () => [] },
    detailColumn: { type: Array, default: () => [] },
    colName: { type: String, require: true, default: '' },
    apiName: { type: String, require: true, default: '' },
    dictGather: { type: Array, default: () => [] } // 数据字典集合
  },
  data() {
    return {}
  },
  computed: {
    isShow: {
      get() {
        return this.dialogLoading
      },
      set(val) {
        return this.$emit('update:dialogLoading', val)
      }
    }
  },
  methods: {
    cancel() {
      this.$refs.table.$refs.table.clearSelection()
      this.isShow = false
    },
    save() {
      let data
      let boxIDs = []
      // 获取选中的箱号
      let boxIDArray = [...new Set(this.multipleSelection.map(row => row.boxNo))]
      // 将箱号数组转换成以逗号相隔的字符串
      boxIDArray.forEach(function (item) {
        boxIDs.push(item)
      })
      boxIDs = boxIDs.join(',')
      let params = {
        Sorting: 'boxNo',
        SkipCount: 0,
        IsPage: false,
        boxNo: boxIDs
      }
      API.getData(this.apiName, params).then(res => {
        data = res.items
        this.$emit('addDetail', data)
        this.isShow = false
      })
    }
  }
}
</script>
