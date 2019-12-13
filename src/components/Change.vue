<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-comments" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="mt-4">
      <b-card title="About Me" border-variant="success">
        <b-row>
          <b-col class="bg-light">
            <br/>
            <b-row>
              <h5 class="toast-header">Please enter the password:</h5>
            </b-row>
            <b-row>
                <b-form-input
                  d = "input-psd" id = "p1" aria-describedby="input-psd-feedback" v-model="enteredPassword" type = "password">
                </b-form-input>
                <b-form-invalid-feedback id="input-psd-feedback">
                  The password must be more than 8 digital
                </b-form-invalid-feedback>
            </b-row>
            <br/>
            <b-row>
              <h5 class="toast-header">Please enter the new password</h5>
            </b-row>
            <b-row>
                <b-form-input
                  d = "input-npsd" id = "p2" aria-describedby="input-npsd-feedback" :state="npsdState" v-model="newpassword1" type = "password">
                </b-form-input>
                <b-form-invalid-feedback id="input-npsd-feedback">
                  The new password must be different from the original one
                </b-form-invalid-feedback>
            </b-row>
            <br/>
            <b-row>
              <h5 class="toast-header">Please confirm the password</h5>
            </b-row>
            <b-row>
              <b-form-input
                d = "input-npsd" id = "p3" aria-describedby="input-npsd-feedback" :state="npsdState" v-model="newpassword2" type = "password">
              </b-form-input>
              <b-form-invalid-feedback id="input-npsd-feedback">
                The password must be the same as the former one
              </b-form-invalid-feedback>
            </b-row>
            <br/>
            <b-row>
              <b-col><b-button  id = "bt1" variant="outline-info" @click = changePassword>Confirm change</b-button></b-col>
              <b-col ><b-button id = "bt2" to="/" variant="outline-secondary" >Cancel</b-button></b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>
import FlowershopService from '@/service/flowershopservice'
import {getCookie} from '../assets/js/cookie'
export default {
  computed: {
    npsdState () {
      return this.newpassword1.length > 3
    },
    rpsdState () {
      return this.newpassword1 === this.newpassword2 && this.newpassword2.length > 3
    }
  },
  name: 'Change',
  data () {
    return {
      messagetitle: ' Change Password',
      userName: '',
      user: {},
      password: '',
      enteredPassword: '',
      newpassword1: '',
      newpassword2: ''
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    getUser: function () {
      if (!getCookie('username')) {
        this.$router.push('/login')
      } else {
        this.userName = getCookie('username')
        this.user.userName = this.userName
      }
    },
    changePassword: function () {
      this.user.newPwd = this.newpassword1
      this.user.userPwd = this.enteredPassword
      console.log(this.user)
      FlowershopService.editPassword(this.user)
        .then(response => {
          console.log(response)
          console.log('AFTER Change ' + JSON.stringify(response, null, 5))
          this.$router.push('/login')
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
