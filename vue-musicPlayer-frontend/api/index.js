import request from '../utils/request'
const defaultLimit = 30

export function getPlayList (id) {
  return request({
    url: '/api/playlist/detail',
    methods: 'get',
    data: [],
    params: { id }
  })
}

export function getToplistDetail () {
  return request({
    url: '/api/toplist/detail',
    methods: 'get'
  })
}

export function getPersonalized () {
  return request({
    url: '/api/personalized',
    methods: 'get'
  })
}

export function search (keywords, page, limit = defaultLimit) {
  console.log('log key..', keywords)
  return request({
    url: '/api/search',
    methods: 'get',
    params: {
      keywords,
      page: page * limit,
      limit
    }
  })
}

export function Login ({ username, password }) {
  return request({
    url: '/api/music/subLogin',
    methods: 'post',
    data: {
      username,
      password
    },
    params: {}
  })
}

export function logout ({ username, password }) {
  return request({
    url: '/api/music/logout',
    methods: 'post',
    data: {
      username,
      password
    },
    params: {}
  })
}

export function getUserPlayList (uid) {
  return request({
    url: '/api/user/playlist',
    methods: 'get',
    params: {
      uid
    }
  })
}

// 获取歌词
export function getLyric (id) {
  return request({
    url: '/api/lyric',
    methods: 'get',
    params: {
      id
    }
  })
}

// 歌单详情页
export function getPlaylistDetail (id) {
  return request({
    url: '/api/playlist/detail',
    methods: 'get',
    params: {
      id
    }
  })
}

// 获取歌曲详情
export function getMusicDetail (ids) {
  return request({
    url: '/api/song/detail',
    methods: 'get',
    params: {
      ids
    }
  })
}
