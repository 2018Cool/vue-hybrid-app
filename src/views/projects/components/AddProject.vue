<template>
  <wb-modal class="add-project">
    <wb-nav :title="title" left-text="取消" right-text="保存" @click-left="cancel" @click-right="$debounce(save)" />
    <wb-content keyboard-handler>
      <van-cell-group>
        <van-field
          v-model="name.text"
          clearable
          required
          :error="name.error"
          :error-message="name.msg"
          label="项目名称"
          placeholder="必填"
          @focus="clearError(name)"
        />
        <van-field
          v-model="resources.text"
          clearable
          :error="resources.error"
          :error-message="resources.msg"
          label="占用资源"
          placeholder="占用的人力资源情况"
          @focus="clearError(resources)"
        />
        <van-field
          v-model="amount.text"
          clearable
          type="number"
          :error="amount.error"
          :error-message="amount.msg"
          label="销售金额"
          placeholder="目标销售金额"
          @focus="clearError(amount)"
        />
        <div style="font-size:14px;margin-top:10px;padding-left:15px" class="text-dark">
          商机简介
        </div>
        <van-field
          v-model="synopsis.text"
          :error="synopsis.error"
          :error-message="synopsis.msg"
          type="textarea"
          :autosize="{maxHeight:50,minHeight:50}"
          class="my-textarea"
          maxlength="50"
          show-word-limit
          placeholder="点击填写，不超过50字"
          @click="clearError(synopsis)"
        />
        <div style="font-size:14px;margin-top:10px;padding-left:15px" class="text-dark">
          备注
        </div>
        <van-field
          v-model="remark.text"
          :error="remark.error"
          :error-message="remark.msg"
          type="textarea"
          :autosize="{maxHeight:100,minHeight:100}"
          class="my-textarea"
          maxlength="200"
          show-word-limit
          placeholder="点击填写，不超过200字"
          @click="clearError(remark)"
        />
      </van-cell-group>
    </wb-content>
  </wb-modal>
</template>
<script>
import { addProject, updateProject } from '@/api/projects'
import { invalidInput } from '@/utils/validate'
export default {
  name: 'AddProject',
  // components: { ContactList },
  props: {
    title: {
      default: '',
      type: String
    },
    isEdit: Boolean,
    info: {
      default: function() {
        return {}
      },
      type: Object
    }
  },
  data() {
    return {
      showPicker: false,
      name: { text: this.info.name || '', error: false, msg: '' },
      resources: { text: this.info.resources || '', error: false, msg: '' },
      amount: { text: this.info.amount || '', error: false, msg: '' },
      synopsis: { text: this.info.synopsis || '', error: false, msg: '' },
      remark: { text: this.info.remark || '', error: false, msg: '' }
    }
  },
  methods: {

    cancel() {
      this.$popPage()
    },
    clearError(field) {
      field.error = false
      field.msg = ''
    },
    save() {
      let hasError = false
      const data = {
        code: this.info.code,
        name: this.name.text.trim(),
        amount: +this.amount.text || void (0),
        synopsis: this.synopsis.text,
        resources: this.resources.text,
        remark: this.remark.text.trim()

      }
      if (data.name === '') {
        this.name.text = ''
        this.name.error = true
        hasError = true
      } else if (data.name.length > 80) {
        this.name.error = true
        this.name.msg = '字数超限，不能超过80个字符'
        hasError = true
      } else if (invalidInput(data.name)) {
        this.name.error = true
        this.name.msg = '不能包含非法字符'
        hasError = true
      }
      if (data.remark.length > 200) {
        this.remark.error = true
        this.remark.msg = '字数超限，不能超过200字符'
        hasError = true
      } else if (data.remark.length > 0 && invalidInput(data.remark)) {
        this.remark.error = true
        this.remark.msg = '不能包含非法字符'
        hasError = true
      }
      if (hasError) {
        this.$toast({
          duration: 1000,
          message: '提交信息有误，请检查'
        })
        return
      }
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '正在提交数据'
      })
      if (this.isEdit) {
        updateProject(data).then(() => {
          this.$toast.success({
            closeOnClickOverlay: true,
            duration: 1000,
            message: '保存成功'
          })
          this.$popPage(data, 300)
        })
      } else {
        addProject(data).then(() => {
          this.$toast.success({
            closeOnClickOverlay: true,
            duration: 1000,
            message: '保存成功'
          })
          this.$popPage(true, 300)
        })
      }
    }
  }
}
</script>
<style lang="scss">
.add-project{
  .my-textarea{
    padding-top:5px;
    // textarea{
    //   border:1px solid #e3e3e5 !important;
    // }
  }
  .van-collapse-item__content{
    .van-cell__title{
      width:80px;
    }
  }
  .van-collapse-item__content{
    padding:16px 10px;
  }
  .van-collapse-item__title{
    padding-left:0;
    .van-cell__title{
      border-left:5px solid #0087F4;
      span{
        margin-left:5px;
      }
    }
  }
}

</style>

