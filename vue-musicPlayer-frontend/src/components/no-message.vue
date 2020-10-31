<template>
    <div class="no-message">
        <h1 style="margin: 50px auto;" class="result-text">{{ title }}}</h1>
    </div>
</template>

<script>
export default {
  name: 'music-list',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      list: ''
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  methods: {}
}
</script>

<style lang="less" scoped>
    .no-message {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        .result-text {
            font-size: 16px;
            color: ghostwhite;
        }
    }
</style>
