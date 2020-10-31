
import { clearHistoryList, setHistoryList, setUserId } from '../utils/storage'

// 选择播放音乐
export const selectPlay = function ({ commit }, {list, play}) {
  console.log('log select list..', list)
  commit('SET_PLAYING', play)
  // commit('SET_PLAY_LIST', list)
  commit('SET_CURRENT_INDEX', list.id)
}

export const setAudioEle = function ({commit}, audio) {
  console.log('log audio5.', audio)
  commit('SET_AUDIOELE', audio)
}

// 设置播放列表
export const setPlayList = function ({ commit }, { list, play }) {
  commit('SET_PLAY_LIST', list)
  commit('SET_PLAYING', play)
}

// 设置播放历史列表
export const setHistory = function (commit, music) {
  commit('SET_HISTORY_LIST', setHistoryList(music))
}

// 清空历史播放列表
export const clearHistory = function (commit) {
  commit('SET_HISTORY_LIST', clearHistoryList())
}

// 设置网易云用户 uid
export const setUid = function ({ commit }, uid) {
  console.log('log set uid..', uid)
  commit('SET_UID', setUserId(uid))
}
