<template>
  <div>
    <el-dialog
      v-dialogDrag
      width="1200px"
      :visible.sync="show"
      :close-on-click-modal="false"
      :title="formTitle"
      @close="cancel"
    >
      <Form
        ref="form"
        :inline="true"
        :form-data="form"
        :form-list="formList"
        :is-handle="false"
        size="small"
        :label-width="110"
        :layout="{ span: 8 }"
      />
      <Table
        ref="table"
        :height="300"
        :data-list="tableDataList"
        :column="inventoryColumnList"
        :selection.sync="multipleSelection"
        :selectable="selectable"
        :dict-gather="dictGather"
      />
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="text" @click="cancel">取消</el-button>
        <el-button :loading="formLoading" size="small" type="primary" @click="handleBatchPost">盘点过账</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Table from '@/components/Table'
import Form from '@/components/Form'
import { API } from '@/api/generalAPI'
import { inventoryColumnList } from '../config'
export default {
  name: 'Edit',
  components: { Table, Form },
  props: {
    dialogVisible: { type: Boolean },
    formTitle: { type: String, require: true, default: '' },
    formData: { type: Object, default: () => {} },
    apiName: { type: String, default: '' },
    api: { type: Object, default: () => {} },
    formList: { type: Array, default: () => [] },
    isEdit: { type: Boolean },
    tableDataList: { type: Array, default: () => [] },
    dictGather: { type: Array, default: () => [] } // 数据字典集合
  },
  data() {
    return {
      inventoryColumnList,
      formLoading: false,
      listLoading: false,
      multipleSelection: []
    }
  },
  computed: {
    show: {
      get() {
        return this.dialogVisible
      },
      set(val) {
        this.$emit('update:dialogVisible', val)
        this.$emit('cancel', val)
      }
    },
    form: {
      get() {
        return this.formData
      },
      set(val) {
        return this.formData
      }
    }
  },
  created() {},
  methods: {
    /** 批量盘点过账 */
    handleBatchPost() {
      let params = []
      let errFlag = false
      // 判断是否有选中数据
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.map(item => {
          // 判断选择数据是否有未填实际盘点数据值
          if (item.realQty > 0) {
            let data = {
              boxNo: item.boxNo,
              materialNo: item.materialNo,
              quantity: item.realQty,
              barcode: item.barcode
            }
            params.push(data)
          } else {
            errFlag = true
          }
        })
        if (errFlag) {
          this.$notify({
            title: '失败',
            message: '实际盘点数据为0，请重新确认',
            type: 'error',
            duration: 2000
          })
        } else {
          API.dataPost(this.apiName, params, 'Receive')
            .then(res => {
              this.formLoading = false
              if (res.success === true) {
                this.$notify({
                  title: '成功',
                  message: '盘点过账成功',
                  type: 'success',
                  duration: 2000
                })
                this.getFormData(this.form)
              } else {
                this.$notify({
                  title: '失败',
                  message: '盘点过账失败，' + res.message,
                  type: 'error',
                  duration: 2000
                })
              }
            })
            .catch(() => {
              this.formLoading = false
            })
        }
      } else {
        this.$message({
          message: '请选择盘点数据',
          type: 'warning'
        })
      }
    },
    /** 弹窗关闭 */
    cancel() {
      this.$refs.table.$refs.table.clearSelection()
      this.show = false
      this.$refs.form.$refs.formList.clearValidate()
    },
    /** 单条过账后，刷新表头和明细数据 */
    getFormData(param) {
      API.getData('inventorydetail', { OrderID: param.inventoryID }).then(res => {
        this.$emit('update:tableDataList', res.items)
      })
      API.getForm(this.apiName, param.id).then(res => {
        this.$emit('update:form', res)
      })
    },
    /** 复选框禁用 */
    selectable(row, index) {
      if (row.statusID === 'Finish' || row.statusID === 'Confirm') {
        row.selectDisable_ = true
        return false
      } else {
        row.selectDisable_ = false
        return true
      }
    }
  }
}
</script>
