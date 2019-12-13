<template>
  <div id="Login">
    <div class="login-wrap" v-show="showLogin">
      <h3>Login</h3>
      <p v-show="showTishi">{{tishi}}</p>
      <input type="text" placeholder="please input name" v-model="username">
      <input type="password" placeholder="please input pwd" v-model="password">
      <button v-on:click="login">login</button>
      <span v-on:click="ToRegister">register now!</span>
    </div>

    <div class="register-wrap" v-show="showRegister">
      <h3>Register</h3>
      <p v-show="showTishi">{{tishi}}</p>
      <input type="text" placeholder="please input name" v-model="newUsername">
      <input type="password" placeholder="please input pwd" v-model="newPassword">
      <button v-on:click="register">register</button>
      <span v-on:click="ToLogin">login now</span>
    </div>
  </div>
</template>

<style>
  .login-wrap{text-align:center;}
  #Login input{display:block; width:250px; height:40px; line-height:40px; margin:0 auto; margin-bottom: 10px; outline:none; border:1px solid #888; padding:10px; box-sizing:border-box;}
  #Login p{color:red;}
  #Login button{display:block; width:250px; height:40px; line-height: 40px; margin:0 auto; border:none; background-color:#41b883; color:#fff; font-size:16px; margin-bottom:5px;}
  #Login span{cursor:pointer;}
  #Login span:hover{color:#41b883;}
</style>

<script>
import FlowershopService from '@/service/flowershopservice'
import { setCookie, getCookie } from '../assets/js/cookie.js'
export default{
  data () {
    return {
      username: '',
      password: '',
      newUsername: '',
      newPassword: '',
      tishi: '',
      showTishi: false,
      showLogin: false,
      showRegister: true
    }
  },
  mounted () {
    if (getCookie('username')) {
      this.$router.push('/usercenter')
    }
  },
  methods: {
    login () {
      if (this.username === '' || this.password === '') {
        alert('empty`1')
      } else {
        let data = {'userName': this.username, 'userPwd': this.password}
        console.log(data)
        FlowershopService.login(data).then((res) => {
          console.log(res)
          if (res.data.isSuccess === false) {
            this.tishi = res.data.message
            this.showTishi = true
          } else if (res.data.isAdmin === true) {
            this.$router.push('/admincenter')
          } else if (res.data.isAdmin === false) {
            this.$router.push('/usercenter')
            setCookie('username', this.username, 1000 * 60)
            /*            setTimeout(function () {
                this.$router.push({path: 'home', query: {id: 1}})
              }.bind(this), 1000) */
          } else {

          }
        })
      }
    },
    ToRegister () {
      this.tishi = false
      this.showRegister = true
      this.showLogin = false
    },
    ToLogin () {
      this.tishi = false
      this.showRegister = false
      this.showLogin = true
    },
    register () {
      if (this.newUsername === '' || this.newPassword === '') {
        alert('please input')
      } else {
        let data = {'userName': this.newUsername, 'userPwd': this.newPassword}
        FlowershopService.register(data).then((res) => {
          console.log(res)
          if (res.data.isSuccess === true) {
            this.tishi = 'success'
            this.showTishi = true
            this.username = ''
            this.password = ''
            setTimeout(function () {
              this.showRegister = false
              this.showLogin = true
              this.showTishi = false
            }.bind(this), 1000)
          } else if (res.data.isSuccess === false) {
            this.tishi = 'fail'
            this.showTishi = true
          }
        })
      }
    }
  }
}
</script>
