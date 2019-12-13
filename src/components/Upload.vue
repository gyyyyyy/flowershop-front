<template>
  <div>

    <Form :model="formItem" ref="formItem" :rules="ruleInline" :label-width="100" lable-position="left">

      <FormItem label="标签名称 : " prop="fc_name">
        <Input v-model="formItem.fc_name" size="large" placeholder="请输入标签名称" class="input_width" />
      </FormItem>

      <FormItem label="问题描述 : " prop="fc_desc">
        <Input v-model="formItem.fc_desc" type="textarea" :rows="4" style="width:400px;"
               placeholder="请输入问题描述" />
      </FormItem>

      <FormItem label="论坛分类logo : ">
        <div class="uploadBox" prop="fc_icon">
          <input type="file" @change="doUpload" ref="inputFile"/>
          <Icon type="ios-plus-empty" class="uploadIcon"></Icon>

          <div class="imagePreview" v-show="categoryLogoIsShow">
            <img :src="formItem.fc_icon" @click="$refs.inputFile.click()"/>
          </div>
        </div>
        <div v-show="categoryLogoIsShow" style="text-align: left;">
          <Icon type="information-circled"></Icon>
          可点击图片重新选择
        </div>

      </FormItem>

      <FormItem>
        <Button type="primary" size="large" :loading="submit_loading" @click="submit('formItem')">提交</Button>
        <Button type="error" size="large" @click="handleDelete" style="margin-left: 8px;">删除</Button>
      </FormItem>

    </Form>

    <Modal v-model="deleteModel" width="260">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>删除后数据不可恢复,确定要这么做吗?</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="delete_loading" @click="deleteForum">确定删除</Button>
      </div>
    </Modal>

  </div>
</template>
<script type="text/ecmascript-6">

export default {
  mounted () {
    this.getForumData()
  },
  methods: {

    /**
       * 删除论坛分类数据
       */

    deleteForum () {
      this.delete_loading = true

      var url = this.ServerIp + this.API.forumDeleteCategory
      var that = this

      var params = {}
      params.fc_id = this.$route.query.fc_id

      this.$http({
        method: 'post',
        url: url,
        data: params
      }).then((res) => {
        this.delete_loading = false
        this.deleteModel = false

        if (res.data.success) {
          that.$router.go(-1)
        } else {
          that.$Message.error(res.data.result)
        }
      })
    },

    /**
       * 图片上传
       */
    doUpload (files) {
      var that = this
      this.uploadOneImage(files, function (err, data) {
        if (err) {
          that.formItem.fc_icon = data.url
          that.organizationLogoIsShow = true
        } else {
          alert('图片上传失败')
        }
      })
    },
    handleDelete () {
      this.deleteModel = true
    },

    /**
       * 提交数据
       */
    submit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          var url = this.ServerIp + this.API.forumUpdateCategory
          var that = this

          var params = {}
          params.fc_id = this.$route.query.fc_id
          params.fc_name = this.formItem.fc_name
          params.fc_desc = this.formItem.fc_desc
          params.fc_icon = this.formItem.fc_icon

          this.submit_loading = true
          this.$http({
            method: 'post',
            url: url,
            data: params
          }).then((res) => {
            this.submit_loading = false

            if (res.data.success) {
              that.$Message.success('标签更新成功')
              that.$router.go(-1)
            } else {
              that.$Message.error(res.data.result)
            }
          })
        }
      })
    },

    /**
       * 获取数据
       */
    getForumData () {
      var url = this.ServerIp + this.API.forumsSearchCategory + '/fc_id/' + this.$route.query.fc_id
      var that = this

      this.$Spin.show()
      this.$http({
        method: 'get',
        url: url
      }).then((res) => {
        this.$Spin.hide()
        if (res.data.success) {
          var forumData = res.data.result.data[0]
          that.formItem.fc_name = forumData.fc_name
          that.formItem.fc_desc = forumData.fc_desc
          that.formItem.fc_icon = forumData.fc_icon
          if (that.formItem.fc_name != null && that.formItem.fc_name) {
            that.categoryLogoIsShow = true
          } else {
            that.categoryLogoIsShow = false
          }
        }
      })
    }

  },
  data () {
    return {
      deleteModel: false,
      submit_loading: false,
      delete_loading: false,
      formItem: {
        fc_name: '',
        fc_icon: '',
        fc_order: '',
        fc_desc: '',
        fc_article_count: '',
        fc_concern_count: ''
      },
      data: [],
      categoryLogoIsShow: false,
      ruleInline: {
        fc_name: [
          {required: true, message: '论坛分类标题不能为空', trigger: 'blur'}
        ],
        fc_icon: [
          {required: true, message: '论坛分类logo不能为空', trigger: 'blur'}
        ],
        fc_desc: [
          {required: true, message: '论坛分类描述不能为空', trigger: 'blur'}
        ]
      }
    }
  }
}

</script>
