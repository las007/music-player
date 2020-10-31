<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <header-bar></header-bar>
    <router-view/>
    <footer-bar></footer-bar>
<!--      播放器元素-->
      <audio ref="rmPlayer"></audio>
  </div>
</template>

<script>
import HeaderBar from '@/components/headerBar'
import FooterBar from '@/components/footer'
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'App',
  components: {
    HeaderBar,
    FooterBar
  },
  created () {
    this.$nextTick(() => {
      console.log('log audio.', this.$refs.rmPlayer2)
      this.setAudioele(this.$refs.rmPlayer)
    })
  },
  methods: {
    ...mapMutations({
      setAudioele: 'SET_AUDIOELE'
    }),
    ...mapActions(['setAudioEle'])
  }
}
</script>

<style>
  body {
    margin: 0;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
    color: rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
    overflow: hidden;
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
