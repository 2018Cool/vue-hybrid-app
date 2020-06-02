
<template>
  <div class="wb-image-uploader">
    <van-grid :border="false" :column-num="3" square clickable>
      <template v-for="(item,index) of fileList">
        <van-grid-item v-if="item.type=='img'" :key="index">
          <van-image
            width="100%"
            height="100%"
            fill="contain"
            :src="item.url"
            @click="$debounce(previewImg, item)"
          />
          <div v-show="isDelete && !disabledEdit" class="del-button" @click="delFile(index)">
            <van-icon name="clear" :size="16" color="#ff4444" />
          </div>
        </van-grid-item>
      </template>
      <van-grid-item v-show="!disabledEdit && fileList.length<maxCount">
        <div class="add-button" @click="upload">
          <van-icon name="plus" :size="20" />
        </div>
      </van-grid-item>
    </van-grid>
    <div class="d-flex flex-column">
      <van-row v-for="(item,index) of docFiles" :key="index">
        <van-col :span="24" class="my-1 text-truncate" @click="$debounce(openFile,item)">
          <fa-icon name="file-text-o" />
          <span class="text-primary ml-2 text-left " style="font-size:12px;">{{ item.name }}</span>
        </van-col>
      </van-row>
    </div>
    <van-popup
      v-model="showPreview"
      get-container="#app"
      position="bottom"
      :style="{ height: '100%',width:'100%' }"
    >
      <van-image-preview
        v-model="showPreview"
        :images="imgList"
        :show-index="false"
        :loop="false"
        lazy-load
      />
    </van-popup>
    <van-action-sheet
      v-model="showActionSheet"
      :actions="actions"
      get-container="#app"
      @select="onSelect"
    />
  </div>
</template>
<script>

import { CameraSource } from '@capacitor/core'
// import { getCosSign } from '@/api/app'
// const cosSignData = {} // cos签名
export default {
  name: 'WbImageUploader',
  props: {
    value: {
      default: () => [],
      type: Array
    },
    files: {
      default: () => [],
      type: Array
    },
    isDelete: Boolean,
    disabledEdit: Boolean, // 仅做展示用，禁止编辑
    maxCount: {
      default: () => 9,
      type: Number
    }

  },
  data() {
    return {
      showPreview: false,
      showActionSheet: false,
      actions: [{ name: '从相册中选取', value: CameraSource.Photos }, { name: '拍照', value: CameraSource.Camera }],
      fileList: this.disabledEdit ? this.files : this.value || [],
      imgList: []
    }
  },
  computed: {
    imgFiles() {
      return this.fileList.filter((item) => item.type === 'img')
    },
    docFiles() {
      return this.fileList.filter((item) => item.type === 'file')
    }
  },
  watch: {
    value() {
      this.fileList = this.value || []
    },
    files() {
      this.fileList = this.files || []
    }
  },

  methods: {
    upload() {
      this.showActionSheet = true
    },
    previewImg(item) {
      if (this.isDelete || item.type === 'file') {
        return
      }
      const url = item.url
      this.imgList = [url]
      this.showPreview = true
    },
    delFile(index) {
      this.fileList.splice(index, 1)
      this.$emit('input', this.fileList)
    },
    async onSelect(item) {
      this.showActionSheet = false
      if (!window.ImagePicker) {
        return
      }
      this.takePicture(item.value).then(async(res) => {
        const images = res.images || []
        const len = images.length
        const len2 = 9 - this.fileList.length // 解决图片上传超限问题
        const maxLen = Math.min(len, len2)
        if (len === 0) {
          return
        }
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '正在上传...'
        })
        for (let i = 0; i < maxLen; i++) {
          const image = images[i]
          const localPath = image.uri
          if (this.checkFileType(localPath)) {
            try {
              await this.uploadToCos(localPath)
            } catch (e) {
              this.$log(e)
            }
          }
        }
        this.$toast.clear()
      })
    },
    checkFileType(path) {
      const fileType = path.slice(path.lastIndexOf('.')).toLowerCase()
      const isAllowType = ['.png', '.jpeg', '.jpg', '.gif', '.bmp'].includes(fileType)
      if (!isAllowType) {
        this.$toast({
          duration: 1000,
          message: '不支持此图片格式上传'
        })
        return false
      }

      return true
    },
    takePicture(source) {
      const len = this.fileList.length
      if (source === CameraSource.Photos) {
        return new Promise((resolve, reject) => {
          window.ImagePicker.getPictures((result) => {
            resolve(result)
          }, function(err) {
            reject(err)
          }, {
            maximumImagesCount: (9 - len),
            quality: 80
          })
        })
      } else if (source === CameraSource.Camera) {
        return new Promise((resolve, reject) => {
          window.ImagePicker.takePhoto(function(result) {
            resolve(result)
          }, function(err) {
            reject(err)
          }, {
            width: 1920,
            height: 1440,
            quality: 50
          })
        })
      }
    },
    async uploadToCos(localPath) {
      // const filename = `${this.$store.getters.userInfo.id}-${Math.floor(Date.now() / 1000)}-${localPath.slice(localPath.lastIndexOf('/') + 1)}`
      // const expiredTime = cosSignData.expiredTime || 0
      // try {
      //   if (expiredTime < Date.now() / 1000) {
      //     // const data = await getCosSign()
      //     // if (data.hasOwnProperty('credentials')) {
      //     //   cosSignData = data
      //     // }
      //   }
      // } catch (e) {
      //   this.$log(e)
      // }

      // const sign = cosSignData.credentials || {}
      // const options = {
      //   signOptions: {
      //     region: process.env.NODE_ENV === 'production' ? 'ap-guangzhou' : 'ap-guangzhou',
      //     secretId: sign.tmpSecretId,
      //     secretKey: sign.tmpSecretKey,
      //     sessionToken: sign.sessionToken,
      //     startTime: cosSignData.startTime,
      //     expiredTime: cosSignData.expiredTime,
      //     sliceSize: 1024,
      //     isHttps: true
      //   },
      //   bucket: process.env.NODE_ENV === 'production' ? 'aisp2-1251170195' : 'aisp-test-1251170195',
      //   cosPath: 'trend/' + filename,
      //   localPath
      // }
      // const that = this
      return new Promise((resolve, reject) => {
        // CosPlugin.upload(options).then((data) => {
        //   this.fileList.push({ url: data.url, type: 'img', name: filename })
        //   this.$emit('input', this.fileList)
        //   resolve()
        // }, error => {
        //   that.$log(error)
        //   reject()
        // })
      })
    },

    // 打开文件阅读
    openFile(item) {
      // ReaderPlugin.openFile({ url: item.url, title: item.name, navbarColor: '#1989fa' })
    }
  }
}
</script>
<style lang="scss">
.wb-image-uploader{
  width: 90% ;
  max-width: 400px;
  .del-button{
    position:absolute;
    top:-2px;
    width:17px;
    height:17px;
    right:0;
    display: flex;
    background: white;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
  }
  .add-button{
    width: 100%;
    height: 100%;
    border: 1px dashed #e3e3e5;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .van-grid-item__content{
    padding:5px;
  }
}
</style>

