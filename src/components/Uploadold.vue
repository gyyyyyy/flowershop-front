<template>
  <div id="app" class="m-5">
    <div class="dropbox p-3">
      <h2 v-if="files.length===0" class="text-center">把要上传的文件拖动到这里</h2>
      <div class="border m-2 d-inline-block p-4" style="width:15rem" v-for="file in files" :key="file">
        <h5 class="mt-0">{{ file.name }}</h5>
        <div class="progress">
          <div class="progress-bar progress-bar-striped"
               :style="{ width: file.uploadPercentage+'%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      files: []
    }
  },
  // created () {
  //   this.goodsList = this.loadgoods()
  // },
  mounted () {
    var dropbox = document.querySelector('.dropbox')
    dropbox.addEventListener('dragenter', this.onDrag, false)
    dropbox.addEventListener('dragover', this.onDrag, false)
    dropbox.addEventListener('drop', this.onDrop, false)
  },
  components: {

  },
  methods: {
    uploadFile: function (file) {
      var item = {
        name: file.name,
        uploadPercentage: 0
      }
      this.files.push(item)
      var fd = new FormData()
      fd.append('myFile', file)

      var xhr = new XMLHttpRequest()
      xhr.open('POST', 'upload.php', true)
      xhr.upload.addEventListener('progress', function (e) {
        item.uploadPercentage = Math.round((e.loaded * 100) / e.total)
      }, false)
      xhr.send(fd)
    },
    onDrag: function (e) {
      e.stopPropagation()
      e.preventDefault()
    },
    onDrop: function (e) {
      e.stopPropagation()
      e.preventDefault()
      var dt = e.dataTransfer
      for (var i = 0; i !== dt.files.length; i++) {
        this.uploadFile(dt.files[i])
      }
    }
  }
}
</script>

<style>
  .dropbox {
    border: .25rem dashed #007bff;
    min-height: 5rem;
  }
</style>
