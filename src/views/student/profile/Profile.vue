<template>
  <div>
    <el-card>
      <el-form ref="form" :model="form" :rules="rules">
        <el-descriptions class="descriptions" title="用户信息" :column="columns" :size="size" border>
          <template slot="extra">
            <el-button type="primary" size="small" @click="handleClick">{{ buttonContent }}</el-button>
          </template>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              用户名
            </template>
            <span v-if="edit">
              <el-form-item prop="name">
                <el-input ref="name" v-model="form.name"></el-input>
              </el-form-item>
            </span>
            <span v-else>
              {{ name }}
            </span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              手机号
            </template>
            <span v-if="edit">
              <el-form-item prop="phoneNumber">
                <el-input ref="phoneNumber" v-model="form.phoneNumber"></el-input>
              </el-form-item>
            </span>
            <span v-else>
              {{ phoneNumber }}
            </span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              居住地
            </template>
            <span v-if="edit">
              <el-form-item prop="address">
                <el-input ref="address" v-model="form.address"></el-input>
              </el-form-item>
            </span>
            <span v-else>
              {{ address }}
            </span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              学号
            </template>
            <span v-if="edit">
              <el-form-item prop="userId">
                <el-input ref="userId" v-model="form.userId"></el-input>
              </el-form-item>
            </span>
            <span v-else>
              {{ userId }}
            </span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              邮箱
            </template>
            <span v-if="edit">
              <el-form-item prop="email">
                <el-input ref="email" v-model="form.email"></el-input>
              </el-form-item>
            </span>
            <span v-else>
              {{ email }}
            </span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-s-custom"></i>
              性别
            </template><span v-if="edit">
              <el-form-item prop="sex">
                <el-input ref="sex" v-model="form.sex"></el-input>
              </el-form-item>
            </span>
            <span v-else>
              {{ sex }}
            </span>
          </el-descriptions-item>
        </el-descriptions>
      </el-form>

      <div style="text-align:center; margin: 10px;">
        <el-button
          :disabled="!edit"
          :loading="btnLoad"
          @click="submitForm"
        >
          提交
        </el-button>
      </div>
    </el-card>
    <el-card>
      <div>
        <section style="text-align: center; display: block">
          <img v-if="!progressFlag" class="head-img" :src="image" alt="" />
          <div v-show="progressFlag" class="head-img">
            <el-progress :width="500" type="circle" :percentage="progressPercent"></el-progress>
          </div>
          <el-upload action="#"
                     :show-file-list="false" :before-upload="beforeAvatarUpload"
                     :http-request="uploadImg"
          >
            <el-button type="success" plain round size="big">更改头像</el-button>
          </el-upload>
        </section>
      </div>
    </el-card>
  </div>
</template>

<script>
import {updateImage, updateInfo} from "@/api/user";
import {mapGetters} from "vuex";

