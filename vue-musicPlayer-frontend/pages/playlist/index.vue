<template>
    <div class="playlist">
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
<!--                <li :class="clickIndex === index ? 'addClass': ''" @click=clickHandle(index)>{{ clickBtn ? '⏸' : '▶'}}</li>-->
                <li :class="currentIndex === index ? playing ? 'addClass': '' : ''" @click=clickHandle(item)>▶</li>
                <!--                <li @click="clickHandle(index)"></li>-->
                <li>{{ item.singer }}</li>
                <li>{{ item.duration }}</li>
            </ul>
        </div>
<!--        <audio ref="rmPlayer"></audio>-->
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { getLyric } from '../../api'

export default {
  name: 'playlist',
  props: {},
  computed: {
    ...mapGetters(['currentMusic', 'uid', 'playlist', 'playing', 'currentIndex', 'audioEle'])
  },
  watch: {
    currentMusic (newVal, oldVal) {
      console.log('log new and old..', newVal, oldVal)
      // this.audioEle.src = newVal.url
      this.$nextTick(() => {
        console.log('log audio7.', this.audioEle)
      })
    },
    playlist () {
      this.list = this.playlist
      // console.log('log state list..', this.list)
    },
    audioEle (newV, oldV) {
      console.log('log audio6.', newV, oldV, this.audioEle)
    }
  },
  data () {
    return {
      list: [],
      clickBtn: false,
      clickIndex: -1
    }
  },
  created () {
    this.$nextTick(() => {
      this.list = this.playlist
      console.log('log ref..', this.$refs.rmPlayer)
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
          console.log('log getLyric.', result.data.lrc.lyric)
        })
      }
      if (this.clickBtn) {
        // this.$refs.rmPlayer.play()
        this.audioEle.play()
        this.selectPlay({
          list: d,
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
    // clickBtn d.id this.currentIndex
    ...mapMutations({
      setPlaying: 'SET_PLAYING'
    }),
    ...mapActions(['setPlaying', 'selectPlay', 'setPlayList'])
  }
}
</script>

<style lang="less" scoped>
.playlist {
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
    color: #42b983;
}
</style>
