import Vue from 'vue'
import Router from 'vue-router'
import Music from '@/components/Music'
import MusicList from '@/components/MusicList'
import Search from '../../pages/search'
// import Mine from '@/components/mine'
import Mine from '../../pages/mine'
import HistoryList from '../../pages/historyList'
import Recommend from '../../pages/recommend'
import Playlist from '../../pages/playlist'
import ListDetail from '../../pages/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Music,
      redirect: '/playlist',
      children: [
        {
          path: '/playlist',
          name: 'playlist',
          component: Playlist,
          meta: {
            title: '正在播放',
            keepAlive: true
          }
        },
        {
          path: '/history-list',
          name: 'historyList',
          component: HistoryList,
          meta: {
            title: '历史歌单',
            keepAlive: true
          }
        },
        {
          path: '/search',
          name: 'search',
          // component: () => import('@/components/search')
          component: Search,
          meta: {
            title: '搜索',
            keepAlive: true
          }
        },
        {
          path: '/recommend',
          name: 'recommend',
          component: Recommend,
          meta: {
            title: '推荐',
            keepAlive: true
          }
        },
        {
          path: '/mine',
          name: 'mine',
          component: Mine,
          meta: {
            title: '我的歌单',
            keepAlive: true
          }
        },
        {
          path: '/mine/details/:id',
          name: 'details',
          component: ListDetail,
          meta: {
            title: '歌单详情页',
            keepAlive: true
          }
        }
      ]
    },
    {
      path: '/lyric',
      name: 'getPlayList',
      component: MusicList
    }
  ]
})
