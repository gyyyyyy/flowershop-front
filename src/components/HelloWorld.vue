<template>
  <div class="hero">
    <nav-header></nav-header>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="2000"
      controls
      indicators
      img-width="20"
      img-height="20"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
    <b-carousel-slide>
        <template v-slot:img>
          <img
            width="1000"
            height="500"
            src="../assets/14.jpg"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <template v-slot:img>
          <img
            width="1000"
            height="500"
            src="../assets/13.jpg"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <template v-slot:img>
          <img
            width="1000"
            height="500"
            src="../assets/12.jpg"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>
    </b-carousel>
    <h1 class="vue-title">Homer for flower looking !!</h1>

    <table align="center">
      <tr>
        <td>
          <p class="lead"><b><i>Time for a flower !!</i></b>
          <p></p>
          <p></p>
          <p></p>
        </td>
        <td>
          <img src="../assets/hi.gif" alt="description here" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import NavFooter from './NavFooter'
import NavHeader from './NavHeader'
export default {
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  components: {
    NavHeader,
    NavFooter
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = true
    }
  }
}
</script>
<style>
  .hero {
    height: 100vh;
    margin-top: 30px;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .hero .lead {
    font-weight: 200;
    font-size: 2.5rem;
  }
  #app1 {
    width: 60%;
    margin: 0 auto;
  }
  .vue-title {
    font-size: 70pt;
    margin-bottom: 10px;
  }
</style>
