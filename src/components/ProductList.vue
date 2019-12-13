<template>
  <div class="hero">
    <nav-header></nav-header>
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="products" :options="options">
        <img slot="img" slot-scope="props" :src="'../../static/'+props.row.productImage" alt="" width="150" height="150">
      </v-client-table>
    </div>
  </div>
</template>

<script>
import NavHeader from './NavHeader'
import FlowershopService from '@/service/flowershopservice'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Product List',
  data () {
    return {
      messagetitle: ' Product List ',
      products: [],
      props: ['_id', 'productImage'],
      errors: [],
      columns: ['productId', 'productName', 'salePrice', 'productNum', 'img'],
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
    NavHeader
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
