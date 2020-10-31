<template>
  <div class="music">
    <div class="playlist-left">
      <div class="select-bar">
        <ul class="select-items">
          <router-link to="/playlist">
            <li>正在播放</li>
          </router-link>
          <router-link to="/recommend">
            <li>推荐</li>
          </router-link>
          <router-link to="/search">
            <li>搜索</li>
          </router-link>
          <router-link to="/mine">
            <li>我的歌单</li>
          </router-link>
          <router-link to="/history-list">
            <li>播放历史</li>
          </router-link>
        </ul>
      </div>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" :key="$route.path" class="music-list"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" :key="$route.path" class="music-list"/>
    </div>
    <div class="playlist-right" v-if="playing">
      <h3>歌名：{{ currentMusic.song }}</h3>
      <p v-for="item in lyricList" :key="item.id" style="font-size: 14px;">{{ item.text }}</p>
    </div>
    <div class="playlist-right" v-else-if="!playing && currentMusic.musicId">
      <h3>歌名：{{ currentMusic.song }}</h3>
      <p v-for="item in lyricList" :key="item.id" style="font-size: 14px;">{{ item.text }}</p>
    </div>
    <div class="playlist-right" v-else>
      <h3>播放专辑页面 info</h3>
      <img src="#" alt="error..">
      <p>在线音乐播放器</p>
      <p>还没有音乐在播放哦！</p>
    </div>

    <!--    遮罩-->
    <div class="playlist-bg" :style="{ backgroundImage: picUrl }"></div>
    <div class="playlist-mask"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import {currentIndex, historyList, playlist} from '../../store/getters'
import { getPlaylistDetail, getLyric } from '../../api'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list: [],
      lyricList: '',
      tempExp: /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g
    }
  },
  components: {},
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    picUrl () {
      return this.currentMusic.musicId ? `url(${this.currentMusic.album.picUrl})` : `url('https://p1.music.126.net/xmYUW7yYS02Tc0McsGdKWA==/18345351510075909.jpg?param=300y300')`
    },
    ...mapGetters(['playing', 'currentMusic', currentIndex, historyList, playlist])
  },
  watch: {
    currentMusic (newV, oldV) {
      console.log('log m nv ov.', newV, oldV)
      if (newV && newV.musicId) {
        console.log('-----------------------------------------')
        getLyric(newV.musicId).then(result => {
          const temp = result.data.lrc.lyric
          // 歌词解析
          const lines = temp.split('\n')
          const lyric = []

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            const result = this.tempExp.exec(line)
            if (!result) {
              continue
            }
            const text = line.replace(this.tempExp, '').trim()
            if (text) {
              lyric.push({
                time: (result[1] * 6e4 + result[2] * 1e3 + (result[3] || 0) * 1) / 1e3,
                text
              })
            }
          }
          this.lyricList = lyric
          console.log('log getlyric3.', lyric)
        })
      }
    }
  },
  created () {
    getPlaylistDetail(3778678)
      .then(({ data }) => data.playlist.tracks)
      .then(result => {
        let arr = []
        result.forEach((d, index) => {
          arr.push({
            id: index,
            song: d.name,
            musicId: d.id,
            album: d.al,
            singer: d.ar[0].name,
            url: `https://music.163.com/song/media/outer/url?id=${d.id}.mp3`,
            duration: this.format(d.dt / 1000)
          })
        })
        this.list = arr
        this.setPlayList({
          list: this.list,
          play: false
        })
        // this.list.name = result.filter(v => v.name)
        // console.log('log list.', this.list)
      })
  },
  mounted () {
    console.log('log mounted..')
  },
  methods: {
    constFunc (item) {
      console.log('log item..', item)
      let arr = []
      Object.keys(item).forEach(t => {
        console.log('log t.', t.name)
        arr.push(t.name)
      })
      return arr
    },
    // 时间格式化
    format (value) {
      let minute = Math.floor(value / 60)
      let second = Math.floor(value % 60)
      return `${this.addZero(minute)}:${this.addZero(second)}`
    },
    addZero (s) {
      return s < 10 ? '0' + s : s
    },
    ...mapMutations({
      setAudioele: 'SET_AUDIOELE'
    }),
    ...mapActions(['selectPlay', 'setPlayList', 'setHistory', 'clearHistory', 'setUid'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .music {
    display: flex;
    justify-content: space-between;
    flex: 1;
    margin: 25px 25px;
    .playlist-bg, .playlist-mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .playlist-mask {
      z-index: -1;
      background-color: rgba(0, 0, 0, 0.4);
    }
    .playlist-bg {
      z-index: -2;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
      filter: blur(12px);
      opacity: 0.7;
      transition: all 0.8s;
      /*transform: scale(1.1);*/
    }
    .playlist-left {
      flex: 1;
      min-width: 318px;
      padding-left: 15px;

      .select-bar {
        white-space: nowrap;
        overflow-x: auto;
        .select-items {
          li {
            border: 1px solid;
            margin: 0 8px 0 0;
            padding: 10px 23px;
            font-size: 14px;
            border-radius: 8px;
          }
        }
      }
    }
    .playlist-right {
      height: 767px;
      overflow: hidden;
      width: 31%;
      text-align: center;
    }
  }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  /*color: #42b983;*/
  color: #ffffff;
}
</style>
