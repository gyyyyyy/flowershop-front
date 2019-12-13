<template>
  <div class="hero">
    <nav-header-user></nav-header-user>
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="products" :options="options">
        <img slot="img" slot-scope="props" :src="'../../static/'+props.row.productImage" alt="" width="150" height="150">
        <a slot="addcart" slot-scope="props" class="fa fa-shopping-cart" @click="addCart(props.row)"></a>
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
  name: 'Product List',
  data () {
    return {
      messagetitle: ' Product List ',
      products: [],
      props: ['_id', 'productImage'],
      errors: [],
      columns: ['productId', 'productName', 'salePrice', 'productNum', 'img', 'addcart'],
      options: {
        perPage: 10,
        filterable: ['productId', 'productName'],
        sortable: ['salePrice', 'productNum'],
        headings: {
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
    this.loadProducts()
  },
  components: {
    NavHeaderUser
  },
  methods: {
    loadProducts: function () {
      FlowershopService.fetchProducts()
        .then(response => {
          // JSON responses are automatically parsed.
          this.products = response.data
          console.log(this.products)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    addCart: function (product) {
      var body = {}
      body.userName = getCookie('username')
      body.productId = product.productId
      FlowershopService.addCart(body)
        .then(response => {
          // JSON responses are automatically parsed.
          alert('success')
          console.log(response.data)
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
    width: 60%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
