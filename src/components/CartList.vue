<template>
  <div class="hero">
    <nav-header-user></nav-header-user>
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="products" :options="options">
        <img slot="image" slot-scope="props" :src="'../../static/'+props.row.productImage" alt="" width="150" height="150">
        <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="cartDel(props.row)"></a>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import NavHeaderUser from './NavHeaderUser'
import FlowershopService from '@/service/flowershopservice'
import Vue from 'vue'
import VueTables from 'vue-tables-2'
import {getCookie} from '../assets/js/cookie'
Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Cart List',
  data () {
    return {
      messagetitle: ' Cart List ',
      products: [],
      props: ['_id'],
      errors: [],
      columns: ['productId', 'productName', 'salePrice', 'image', 'remove'],
      options: {
        perPage: 10,
        filterable: ['productId', 'productName'],
        sortable: ['salePrice', 'productNum'],
        headings: {
          _id: 'ID',
          productId: 'Serial number',
          productName: 'Name',
          salePrice: 'Price',
          productNum: 'Amount'
        }
      }
    }
  },
  // Fetches Donations when the component is created.
  created () {
    this.cartListGet()
  },
  components: {
    NavHeaderUser
  },
  methods: {
    cartListGet: function () {
      var body = {}
      body.userName = getCookie('username')
      console.log(body)
      FlowershopService.cartList(body)
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response)
          console.log(response.data.result)
          this.products = response.data.result
          console.log(this.products)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    cartDel: function (product) {
      var body = {}
      body.userName = getCookie('username')
      body.productId = product.productId
      FlowershopService.cartDel(body)
        .then(response => {
          // JSON responses are automatically parsed.
          alert('success')
          this.$router.go(0)
          this.message = response.data

          console.log(this.message)
          // Vue.nextTick(() => this.$refs.vuetable.refresh())
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
  #app1 {
    width: 90%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
