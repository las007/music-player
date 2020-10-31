<template>
    <div class="footer">
        <div class="controller">
            <ul class="control-item">
                <li>上一曲</li>
<!--                <li>暂停/播放</li>-->
                <li style="margin: 0 15px; cursor: pointer;" :class="playing ? 'addClass' : ''" @click=clickHandle>▶</li>
                <li>下一曲</li>
            </ul>
        </div>
        <div class="slide-bar">进度条------------------------------------------------</div>
        <div class="info">音量/循环/歌词/评论</div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  // name: 'footer',
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapGetters(['currentMusic', 'playing', 'audioEle'])
  },
  watch: {
    currentMusic (newV, oldV) {
      console.log('log footer.', newV, oldV)
    }
  },
  methods: {
    clickHandle () {
      console.log('log stop..', this.currentMusic)
      if (!this.playing) {
        this.audioEle.play()
        this.selectPlay({
          list: this.currentMusic,
          play: true
        })
      } else {
        this.audioEle.pause()
        this.selectPlay({
          list: this.currentMusic,
          play: false
        })
      }
    },
    ...mapActions(['selectPlay'])
  }
}
</script>

<style lang="less" scoped>
    .footer {
        display: flex;
        justify-content: space-between;
        height: 80px;
        line-height: 80px;
        background-color: gray;
    }
    .controller {
        width: 21%;
    }
    .slide-bar {
        flex: 1;
    }
    .control-item {
        display: flex;
        list-style-type: none;
        margin-top: 0;
        /*padding-left: 0;*/
    }
    .info {
        width: 15%;
    }
    .addClass {
        color: red;
    }
</style>
