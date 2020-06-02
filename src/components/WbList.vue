
<template>
  <van-pull-refresh v-model="refreshing" :disabled="disabledRefresh" @refresh="onRefresh">
    <div ref="list" class="wb-list" :style="{minHeight:minHeight}">
      <van-search
        v-if="hasSearch"
        ref="search"
        v-model="query[queryField]"
        :placeholder="placeholder"
        :show-action="showAction"
        :clearable="false"
        :spellcheck="false"
        @focus="showAction = true"
        @blur="onBlur"
        @clear="showAction = false"
        @search="onSearch"
        @cancel="onCancel"
        @input="debounce"
      >
        <van-icon v-show="query[queryField]!==''" slot="right-icon" name="clear" />
      </van-search>
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishText"
        :immediate-check="false"
        @load="onLoad"
      >
        <slot v-if="showContent" />
      </van-list>
    </div>
  </van-pull-refresh>
</template>
<script>
import { debounce, throttling } from '@/utils'
import { Plugins } from '@capacitor/core'
export default {
  name: 'WbList',
  props: {
    value: {
      default: () => [],
      type: Array
    },
    minHeight: {
      default: () => '60vh',
      type: String
    },
    disabledRefresh: Boolean,
    placeholder: {
      default: () => '搜索',
      type: String
    },
    unfreeze: Boolean, // 是否解冻结列表数据，需要修改列表数据的时候不要冻结，默认是冻结列表数据
    noDataText: {
      default: () => '暂无数据',
      type: String
    },
    hasSearch: {
      default: true,
      type: Boolean
    },
    queryField: {
      default: () => 'condition', // 搜索框对应的字段名
      type: String
    },
    query: {
      type: Object,
      default: function() {
        return {
          pageNo: 1,
          pageSize: 20,
          [this.queryField]: ''
        }
      }
    },
    fetchFun: {
      type: Function,
      required: true
    }

  },
  data() {
    return {
      debounce: debounce(this.onSearch, 300),
      loading: false,
      refreshing: false,
      showAction: false,
      showContent: false,
      finished: false,
      finishText: '',
      showFun: null,
      hideFun: null,
      clearBtn: null,
      listData: []
    }
  },
  watch: {
    query(newVal, oldVal) {
      if (JSON.stringify(oldVal) === JSON.stringify(newVal)) {
        return
      }
      this.debounce()
    }
  },
  mounted() {
    this.onLoad()
    const target = this.$refs.list
    const searchInput = this.hasSearch ? this.$refs.search.querySelector('input') : null
    this.clearBtn = this.hasSearch ? this.$refs.search.getElementsByClassName('van-field__right-icon')[0] : null
    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', this.onCancel) // 特殊处理，解决无法触发的问题
    }

    // 滑动列表的时候隐藏键盘
    const Keyboard = Plugins.Keyboard
    const hideKeyboard = throttling(() => {
      Keyboard.hide()
    }, 500, 1000)
    this.showFun = () => {
      target.addEventListener('touchmove', hideKeyboard)
    }
    this.hideFun = () => {
      target.removeEventListener('touchmove', hideKeyboard)

      searchInput && searchInput.blur()
    }
    window.addEventListener('keyboardWillShow', this.showFun)
    window.addEventListener('keyboardWillHide', this.hideFun)
  },
  destroyed() {
    if (this.clearBtn) {
      this.clearBtn.removeEventListener('click', this.onCancel)
    }
    window.removeEventListener('keyboardWillShow', this.showFun)
    window.removeEventListener('keyboardWillHide', this.hideFun)
  },
  methods: {
    onRefresh() {
      this.query.pageNo = 1
      this.onLoad(true)
    },
    refreshList() {
      this.query.pageNo = 1
      this.onLoad()
    },
    // isRefresh 是否处于下拉刷新状态
    onLoad(isRefresh = false) {
      if (isRefresh) {
        this.refreshing = true
      } else {
        this.loading = true
      }
      this.fetchFun(this.query).then((res) => {
        const data = res.data || {}
        let text = ''
        const listData = Array.isArray(data) ? data : (data.dataList || [])
        if (isRefresh || this.query.pageNo === 1) {
          this.listData = listData
        } else {
          this.listData = this.listData.concat(listData)
        }

        const totalCount = data.totalCount || -1 // 处理列表一次性返回的问题，一次性返回无totalCount

        if (totalCount <= this.listData.length || listData.length === 0) {
          this.finished = true
          this.loading = false
          if (totalCount === 0 || this.listData.length === 0) {
            text = this.noDataText
          } else {
            text = '没有更多了'
          }
        } else {
          this.finished = false
          this.query.pageNo++
        }
        // 冻结数据 提升列表渲染性能
        this.$emit('input', this.unfreeze ? this.listData : Object.freeze(this.listData))
        if (this.showContent) {
          this.refreshing = false
          this.loading = false
          this.finishText = text
          return
        }
        setTimeout(() => {
          this.showContent = true
          this.refreshing = false
          this.loading = false
          this.finishText = text
        }, 400)
      }, () => {
        this.loading = false
        this.finished = true
        this.finishText = this.noDataText
        this.refreshing = false
      })
    },
    onSearch() {
      this.query.pageNo = 1
      this.onLoad()
    },
    onBlur(event) {
      setTimeout(() => {
        this.showAction = false
      }, 50)
    },
    onCancel() {
      this.showAction = false
      this.query[this.queryField] = ''
      this.onSearch()
    }
  }
}
</script>
<style lang="scss">
.wb-list{
  .van-search{
    .van-search__action{
      color:#1989fa;
    }
  }
  .van-list__finished-text{
    line-height: 60px;
  }
}
</style>

