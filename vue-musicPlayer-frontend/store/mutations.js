
import * as types from './mutation-types'

const mutations = {
  // 设置 audio 元素
  [types.SET_AUDIOELE] (state, audio) {
    console.log('log audio3.', audio)
    state.audioEle = audio
  },
  // 修改播放状态
  [types.SET_PLAYING] (state, playing) {
    console.log('log playing list', playing)
    state.playing = playing
  },
  [types.SET_PLAY_LIST] (state, list) {
    // console.log('log playing list33333', list)
    state.playlist = list
  },
  [types.SET_CURRENT_INDEX] (state, constIndex) {
    state.currentIndex = constIndex
  },
  [types.SET_HISTORY_LIST] (state, historyList) {
    state.historyList = historyList
  },
  [types.SET_UID] (state, uid) {
    console.log('log mu uid..', uid)
    state.uid = uid
  }
}

export default mutations
