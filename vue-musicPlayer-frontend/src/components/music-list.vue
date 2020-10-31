<template>
    <div class="music-list">
<!--        <button @click="clickHandle">点击 click</button>-->
        <template v-if="list.length>0">
            <div class="list-item">
                <span>歌曲</span>
                <span>歌手</span>
                <span>专辑</span>
            </div>
            <div class="list-content">
                <ul class="list-info"
                    v-for="(item, index) in list"
                    :key="item.id"
                    @scroll=listScroll($event)>
                    <li class="song-text" v-text="index + 1"></li>
                    <li class="song-name">{{ item.name }}</li>
                    <li class="song-singer">{{ item.singer }}</li>
                    <li class="song-album">{{ item.album.name }}</li>
                </ul>
            </div>
        </template>
        <no-message v-else title="尚且没有任何信息 info"></no-message>
    </div>
</template>

<script>
import NoMessage from '../../src/components/no-message'
export default {
  name: 'music-list',
  props: {
    list: {}
  },
  components: {
    NoMessage
  },
  data () {
    return {
      lookUp: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    clickHandle () {
      console.log('log stop..', this.list)
      // this.$router.push('/lyric')
    },
    listScroll () { // 鼠标滚动事件
      this.$emit('pollUp')
    },
    selectItem (index, name, e, item) { // 播放/暂停事件
      this.$emit('select', index, name, item)
    }
  }
}
</script>

<style lang="less" scoped>
.music-list {
    min-width: 806px;
    .list-item, .list-content {
        width: 75%;
    }
    .list-item {
        padding-left: 40px;
        background-color: #969498;
        display: flex;
        justify-content: space-between;
        span {
            display: inline-block;
        }
        span:nth-child(1) {
            flex: 1
        }
        span:nth-child(2), span:nth-child(3) {
            width: 200px;
        }
    }
    .list-content {
        /*background: aqua;*/
        /*height: calc(~'100% - 80px');*/
        overflow-x: hidden;
        overflow-y: auto;
        height: 655px;
        .list-info {
            display: flex;
            list-style-type: none;
            justify-content: space-between;
            padding-left: 0;
            li {
                display: inline-block;
            }
            li:nth-child(1) {
                padding-right: 28px;
            }
            li:nth-child(2) {
                flex: 1;
            }
            li:nth-child(3), li:nth-child(4) {
                width: 200px;
            }
        }
    }
}
    ::-webkit-scrollbar {
        background-color: rgba(0, 0, 0, 0.3);
        width: 5px;
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 10px;
    }
</style>
