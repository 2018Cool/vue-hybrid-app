<template>
  <div>
    <van-field
      v-if="showField"
      :value="content"
      :label="label"
      readonly
      is-link
      :clickable="!disabled"
      :disabled="disabled"
      :error="error"
      :label-width="labelWidth"
      :required="required"
      :error-message="errorMessage"
      :placeholder="placeholder"
      @click="showPopup"
    />
    <van-popup
      v-model="showPicker"
      position="bottom"
      get-container="#app"
    >
      <van-picker
        show-toolbar
        :visible-item-count="4"
        :columns="options"
        :default-index="index"
        @cancel="onCancel"
        @change="onChange"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: 'WbPicker',
  props: {
    options: { // {text:'',value:''}
      default: () => [],
      type: Array,
      required: true
    },
    labelWidth: {
      type: [Number, String],
      default: () => 80
    },
    error: Boolean,
    required: Boolean,
    showField: {
      default: true,
      type: Boolean
    },
    errorMessage: {
      default: '',
      type: String
    },
    disabled: Boolean,
    value: {
      default: '',
      type: [String, Number]
    },
    label: {
      default: '',
      type: String
    },
    placeholder: {
      default: '请选择',
      type: String
    }
  },
  data() {
    return {
      showPicker: false,
      index: 0,
      val: this.value
    }
  },
  computed: {
    content() {
      if (this.val === '') {
        return ''
      }
      for (let i = 0; i < this.options.length; i++) {
        const item = this.options[i]
        if (this.val === item.value) {
          return item.text
        }
      }
      return ''
    }
  },
  watch: {
    value(val) {
      this.val = val
    }
  },
  methods: {
    onConfirm() {
      const selectedItem = this.options[this.index]
      if (selectedItem) {
        this.val = selectedItem.value
        this.$emit('input', this.val)
      }
      this.index = 0
      this.onCancel()
    },
    onCancel() {
      this.showPicker = false
    },
    show() {
      this.showPopup()
    },
    showPopup() {
      if (this.disabled) {
        return
      }
      this.$emit('click')

      for (let i = 0; i < this.options.length; i++) {
        const item = this.options[i]
        if (this.val === item.value) {
          this.index = i
          break
        }
      }
      this.showPicker = true
    },
    onChange(picker, value, index) {
      this.index = index
    }
  }

}
</script>
