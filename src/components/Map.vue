<template>
  <div >
    <nav-header v-show="showRouter"></nav-header>
    <nav-header-user v-show="showUserRouter"></nav-header-user>
    <h2 class="text-center text-secondary pb-2">Map</h2>
    <div class="map-container border rounded">
      <ul class="nav justify-content-center border-bottom">
        <!--營運地區 nav-->
      </ul>
      <!--地圖呈現在此-->
      <div class="container mt-4"><div class="google-map" id="map"></div></div>
    </div>
  </div>
</template>
<style scoped>
  .google-map {
    width: 100%;
    height: 400px;
  }
</style>
<script>
import { getCookie } from '../assets/js/cookie.js'
import NavFooter from './NavFooter'
import NavHeaderUser from './NavHeaderUser'
import NavHeader from './NavHeader'
import marker1 from '../xinyi.json'
export default {
  name: 'Flowershop',
  data () {
    return {
      showUserRouter: false,
      showRouter: true,
      map: null,
      places: [],
      // 預設經緯度在信義區附近
      lat: 52.249839,
      lng: -7.137641
    }
  },
  components: {
    NavHeaderUser,
    NavHeader,
    NavFooter
  },
  mounted () {
    this.init()
    this.initMap()
    this.fetchMarker()
    this.setMarker()
  },
  methods: {
    fetchMarker () {
      this.places = marker1.places
      this.lat = marker1.center.lat
      this.lng = marker1.center.lng
    },
    init () {
      if (getCookie('username')) {
        this.showUserRouter = true
        this.showRouter = false
      } else {
        this.showRouter = true
        this.showUserRouter = false
      }
    },
    // 建立地圖
    initMap () {
      // 透過 Map 物件建構子建立新地圖 map 物件實例，並將地圖呈現在 id 為 map 的元素中
      // eslint-disable-next-line no-undef
      this.map = new google.maps.Map(document.getElementById('map'), {
        // 設定地圖的中心點經緯度位置
        center: { lat: this.lat, lng: this.lng },
        // 設定地圖縮放比例 0-20
        zoom: 15,
        // 限制使用者能縮放地圖的最大比例
        maxZoom: 20,
        // 限制使用者能縮放地圖的最小比例
        minZoom: 3,
        // 設定是否呈現右下角街景小人
        streetViewControl: false,
        // 設定是否讓使用者可以切換地圖樣式：一般、衛星圖等
        mapTypeControl: false
      })
    },
    // 建立地標
    setMarker () {
      // 為每間餐廳都建立地標、訊息視窗、事件監聽
      this.places.forEach(location => {
        console.log(location)
        // eslint-disable-next-line no-undef
        const marker = new google.maps.Marker({
          // 設定為該餐廳的座標
          position: { lat: location.lat, lng: location.lng },
          map: this.map,
          title: location.name
        })
        marker.setMap(this.map)
        // 建立訊息視窗
        // eslint-disable-next-line no-undef
        const infowindow = new google.maps.InfoWindow({
          content: `
          <div id="content">
            <p id="firstHeading" class="firstHeading">${location.name}</p>
          </div>
        `,
          maxWidth: 200
        })
        // 綁定點擊事件監聽
        marker.addListener('click', () => {
          infowindow.open(this.map, marker)
        })
      })
    }
  }
}

</script>
