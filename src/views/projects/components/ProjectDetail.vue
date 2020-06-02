<template>
  <wb-page class="project-detail">
    <wb-nav title="项目详情" left-arrow :right-text="删除" @click-right="delProject" @click-left="back" />
    <wb-content>
      <van-list>
        <van-cell
          title-class="font-weight-bold"
          label-class="font-weight-normal"
        >
          <div slot="title" class="d-flex align-items-center">
            <span class="d-inline-block text-truncate" style="max-width: 90vw;">{{ info.name }}</span>
          </div>
          <div slot="label" class="mt-2">
            <van-row v-if="info.synopsis" class="mb-1">
              <van-col :span="24">
                <span class="text-dark">{{ info.synopsis }}</span>
              </van-col>
            </van-row>
          </div>
        </van-cell>
      </van-list>
    </wb-content>
  </wb-page>
</template>
<script>

import { delProject } from '@/api/projects'
import { showConfirm } from '@/utils'

export default {
  props: {
    info: {
      type: Object,
      default: () => { return {} }
    },
    readOnly: Boolean,
    code: {
      type: String,
      default: ''
    }
  },

  computed: {
    amount() {
      if (this.info.amount) {
        return '￥' + this.info.amount.toLocaleString()
      }
      return ''
    }
  },
  mounted() {
    this.$callbackData = { isModify: false } // 是否有改动，如果有改动返回上层要刷新数据
  },
  methods: {
    delProject() {
      showConfirm({ title: '提示', message: '是否删除？' }).then(() => {
        delProject({ code: this.info.code }).then(() => {
          this.$toast.success({
            duration: 1000,
            message: '删除成功'
          })
          this.$callbackData.isModify = true
          this.$popPage(this.$callbackData, 200)
        })
      })
    },

    back() {
      this.$popPage(this.$callbackData)
    }

  }
}
</script>

<style lang="scss">
.project-detail{
  .my-cell-group{
    .van-field__label{
       color:#969799;
    }
 }
 .van-button{
   border-radius:0;
 }
 .van-hairline--top-bottom::after{
   display:none;
 }
 .van-tabs__wrap{
   border-bottom:1px solid #e3e3e5;
 }
}

</style>
