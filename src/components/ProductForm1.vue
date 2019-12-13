<template>
  <form @submit.prevent="submit">
    <div class="form-group">
      <label class="form-label">Select Product ID</label>
      <select id="productId" name="productId" class="form-control"
              type="text" v-model="productId">
        <option value="null" selected disabled hidden>Choose Product ID</option>
        <option value="01">01</option>
        <option value="02">02</option>
        <option value="03">03</option>
        <option value="04">04</option>
        <option value="05">05</option>
        <option value="06">06</option>
        <option value="07">07</option>
        <option value="08">08</option>
        <option value="09">09</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
      </select>
    </div>
    <div class="form-group" :class="{ 'form-group--error': $v.productName.$error }">
      <label class="form__label">Product Name</label>
      <input class="form__input" placeholder="enter product name here" v-model.trim="$v.productName.$model"/>
    </div>
    <div class="error" v-if="!$v.productName.required">Product name is Required</div>
    <div class="error" v-if="!$v.productName.minLength">Product name must have at least {{$v.productName.$params.minLength.min}} letters.</div>
    <div class="form-group" :class="{ 'form-group--error': $v.salePrice.$error }">
      <label class="form-control-label" name="salePrice">Sale Price (Enter a number between 1 and 1000)</label>
      <input class="form__input" type="decimal" v-model.trim="salePrice"/>
    </div>
    <div class="error" v-if="!$v.salePrice.between">Sale Price must be between 1 and 1000</div>
    <div class="form-group" :class="{ 'form-group--error': $v.productNum.$error }">
      <label class="form-control-label" name="productNum">Amount (Enter a number between 1 and 1000)</label>
      <input class="form__input" type="decimal" v-model.trim="productNum"/>
    </div>
    <div class="error" v-if="!$v.productNum.between">Amount must be between 1 and 1000</div>
    <div class="form-group">
      <img-inputer v-model="file" theme="light" size="large"/>
    </div>
    <p>
      <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">{{ productBtnTitle }}</button>
    </p>
    <p>
      <a href="#/productlistadmin" class="btn btn-primary btn1" role="button">Manage Products</a>
    </p>
    <p class="typo__p" v-if="submitStatus === 'OK'">Update successfully</p>
    <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
    <p class="typo__p" v-if="submitStatus === 'PENDING'">Updating...</p>
  </form>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import { required, minLength, between } from 'vuelidate/lib/validators'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)

export default {
  name: 'FormData',
  props: ['productBtnTitle', 'product'],
  data () {
    return {
      messagetitle: ' Update Product ',
      productId: this.product.productId,
      productName: this.product.productName,
      salePrice: this.product.salePrice,
      productNum: this.product.productNum,
      productImage: this.product.productImage,
      submitStatus: null
    }
  },
  validations: {
    productName: {
      required,
      minLength: minLength(3)
    },
    productNum: {
      required,
      between: between(1, 1000)
    },
    salePrice: {
      required,
      between: between(1, 1000)
    }
  },
  methods: {
    submit () {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          var product = {
            productId: this.productId,
            productName: this.productName,
            salePrice: this.salePrice,
            productNum: this.productNum,
            productImage: this.file.name
          }
          console.log(product)
          this.product = product
          console.log('Submitting in ProductForm : ' +
                            JSON.stringify(this.product, null, 5))
          this.$emit('product-is-created-updated', this.product)
        }, 500)
      }
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  .product-form .form-control-label.text-left{
    text-align: left;
  }

  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }

  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #157ffb;
    color: whitesmoke;
  }

  .error:focus {
    outline-color: #ffa519;
  }
</style>
