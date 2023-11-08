<template>
  <div>
    <el-dialog
      v-dialogDrag
      :width="dialogWidth + 'px'"
      :visible.sync="show"
      :close-on-click-modal="false"
      :title="formTitle"
      @close="cancel"
    >
      <div class="opts" style="margin-bottom: 20px">
        <!-- '新增明细' -->
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          plain
          icon="el-icon-plus"
          @click="handleSelectDetail()"
        >
          {{ $t('button.addDetail') }}
        </el-button>
        <!-- '删除明细' -->
        <el-button
          :disabled="multipleSelection.length === 0"
          class="filter-item"
          size="mini"
          type="danger"
          plain
          icon="el-icon-delete"
          @click="handleDeleteDetail()"
        >
          {{ $t('button.delDetail') }}
        </el-button>
      </div>
      <Form
        ref="form"
        :inline="true"
        :form-data="formData"
        :form-list="formList"
        :is-handle="false"
        size="small"
        :label-width="120"
        :layout="layout"
        :is-edit="isEdit"
      />
      <Table
        ref="detailTable"
        :height="450"
        :data-list="detailTable"
        :column="tableList"
        :selection.sync="multipleSelection"
        :selectable="selectable"
        :dict-gather="dictGather"
      />
      <div slot="footer" class="dialog-footer">
        <!-- '继续新增' -->
        <el-checkbox v-if="!isEdit" v-model="addContinue" class="continue-add">
          {{ $t('button.continueAdd') }}
        </el-checkbox>
        <!-- '取消' -->
        <el-button size="small" type="text" @click="show = false">{{ $t('button.cancel') }}</el-button>
        <!-- '确认' -->
        <el-button :loading="formLoading" size="small" type="primary" @click="save">
          {{ $t('button.confirm') }}
        </el-button>
      </div>
    </el-dialog>
    <DetailOptDialog
      v-if="detailListLoading"
      :detail-title="detailTitle"
      :dialog-loading.sync="detailListLoading"
      :detail-query-items="detailQueryItems"
      :col-name="colDetailName"
      :api-name="apiDetailName"
      :dict-gather="dictGather"
      @addDetail="addDetail"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import DetailOptDialog from './DetailOptDialog'
