import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ProductList from '@/components/ProductList'
import ProductListUser from '@/components/ProductListUser'
import ProductListAdmin from '@/components/ProductListAdmin'
import Edit from '@/components/Edit'
import Map from '@/components/Map'
import FlowerMeaning from '@/components/FlowerMeaning'
import Login from '@/components/Login'
import Register from '@/components/Register'
import UserCenter from '@/components/UserCenter'
import AdminCenter from '../components/AdminCenter'
import CartList from '@/components/CartList'
import AddProduct from '../components/AddProduct'
import Change from '../components/Change'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/productlist',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/productlistuser',
      name: 'ProductListUser',
      component: ProductListUser
    },
    {
      path: '/productlistadmin',
      name: 'ProductListAdmin',
      component: ProductListAdmin
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit,
      props: true
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
    {
      path: '/video',
      name: 'FlowerMeaning',
      component: FlowerMeaning
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/cartlist',
      name: 'CartList',
      component: CartList
    },
    {
      path: '/usercenter',
      name: 'UserCenter',
      component: UserCenter
    },
    {
      path: '/admincenter',
      name: 'AdminCenter',
      component: AdminCenter
    },
    {
      path: '/addproduct',
      name: 'AddProduct',
      component: AddProduct
    },
    {
      path: '/change',
      name: 'Change',
      component: Change
    }
  ]
})
