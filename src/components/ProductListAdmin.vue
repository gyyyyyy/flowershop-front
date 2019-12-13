<template>
  <div class="hero">
    <nav-header-admin></nav-header-admin>
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="products" :options="options">
        <img slot="image" slot-scope="props" :src="'../../static/'+props.row.productImage" alt="" width="150" height="150">
        <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x" @click="editProduct(props.row._id)"></a>
        <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteProduct(props.row._id)"></a>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import NavHeaderAdmin from './NavHeaderAdmin'
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
      props: ['_id'],
      errors: [],
      columns: ['productId', 'productName', 'salePrice', 'checked', 'productNum', 'image', 'edit', 'remove'],
      options: {
        perPage: 10,
        filterable: ['productId', 'productName'],
        sortable: ['salePrice', 'productNum'],
        headings: {
          _id: 'ID',
          productId: 'Serial number',
          productName: 'Name',
          salePrice: 'Price',
          checked: 'Checked',
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
    NavHeaderAdmin
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
    editProduct: function (id) {
      this.$router.params = id
      this.$router.push('edit')
    },
    deleteProduct: function (id) {
      FlowershopService.deleteProduct(id)
        .then(response => {
          // JSON responses are automatically parsed.
          this.message = response.data
          alert('success')
          this.$router.push('/productlistadmin')
          console.log(this.message)
          this.loadProducts()
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