export default {
  name: "Profile",
  data() {
    let validateName = (rule, value, callback) => {
      if (value === "") {
        return false
      }
      let zg = /\s/g
      let newValue = value.toString().replace(/\s/g, "")
      if (value.length !== newValue.length) {
        this.form.name = ""
        callback(new Error("用户名不能包含空格"))
        return false
      }
      callback()
    }

    let validatePhoneNumber = (rule, value, callback) => {
      if (value === "")
        return false;
      let phoneNumber = value.toString().replace(/\s/g, "")
      if (phoneNumber.length !== 11) {
        callback(new Error("手机号长度为11位，不能包含空格"));
        this.form.phoneNumber = "";
        return false;
      }
      let zg = /^[0-9]*$/;
      if (!zg.test(phoneNumber)) {
        callback(new Error("手机号只能由数字组成"));
        this.form.phoneNumber = "";
      }
      callback()
    }

    let validateUserId = (rule, value, callback) => {
      if (value === "")
        return false;
      let userId = value.toString().replace(/\s/g, "")
      if (userId.length !== 8) {
        callback(new Error("学号长度为8位，不能包含空格"));
        this.form.userId = "";
        return false;
      }
      let zg = /^[0-9]*$/;
      if (!zg.test(userId)) {
        callback(new Error("学号只能由数字组成"));
        this.form.userId = "";
      }
      callback()
    }

    let validateEmail = (rule, value, callback) => {
      if (value === "")
        return false;
      let zg = /^([a-zA-Z]|[0-9])(\w|)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if (!zg.test(value)) {
        callback(new Error("请输入正确的邮箱格式"))
        this.form.email = ""
      }
      callback()
    }
    return {
      form: {
        name: null,
        userId: null,
        phoneNumber: null,
        address: null,
        email: null,
        sex: null,
        image: null,
      },
      rules: {
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        userId: [{ required: true, trigger: 'blur', validator: validateUserId }],
        phoneNumber: [{ required: true, trigger: 'blur', validator: validatePhoneNumber }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
      },
      size: '',
      progressFlag: false,
      progressPercent: 0,
      edit: false,
      buttonContent: '编辑',
      btnLoad: false,
      onUploadProgress: progressEvent => {
        // progressEvent.loaded:已上传文件大小
        // progressEvent.total:被上传文件的总大小
        this.progressPercent = (progressEvent.loaded / progressEvent.total * 100)
      }
    }
  },
  computed: {
    columns() {
      return this.$store.getters.device === 'desktop' ? 2 : 1
    },
    ...mapGetters([
      'name',
      'userId',
      'phoneNumber',
      'address',
      'email',
      'image',
      'sex'
    ]),
  },
  created() {
    this.dataInit()
  },
  methods: {
    dataInit() {
      this.form.name = this.$store.getters.name
      this.form.userId = this.$store.getters.userId
      this.form.phoneNumber = this.$store.getters.phoneNumber
      this.form.address = this.$store.getters.address
      this.form.email = this.$store.getters.email
      this.form.sex = this.$store.getters.sex
      this.form.image = this.$store.getters.image
    },
    uploadImg (f) {
      this.progressFlag = true
      let formData = new window.FormData()
      formData.append('picture', f.file)
      updateImage(formData, this.onUploadProgress)
        .then(res => {
          if (this.progressPercent === 100) {
            this.$message.success('提交成功')
            this.progressFlag = false
            this.progressPercent = 0
            // 重新获取信息
            this.$store.dispatch('user/getInfo')
          }
        })
        .catch(error => {
          this.$message.error('提交失败')
          console.log(error)
        })
      },
    // 上传图片前的过滤
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/png'
      const isLt5M = (file.size / 1024 / 1024) < 5

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 PNG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt5M
    },
    handleClick() {
      this.dataInit()
      if (this.edit === false) {
        this.buttonContent = '查看'
        this.edit = true
      } else {
        this.buttonContent = '编辑'
        this.edit = false
      }
      // store.dispatch('user/getInfo')
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        this.btnLoad = true
        if (valid) {
          updateInfo(this.form)
            .then(async (res) => {
              if (res.status === 100) {
                this.$message.success('提交成功')
                // 重新获取信息
                await this.$store.dispatch('user/getInfo')
                this.btnLoad = false
              } else {
                this.$message.error('提交失败')
              }
            })
            .catch(() => {
              this.btnLoad = false
            })
        } else {
          console.log('error submit!!')
          this.btnLoad = false
          return false
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
  /deep/ .el-input__inner {
    height: 30px !important;
    padding: 0 !important;
  }

  /deep/ .el-form-item__content {
    height: 28px !important;
    line-height: 28px !important;
  }

  /deep/ .el-form-item {
    margin-bottom: 10px;
  }

  @media only screen and (max-width: 560px) {
    .head-img {
      height: 200px;
    }
  }

  @media only screen and (min-width: 561px) and (max-width: 760px) {
    .head-img {
      height: 300px;
    }
  }

  @media only screen and (min-width: 761px) and (max-width: 1000px) {
    .head-img {
      height: 400px;
    }
  }

  @media only screen and (min-width: 1001px) {
    .head-img {
      height: 500px;
    }
  }
</style>
