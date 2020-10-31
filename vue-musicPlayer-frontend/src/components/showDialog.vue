<template>
    <div class="show-dialog">
        <div class="show-dialog-box" v-show="showDialog">
            <h1>显示文本信息 info</h1>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'show-dialog',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      list: ''
    }
  },
  computed: {
    ...mapGetters['playlist']
  },
  watch: {},
  methods: {
    clickEvent () {
      console.log('log some..')
    },
    ...mapMutations({
      setPlaying: 'SET_PLAYING'
    }),
    ...mapActions['selectPlay']
  }
}
</script>

<style lang="less" scoped>
    .show-dialog-box {
        color: red
    }
</style>
