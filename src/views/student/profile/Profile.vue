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
              <el-form-item prop="nameMask">
                <el-input ref="nameMask" v-model="form.nameMask"></el-input>
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
              <el-form-item prop="phoneNumberMask">
                <el-input ref="phoneNumberMask" v-model="form.phoneNumberMask"></el-input>
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
              <el-form-item prop="addressMask">
                <el-input ref="addressMask" v-model="form.addressMask"></el-input>
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
              <el-form-item prop="studentIdMask">
                <el-input ref="studentIdMask" v-model="form.studentIdMask"></el-input>
              </el-form-item>
            </span>
            <span v-else>
              {{ studentId }}
            </span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              邮箱
            </template>
            <span v-if="edit">
              <el-form-item prop="emailMask">
                <el-input ref="emailMask" v-model="form.emailMask"></el-input>
              </el-form-item>
            </span>
            <span v-else>
              {{ email }}
            </span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-s-custom"></i>
              班级
            </template><span v-if="edit">
              <el-form-item prop="classNameMask">
                <el-input ref="classNameMask" v-model="form.classNameMask"></el-input>
              </el-form-item>
            </span>
            <span v-else>
              {{ className }}
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
          <img v-if="!progressFlag" class="head-img" :src="imgUrl" alt="" />
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
import {uploadImage, uploadInfo} from "@/api/userInfoUpload";
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
        this.form.nameMask = ""
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
        this.form.phoneNumberMask = "";
        return false;
      }
      let zg = /^[0-9]*$/;
      if (!zg.test(phoneNumber)) {
        callback(new Error("手机号只能由数字组成"));
        this.form.phoneNumberMask = "";
      }
      callback()
    }

    let validateStudentId = (rule, value, callback) => {
      if (value === "")
        return false;
      let studentId = value.toString().replace(/\s/g, "")
      if (studentId.length !== 8) {
        callback(new Error("学号长度为8位，不能包含空格"));
        this.form.studentIdMask = "";
        return false;
      }
      let zg = /^[0-9]*$/;
      if (!zg.test(studentId)) {
        callback(new Error("学号只能由数字组成"));
        this.form.studentIdMask = "";
      }
      callback()
    }

    let validateEmail = (rule, value, callback) => {
      if (value === "")
        return false;
      let zg = /^([a-zA-Z]|[0-9])(\w|)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if (!zg.test(value)) {
        callback(new Error("请输入正确的邮箱格式"))
        this.form.emailMask = ""
      }
      callback()
    }
    return {
      form: {
        nameMask: null,
        studentIdMask: null,
        phoneNumberMask: null,
        addressMask: null,
        emailMask: null,
        classNameMask: null,
        imgUrlMask: null,
      },
      rules: {
        nameMask: [{ required: true, trigger: 'blur', validator: validateName }],
        studentIdMask: [{ required: true, trigger: 'blur', validator: validateStudentId }],
        phoneNumberMask: [{ required: true, trigger: 'blur', validator: validatePhoneNumber }],
        emailMask: [{ required: true, trigger: 'blur', validator: validateEmail }],
      },
      size: '',
      progressFlag: false,
      progressPercent: 0,
      edit: false,
      buttonContent: '编辑',
      btnLoad: false
    }
  },
  computed: {
    columns() {
      return this.$store.getters.device === 'desktop' ? 2 : 1
    },
    ...mapGetters([
      'name',
      'studentId',
      'phoneNumber',
      'address',
      'email',
      'className',
      'imgUrl'
    ]),
  },
  created() {
    this.dataInit()
  },
  methods: {
    dataInit() {
      this.form.nameMask = this.$store.getters.name
      this.form.studentIdMask = this.$store.getters.studentId
      this.form.phoneNumberMask = this.$store.getters.phoneNumber
      this.form.addressMask = this.$store.getters.address
      this.form.emailMask = this.$store.getters.email
      this.form.classNameMask = this.$store.getters.className
      this.form.imgUrlMask = this.$store.getters.imgUrl
    },
    uploadImg (f) {
      this.progressFlag = true
      let formData = new FormData()
      formData.append('image', f.file)
      uploadImage(formData)
        .then(async res => {
          this.imgUrl = res.data.imgUrl
          if (this.progressPercent === 100) {
            this.progressFlag = false
            this.progressPercent = 0
            // 重新获取信息
            await this.$store.dispatch('user/getInfo')
          }
        })
        .catch(error => {
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
          uploadInfo(this.form)
            .then(async () => {
              // 重新获取信息
              await this.$store.dispatch('user/getInfo')
              this.btnLoad = false
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
