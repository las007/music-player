<template>
    <div class="search">
        <div style="margin: 15px auto;text-align: center;">
            <input style="padding-left: 15px;height: 31px;width: 420px;border-radius: 8px;outline: none" type="text" placeholder="音乐/歌手" v-model.trim="searchVal" @keyup.enter=onSearch>
            <button style="height: 31px; width: 50px;border-radius: 8px" @click=onSearch>提交</button>
        </div>

        <music-list
            ref="musicList"
            :list="list"
            @select="selectItem"
            @pullUp="pullUpLoad"/>
    </div>
</template>

<script>
import { search } from '../../api'
import NoMessage from '../../src/components/no-message'
import MusicList from '../../src/components/music-list'
import { filterSinger } from '../../utils/song'

export default {
  name: 'search',
  components: {
    NoMessage,
    MusicList
  },
  data () {
    return {
      searchVal: '', // 搜索关键词
      list: {},
      page: 0
    }
  },
  watch: {},
  computed: {},
  created () {},
  methods: {
    clickHandle () {
      search().then(d => {})
    },
    onSearch () {
      console.log('log on search..', this.searchVal)
      search(this.searchVal).then(({ data }) => data).then(result => {
        console.log('log search result..', result)
        if (result.code === 200) {
          this.list = result.result.songs
          this.list.forEach(d => {
            d.singer = filterSinger(d.artists)
          })
          console.log('log this list..', this.list)
        }
      })
    },
    selectItem (index, name, item) {
      console.log('log children..', index, name, item)
    },
    pullUpLoad () {
      this.page += 1
      search(this.searchVal, this.page).then(result => {
        console.log('log page ++..', result)
        // this.list = [...this.list, ...filterSinger()]
        this.list = result.songs
        this.list.forEach(d => {
          d.singer = filterSinger(d.artists)
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .search {}
</style>
