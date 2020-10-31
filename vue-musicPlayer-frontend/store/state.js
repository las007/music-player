import { getUserId } from '../utils/storage'

const state = {
  audioEle: null,
  playlist: [],
  playing: false,
  currentIndex: -1,
  historyList: [],
  uid: getUserId() || null // 网易云用户uid
}

export default state
