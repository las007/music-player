// 设置全局 audio 元素
export const audioEle = state => state.audioEle

// 播放模式：暂停/播放
export const playing = state => state.playing

// 播放列表
export const playlist = state => state.playlist

// 当前音乐索引
export const currentIndex = state => state.currentIndex

// 播放历史
export const historyList = state => state.historyList

// 当前播放单曲
export const currentMusic = state => {
  console.log('log current.', state.playlist, state.currentIndex)
  return state.playlist[state.currentIndex] || []
}

// 网易云 UID
export const uid = state => state.uid
