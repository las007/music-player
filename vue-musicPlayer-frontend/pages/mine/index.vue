<template>
    <div class="user-list">
        <h2>显示我的歌单</h2>
        <div class="list-items">
            <ul class="item-info">
                <li v-for="(item, index) in list" :key="index" @click="toDetails(item.id)">
                    <img :src="item.coverImgUrl" alt="error.">
                    <span>{{ item.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getUserPlayList } from '../../api'
import { mapGetters } from 'vuex'

export default {
  name: 'userList',
  computed: {
    ...mapGetters(['uid', 'audioEle'])
  },
  watch: {
    uid (newUid) {
      if (newUid) {
        console.log('log the new uid.', newUid)
        this._getUserPlayList(newUid)
      }
    }
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    console.log('log new newnwnnwn.', this.uid, this.audioEle)
    this.uid && this._getUserPlayList(this.uid)
  },
  activated () {
    // this.uid && this._getUserPlayList(this.uid)
  },
  methods: {
    _getUserPlayList (uid) {
      getUserPlayList(uid).then(res => {
        console.log('log user play list.', res.data.playlist)
        this.list = res.data.playlist
      })
    },
    toDetails (id) {
      this.$router.push(`/mine/details/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.user-list {
    .list-items {
        .item-info {
            li {
                width: 160px;
                height: 150px;
                /*border: 1px solid rgba(255, 255, 255, 0.6);*/
                text-align: center;
                font-size: 16px;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 8px
                }
            }
        }
    }
}
</style>
