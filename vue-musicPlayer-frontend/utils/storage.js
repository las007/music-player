
const _storage = window.localStorage
const storage = {
  get (key, data = []) {
    if (_storage) {
      return _storage.getItem(key)
        ? Array.isArray(data)
          ? JSON.parse(_storage.getItem(key))
          : _storage.getItem(key)
        : data
    }
  },
  set (key, val) {
    if (_storage) {
      _storage.setItem(key, val)
    }
  },
  clear (key) {
    if (_storage) {
      _storage.removeItem(key)
    }
  }
}

export function getHistoryList () {
  return storage.get('GET_HISTORY_LIST')
}
export function setHistoryList (music) {
  storage.set('HISTORY_LIST_KEY', music)
}
export function clearHistoryList () {
  storage.clear('HISTORY_LIST_KEY')
  return []
}

// 获取用户 uid
export function getUserId () {
  return Number(storage.get('USER_KEY', null))
}

// 设置用户 uid
export function setUserId (ID) {
  storage.set('USER_KEY', ID)
  return ID
}
