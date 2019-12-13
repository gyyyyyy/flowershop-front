import Api from '@/service/api'

export default {
  register (user) {
    return Api().post('/user/register', user,
      { headers: {'Content-type': 'application/json'} })
  },
  login (user) {
    return Api().post('/user/login', user,
      { headers: {'Content-type': 'application/json'} })
  },
  changePwdUser (user) {
    return Api().post('/user/change', user,
      { headers: {'Content-type': 'application/json'} })
  },
  goodsList () {
    return Api().get('/general/list')
  },
  search (keyword) {
    return Api().post('/general/search', keyword,
      { headers: {'Content-type': 'application/json'} })
  },
  fetchProducts () {
    return Api().get('/admin/product')
  },
  postProduct (product) {
    return Api().post('/admin/product', product,
      { headers: {'Content-type': 'application/json'} })
  },
  deleteProduct (id) {
    return Api().delete(`/admin/product/${id}`)
  },
  fetchProduct (id) {
    return Api().get(`/admin/product/${id}`)
  },
  putProduct (id, product) {
    console.log('REQUESTING ' + product._id + ' ' +
      JSON.stringify(product, null, 5))
    return Api().put(`/admin/product/${id}`, product,
      { headers: {'Content-type': 'application/json'} })
  },
  addCart (product) {
    return Api().post('/user/addCart', product,
      { headers: {'Content-type': 'application/json'} })
  },
  cartDel (product) {
    return Api().post('/user/cartDel', product,
      { headers: {'Content-type': 'application/json'} })
  },
  cartList (product) {
    return Api().post('/user/cartList', product,
      { headers: {'Content-type': 'application/json'} })
  },
  editPassword (user) {
    return Api().post('/user/change', user,
      { headers: {'Content-type': 'application/json'} })
  }

}
