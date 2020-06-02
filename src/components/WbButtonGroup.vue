<template>
  <div class="wb-button-group">
    <p class="title">
      {{ title }}
    </p>
    <van-row v-for="(group,index) in groups" :key="index" type="flex" :gutter="10" class="mt-2">
      <van-col v-for="item in group" :key="item.value" span="8">
        <span class="my-tag" :style="getTagStyle(item.value)" @click="checkItem(item.value)">
          {{ item.text }}
        </span>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'WbButtonGroup',
  props: {
    colNum: { // 列数量，分多少列显示按钮
      default: function() {
        return 3
      },
      type: Number
    },
    value: { // 传入的数值，默认选中的按钮
      require: true,
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    radio: Boolean, // 是否是单选
    options: { // 按钮组数据   {text:'',value:''}
      require: true,
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkedVal: [...this.value]
    }
  },
  computed: {
    groups() {
      const val = this.options
      const len = val.length
      const n = this.colNum
      const lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1)
      const res = []
      for (let i = 0; i < lineNum; i++) {
        const temp = val.slice(i * n, i * n + n)
        res.push(temp)
      }
      return res
    }

  },
  watch: {
    value(val) {
      this.checkedVal = val
    }
  },
  methods: {
    checkItem(val) {
      const index = this.checkedVal.indexOf(val)
      if (index === -1) {
        if (this.radio) {
          this.checkedVal = [val]
        } else {
          this.checkedVal.push(val)
        }
      } else {
        this.checkedVal.splice(index, 1)
      }
      this.$emit('input', this.checkedVal)
    },
    getTagStyle: function(val) {
      if (this.checkedVal.includes(val)) {
        return { background: 'rgba(61, 158, 253,0.2)', color: '#3d9efd', borderColor: '#3d9efd' }
      } else {
        return { background: '#f0f2f5', color: '#454545', borderColor: '#f0f2f5' }
      }
    }

  }

}
</script>

<style lang="scss">
 .wb-button-group{
   width:100%;
   padding:10px 10px 0 10px;
   .title{
     font-size:14px;
     font-weight: bold;
     margin:5px 0;
   }
  .my-tag{
     display:inline-block;
     padding:0 0.5em;
     font-size:12px;
     background: #f0f2f5;
     color:#454545;
     border-radius: 16px;
     line-height:32px;
     width:100%;
     text-align: center;
     border: 1px solid #f0f2f5;
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
  }
   [class*='van-hairline']::after{
       border-color:transparent;
     }
 }

</style>