import Form from '@/components/Form'
import { API } from '@/api/generalAPI'
export default {
  name: 'EditDetailOptDialog',
  components: { Table, DetailOptDialog, Form },
  props: {
    layout: {
      type: Object,
      default: () => {
        return { span: 6 }
      }
    },
    selectable: {
      type: Function,
      default: () => {
        return true
      }
    },
    dialogFormVisible: { type: Boolean },
    dialogWidth: { type: Number, default: 1200 },
    formTitle: { type: String, require: true, default: '' },
    isEdit: { type: Boolean },
    formData: { type: Object, default: () => {} },
    formList: { type: Array, default: () => [] },
    tableList: { type: Array, default: () => {} },
    detailTable: { type: Array, default: () => [] },
    apiName: { type: String, default: '' },

    // 选择明细弹窗
    checkParams: { type: String, require: true, default: '' },
    detailTitle: { type: String, require: true, default: '' },
    detailQueryItems: { type: Array, default: () => [] },
    detailColumn: { type: Array, default: () => [] },
    colDetailName: { type: String, require: true, default: '' },
    apiDetailName: { type: String, require: true, default: '' },
    regainDetail: { type: Function, default: () => {} },
    dictGather: { type: Array, default: () => [] } // 数据字典集合
  },
  data() {
    return {
      formLoading: false,
      isSave: false,
      hasAdd: false,
      multipleSelection: [],
      addContinue: true,
      detailListLoading: false
    }
  },

  computed: {
    show: {
      get() {
        return this.dialogFormVisible
      },
      set(val) {
        let data = { dialogFormVisible: val, isSave: this.isSave, hasAdd: this.hasAdd, isEdit: this.isEdit }
        return this.$emit('cancel', data)
      }
    }
  },
  created() {},
  methods: {
    cancel() {
      this.isSave = false
      this.hasAdd = false
      this.show = false
      this.addContinue = true
      this.$refs.form.$refs.formList.clearValidate()
      this.$refs.detailTable.$refs.tableForm.clearValidate()
      this.$refs.detailTable.$refs.table.clearSelection()
    },
    save() {
      this.$refs.form.$refs.formList.validate(valid => {
        this.$refs.detailTable.$refs.tableForm.validate(tableValid => {
          if (valid && tableValid) {
            this.formLoading = true
            let params = {
              header: this.formData,
              details: this.detailTable
            }
            API.dataPost(this.apiName, params, 'editAll')
              .then(res => {
                this.formLoading = false
                this.$notify({
                  title: this.$t('notify.success'), // '成功'
                  // ? '更新成功' : '新增成功',
                  message: this.isEdit ? this.$t('notify.editSuccess') : this.$t('notify.addSuccess'),
                  type: 'success',
                  duration: 2000
                })
                this.isSave = true
                // 新增 继续增加
                if (!this.isEdit && this.addContinue) {
                  this.hasAdd = true
                  this.$emit('create')
                  this.$emit('update:formData', {})
                  this.$emit('update:detailTable', [])
                  // this.$emit('reset', 0)
                } else if (this.isEdit) {
                  // 编辑
                  this.show = false
                  this.addContinue = true
                } else {
                  // 新增 不继续增加
                  // this.$emit('reset', 0)
                  this.show = false
                  this.addContinue = true
                }
              })
              .catch(err => {
                this.formLoading = false
                if (err.response.data.error !== undefined) {
                  let reg = new RegExp(',', 'g')
                  let message = err.response.data.error.message.replace(reg, ',<br>')
                  this.$notify({
                    title: this.$t('notify.failure'), // '失败'
                    dangerouslyUseHTMLString: true,
                    // 接口返回数据，待中英配置
                    message: message,
                    type: 'error',
                    duration: 5000
                  })
                }
              })
          }
        })
      })
    },
    handleSelectDetail() {
      this.detailListLoading = true
    },
    // 所选删除的箱号，均删除
    handleDeleteDetail() {
      // '确认删除选中项','提示'
      this.$confirm(this.$t('dialog.deleteTips'), this.$t('dialog.tip'), {
        confirmButtonText: this.$t('button.confirm'), // '确认'
        cancelButtonText: this.$t('button.cancel'), // '取消'
        type: 'warning'
      }).then(() => {
        let data = this.detailTable
        // ------跟标准组件不一致的地方---
        // 获取所选中要删除的箱号数组
        let boxIDArray = [...new Set(this.multipleSelection.map(row => row.boxID))]
        // 逐条匹配删除
        boxIDArray.map(item => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].boxID === item) {
              data.splice(i, 1)
              i = i - 1
            }
          }
        })
        // ------跟标准组件不一致的地方---
        this.$emit('update:detailTable', data)
      })
    },
    // 从选择弹窗选择数据后，若指定去重参数checkParams，去重后添加，否则直接添加到主从表弹窗
    addDetail(data) {
      let addArr = []
      let newArr = []
      this.$emit('regainDetail', data)
      if (this.checkParams === '') {
        newArr = this.detailTable.concat(data)
      } else {
        if (data && data.length) {
          data.forEach(item => {
            let isContain = false
            for (let i = 0; i < this.detailTable.length; i++) {
              if (item[`${this.checkParams}`] === this.detailTable[i][`${this.checkParams}`]) {
                isContain = true
                break
              } else {
                isContain = false
              }
            }
            if (!isContain) {
              addArr.push(item)
            }
          })
        }
        newArr = this.detailTable.concat(addArr)
      }
      this.$emit('update:detailTable', newArr)
    }
  }
}
</script>
