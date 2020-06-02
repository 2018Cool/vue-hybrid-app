<template>
  <div class="my-projects">
    <!-- 头部导航栏 -->
    <wb-nav
      title="项目列表"
    >
      <div slot="right" class="d-flex align-items-center">
        <van-icon name="plus" size="18" style="padding:10px 15px 10px 5px" @click="$debounce(addProject)" />
      </div>
    </wb-nav>

    <!-- 列表部分 -->
    <wb-content has-footer>
      <wb-list
        ref="list"
        v-model="listData"
        unfreeze
        placeholder="搜索"
        :query="query"
        :fetch-fun="fetchFun"
      >
        <van-swipe-cell v-for="(item,index) of listData" :key="item.code">
          <van-cell
            :title-style="{color:'#1989fa'}"
            clickable
            @click="showDetail(item,index)"
          >
            <div slot="title" class="d-flex align-items-center">
              <span class="d-inline-block text-truncate" style="max-width: 90vw;">{{ item.name }}</span>
            </div>
          </van-cell>
          <template slot="right">
            <van-button type="danger" square text="删除" class="h-100 w-100" @click="del(item, index)" />
          </template>
        </van-swipe-cell>
      </wb-list>
    </wb-content>
  </div>
</template>

<script>
import { getListData } from '@/api/projects'
import { debounce } from '@/utils'
import AddProject from './components/AddProject'
import ProjectDetail from './components/ProjectDetail'

export default {
  data() {
    return {
      fetchFun: getListData,
      debounce: debounce(this.onSearch, 500),
      listData: [],
      query: {
        pageNo: 1,
        pageSize: 20,
        condition: ''
      }
    }
  },

  activated() {
    if (this.refreshFlags.projects) {
      this.listData = []
      this.$refs.list.refreshList()
    }
  },
  methods: {
    // 添加商机
    addProject() {
      // 加上防抖，防止用户多次点击
      this.$pushPage(AddProject, { title: '新建项目' }).onPageClose((data) => {
        if (data) {
          this.$refs.list.onRefresh()
        }
      })
    },

    // 显示商机详情
    showDetail(info, index) {
      this.$pushPage(ProjectDetail, { info: info, code: info.code }).onPageClose((data) => {
        if (data.isModify) {
          this.$refs.list.onRefresh()
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .my-projects {
    .van-nav-bar__title {
      max-width: 83%;
    }
    .van-nav-bar__right{
      padding-right:0px;
    }
    .van-popup {
      .van-button {
        border-radius: 0px;
      }
    }
    .van-swipe-cell__right{
      width:90px;
    }
    .red-circle{
      position: absolute;
      left:8px;
    }
  }
</style>
