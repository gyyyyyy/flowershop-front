<template>
  <div id="NavHeader">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <img src="../assets/icon1.png" class="img-circle" style="padding: 5px" width="50" height="50">
        <b-navbar-brand to="/"><b>Flowershop</b></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/#"><i class="fa fa-home" style="padding: 5px"> Home</i></b-nav-item>
            <b-nav-item to="/productlist"><i class="fa fa-list" style="padding: 5px"> Products List</i></b-nav-item>
            <b-nav-item to="/map"><i class="fa fa-globe" style="padding: 5px"> Map</i></b-nav-item>
            <b-nav-item to="/video"><i class="fa fa-youtube-play" style="padding: 5px"> Flower Meaning</i></b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input v-model="keyword" size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button v-on:click="search" size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

            <!--            <b-nav-item-dropdown text="Lang" right>
                          <b-dropdown-item href="#">EN</b-dropdown-item>
                          <b-dropdown-item href="#">ES</b-dropdown-item>
                          <b-dropdown-item href="#">RU</b-dropdown-item>
                          <b-dropdown-item href="#">FA</b-dropdown-item>
                        </b-nav-item-dropdown>-->
            <b-navbar-nav>
              <b-nav-item to="/register">Register</b-nav-item>
              <b-nav-item to="/login">Login</b-nav-item>
            </b-navbar-nav>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!--<b-navbar toggleable="md" variant="dark" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <img src="../assets/icon1.png" class="img-circle" style="padding: 5px" width="50" height="50">
      <b-navbar-brand to="/"><b>Flowershop</b></b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/#"><i class="fa fa-home" style="padding: 5px"> Home</i></b-nav-item>
          <b-nav-item to="/donations"><i class="fa fa-list" style="padding: 5px"> Manage Donations</i></b-nav-item>
          <b-nav-item to="/goodslist"><i class="fa fa-money" style="padding: 5px"> Goods List</i></b-nav-item>
          <b-nav-item to="/map"><i class="fa fa-globe" style="padding: 5px"> Map</i></b-nav-item>
          <b-nav-item to="/video"><i class="fa fa-youtube-play" style="padding: 5px"> Flower Meaning</i></b-nav-item>
          <b-nav-item to="/upload"><i class="fa fa-money" style="padding: 5px"> Upload</i></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/about"><i class="fa fa-info" style="padding: 5px"> About Us</i></b-nav-item>
          <b-nav-item to="/contact"><i class="fa fa-comment" style="padding: 5px"> Contact Us</i></b-nav-item>
          <b-nav-item><i class="fa fa-sign-in" style="padding: 5px"> Login </i></b-nav-item>
          <b-nav-item><i class="fa fa-sign-out" style="padding: 5px"> Logout </i></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>-->
  </div>
</template>

<script>
import FlowershopService from '@/service/flowershopservice'
export default {
  name: 'NavHeader',
  data () {
    return {
      keyword: null
    }
  },
  methods: {
    search: function (keyword) {
      // `this` 在方法里指向当前 Vue 实例
      let data = {'keyword': this.keyword}
      FlowershopService.search(data).then((res) => {
        console.log(res.data)
      })
    }
  }
}
</script>

<style>
  #NavHeaderUser {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-top: 20px;
  }
  .VueTables__sortable {
    cursor: pointer;
  }
</style>
