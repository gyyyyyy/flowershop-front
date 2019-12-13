<template>
  <div id="meaning">
    <nav-header v-show="showRouter"></nav-header>
    <nav-header-user v-show="showUserRouter"></nav-header-user>
    <h2 class="text-center text-secondary pb-2">FlowerMeaning</h2>
    <youtube video-id="NwKBCIohQgw" />
  </div>
</template>

<script>
import { getCookie } from '../assets/js/cookie.js'
import NavFooter from './NavFooter'
import NavHeaderUser from './NavHeaderUser'
import NavHeader from './NavHeader'
export default {
  name: 'meaning',
  data () {
    return {
      showUserRouter: false,
      showRouter: true
    }
  },
  components: {
    NavHeaderUser,
    NavHeader,
    NavFooter
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (getCookie('username')) {
        this.showUserRouter = true
        this.showRouter = false
      } else {
        this.showRouter = true
        this.showUserRouter = false
      }
    }
  }
}
</script>
