<template>
    <div class="list-detail">
        <div class="music-info">
            <ul class="info-item">
                <li class="song">歌曲</li>
                <li class="singer">歌手</li>
                <li>时长</li>
            </ul>
        </div>
        <div class="music-detail">
            <ul class="music-item" v-for="(item, index) in list" :key="index">
                <li v-text="index + 1"></li>
                <li class="music-name">{{ item.song }}</li>
                <li :class="currentIndex === index ? playing ? 'addClass': '' : ''" @click=clickHandle(item)>▶</li>
                <li>{{ item.singer }}</li>
                <li>{{ item.duration }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getPlaylistDetail, getMusicDetail, getLyric } from '../../api'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'list-detail',
  props: {},
  computed: {
    ...mapGetters(['currentMusic', 'uid', 'playlist', 'currentIndex', 'playing', 'audioEle'])
  },
  data () {
    return {
      list: [],
      clickBtn: false,
      clickIndex: -1,
      tempExp: /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g
    }
  },
  watch: {},
  created () {
    getPlaylistDetail(this.$route.params.id)
      .then(({ data }) => data.playlist)
      .then(res => {
        console.log('log detail list.', res)
        const ids = res.trackIds.slice(0, 500).map(v => v.id).toString()
        getMusicDetail(ids)
          .then(({ data }) => data.songs)
          .then(playlist => {
            console.log('log song.', playlist)
            let arr = []
            playlist.forEach((d, index) => {
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
          })
      })
  },
  methods: {
    clickHandle (d) {
      this.clickIndex = d.id
      // this.$refs.rmPlayer.src = d.url
      this.audioEle.src = d.url
      if (d.id === this.currentIndex) {
        this.clickBtn = !this.clickBtn
      } else {
        this.clickBtn = true
        getLyric(d.musicId).then(result => {
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
          console.log('log getlyric.', lyric)
        })
      }
      if (this.clickBtn) {
        // this.$refs.rmPlayer.play()
        this.audioEle.play()
        this.selectPlay({
          list: d,
          play: true
        })
        this.setPlayList({
          list: this.list,
          play: true
        })
      } else {
        // this.$refs.rmPlayer.pause()
        this.audioEle.pause()
        this.selectPlay({
          list: d,
          play: false
        })
      }
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
    ...mapActions(['setPlayList', 'selectPlay'])
  }
}
</script>

<style lang="less" scoped>
.list-detail {
    display: block;

    .music-detail {
        /*background-color: #42b983;*/
        /*border: 1px solid gray;*/
        height: 660px;
        overflow: hidden;
        overflow-y: auto;
    }

    .music-info {
        padding-left: 32px;
        padding-right: 20px;

        .info-item {
            width: 100%;
            display: flex;
            justify-content: space-between;

            .song {
                flex: 1;
            }
            .singer {
                /*flex: 1;*/
                width: 25%;
            }
        }
    }
    .music-item {
        display: flex;
        height: 21px;
        line-height: 21px;

        li:nth-child(3) {
            cursor: pointer;
            /*font-size: 40px;*/
            /*&::before {*/
            /*    content: "\e95d";*/
            /*}*/
        }
        li:nth-child(4) {
            width: 22%;
        }
        li:nth-child(5) {
            padding-right: 12px;
        }
    }
    .music-name {
        flex: 1;
    }
}

.addClass {
    color: red;
}
</style>
