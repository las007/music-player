<template>
    <div class="list-container">
        <h1>显示文本内容info</h1>
        <button @click=clickEvent>点击 click</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getPlayList } from '../../api'

export default {
  props: {},
  data () {
    return {
      name: ''
    }
  },
  computed: {
    // ...mapGetters(['currentMusic', 'playing', 'playlist'])
  },
  watch: {
    currentMusic (newVal, oldVal) {
      if (newVal) {
        return newVal
      }
    }
  },
  created () {
    // getPlayList(3778678).then(playlist => {
    //   console.log('log playlist...', playlist)
    // })
  },
  methods: {
    clickEvent () {
      console.log('log click event...', process.env)
      getPlayList(3778678).then(playlist => {
        console.log('log playlist...', playlist)
        this.selectPlay({ list: playlist })
      })
    },
    ...mapActions(['setPlay', 'selectPlay'])
  }
}
</script>

<!--<style lang="less" scoped></style>-->
