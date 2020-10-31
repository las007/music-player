<template>
    <div class="header-bar">
        <div class="header-left">
            <a style="margin: 0 auto;font-size: 18px;color: #ffffff">在线音乐播放器rm</a>
        </div>
        <div class="header-right">
<!--            <span class="user-header-img" v-if="headerImg">-->
<!--                <img :src=headerImg alt="error..">-->
<!--            </span>-->
            <img :src=headerImg alt="error.." v-if="headerImg">
            <span class="user-header-img" v-else>
                <img src="../../src/assets/logo.png" alt="error..">
            </span>
            <span style="color: ghostwhite; padding-left: 15px">{{ nickName }}</span>
            <span @click="show(0)" v-show="!showLogout">登录</span>
            <span @click="show(1)" v-show="showLogout" style="padding-left: 15px">退出</span>
        </div>
        <div class="model" v-show="showModel">
            <p>登录</p>
            <div class="input-item">
                <input type="text" placeholder="请输入您的网易云 UID" v-model="inputVal">
<!--                <button @cclick="!showModel">取消</button>-->
                <div>
                    <button  @click="closeModel">关闭</button>
                    <button @click="onLogin">确定</button>
                </div>
            </div>
        </div>
        <mm-dialog
            ref="loginDialog"
            head-text="登录"
            confirm-btn-text="确定"
            cancel-btn-text="关闭"
            @confirm="onLogin">
            <div class="mm-dialog-text">
                <input
                        v-model.trim="inputVal"
                        class="mm-dialog-input"
                        type="number"
                        autofocus
                        placeholder="请输入您的网易云 UID"
                        @keyup.enter="onLogin"
                />
            </div>
            <div slot="btn">帮助</div>
        </mm-dialog>
        <show-dialog
            :showDialog="showMask"/>
    </div>
</template>

<script>
import { getUserPlayList } from '../../api'
import ShowDialog from './showDialog'
import { mapGetters, mapActions } from 'vuex'
import MmDialog from '../base/mm-dialog/mm-dialog'

export default {
  name: 'header-bar',
  components: {
    ShowDialog,
    MmDialog
  },
  data () {
    return {
      songName: '',
      imgUrl: '',
      showModel: false,
      inputVal: '',
      showLogout: false,
      showMask: false,
      headerImg: '',
      nickName: ''
    }
  },
  computed: {
    ...mapGetters(['uid'])
  },
  created () {
    const uid = localStorage.getItem('USER_KEY')
    console.log('log this uid..', this.uid, uid)
    this.uid && this._getUserPlayList(this.uid)
  },
  methods: {
    handleEvent () {
      console.log('log some thing..')
    },
    show (item) {
      if (item === 0) {
        this.showModel = true
        // this.$refs.loginDialog.show()
        this.showMask = true
      } else if (item === 1) {
        this.subLogout()
      }
    },
    closeModel () {
      this.showModel = this.showMask = false
      this.inputVal = ''
    },
    onLogin () {
      console.log('log uid..', this.inputVal)
      this._getUserPlayList(this.inputVal)
    },
    _getUserPlayList (uid) {
      if (uid !== '') {
        console.log('log uid2.', uid)
        getUserPlayList(uid).then(result => {
          console.log('log user play list..', result)
          if (result.data.code === 200) {
            this.headerImg = result.data.playlist[0].creator.avatarUrl
            this.nickName = result.data.playlist[0].creator.nickname
            console.log('log header.', this.headerImg, this.nickName)
            this.setUid(uid)
            this.showLogout = true
            this.showModel = false
            this.$mmToast(`${this.nickName}  欢迎使用rmplay播放器`)
          }
        })
      } else {
        // alert('UID 不能为空')
        this.$mmToast('UID 不能为空')
      }
    },
    subLogout () {
      console.log('log sub lout', this.inputVal)
      this.showLogout = false
      this.headerImg = null
      this.nickName = null
      this.setUid(null)
      setTimeout(() => {
        this.$mmToast('退出成功！')
      })
      // alert('推出成功')
    },
    ...mapActions(['setUid'])
  }
}
</script>

<style lang="less" scoped>
.header-bar {
   text-align: center;
    position: relative;
    height: 60px;
    line-height: 60px;
    background-color: gray;
    color: #ffffff;
}
.header-left {
    /*color: #000;*/
}
.header-right {
    position: absolute;
    bottom: 0;
    right: 10px;
    display: flex;
    line-height: 40px;
    margin-bottom: 10px;
    span {
        color: red;
    }
    img {
        border-radius: 50%;
        height: 40px;
    }
}
/*.header-right, .user-header-img, img {*/
/*    border-radius: 50%;*/
/*    height: 80px;*/
/*    cursor: pointer;*/
/*}*/
.model {
    background: rgba(0, 0, 0, 0.6);
    width: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
}
</style>
