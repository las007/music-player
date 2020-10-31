<template>
    <div class="recommend">
        <div class="toplist">
            <p>热歌榜</p>
            <ul class="hot-list">
                <li v-for="item in list" :key="item.id">
                    <img :src="item.coverImgUrl" alt="error..">
                    <span>{{ item.name }}</span>
                </li>
            </ul>
        </div>
        <div class="isHot">
            <p>推荐歌单</p>
            <ul class="recommend-list">
                <li v-for="item in hotList" :key="item.id">
                    <img :src="item.picUrl" alt="error..">
                    <span>{{ item.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import { getToplistDetail, getPersonalized } from '../../api'

export default {
  name: 'recommend',
  data () {
    return {
      list: [], // 云音乐特色歌单
      hotList: [] // 热门歌单
    }
  },
  watch: {},
  computed: {},
  created () {
    getToplistDetail().then(topList => {
      this.list = topList.data.list.filter(v => v.ToplistType)
      console.log('log top list..', this.list)

      // this.list = topList.list.filter(v => v.ToplistType)
      getPersonalized().then(hotList => {
        this.hotList = hotList.data.result.slice()
        console.log('log hot list..', this.hotList)

        // this.hotList = hotList.result.slice()
      })
    })
    // Promise.all([getToplistDetail(), getPersonalized()])
    //   .then(([topList, hotList]) => {
    //     this.list = topList.list.filter(v => v.ToplistType)
    //     this.hotList = hotList.result.slice()
    //   })
  },
  methods: {
    clickHandle () {}
  }
}
</script>

<style lang="less" scoped>
.recommend {
    height: 680px;
    overflow: hidden;
    overflow-y: auto;
    .recommend-list, .hot-list {
        text-align: center;
        li {
            width: 123px;
            height: 150px;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-top: 20px;

            img {
                width: 100%;
                border-radius: 8px;
                overflow: hidden;
            }
            span {
                font-size: 14px;
                white-space: nowrap;
            }
        }
    }
}
</style>
