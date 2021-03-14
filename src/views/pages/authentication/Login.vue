<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />
        <h2 class="brand-text text-primary">
          舰队 OA 系统
        </h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
          lg="8"
          class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
              fluid
              :src="imgUrl"
              alt="Login V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col
          lg="4"
          class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
            sm="8"
            md="6"
            lg="12"
            class="px-xl-2 mx-auto"
        >
          <b-card-title
              class="mb-1 font-weight-bold"
              title-tag="h2"
          >
            XX 舰欢迎您! 👋
          </b-card-title>

          <b-alert
              variant="primary"
              show
          >
            <div class="alert-body font-small-2">
              <p>
                <small class="mr-50"><span class="font-weight-bold">管理: </span>15695293608 | admin</small>
              </p>
              <p>
                <small class="mr-50"><span class="font-weight-bold">用户: </span>15651008277 | user</small>
              </p>
            </div>
            <feather-icon
                v-b-tooltip.hover.left="'测试账号'"
                icon="HelpCircleIcon"
                size="18"
                class="position-absolute"
                style="top: 10; right: 10;"
            />
          </b-alert>

          <!-- form -->
          <validation-observer
              ref="loginForm"
              #default="{invalid}"
          >
            <b-form
                class="auth-login-form mt-2"
                @submit.prevent="login"
            >
              <!-- Phone -->
              <b-form-group
                  label="手机"
                  label-for="login-phone"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Phone"
                    vid="phone"
                    rules="required|phone"
                >
                  <b-form-input
                      id="login-phone"
                      v-model="userPhone"
                      :state="errors.length > 0 ? false:null"
                      name="login-phone"
                      placeholder="请输入您的手机号码"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">密码</label>
                </div>
                <validation-provider
                    #default="{ errors }"
                    name="Password"
                    vid="password"
                    rules="required"
                >
                  <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                        id="login-password"
                        v-model="userPassword"
                        :state="errors.length > 0 ? false:null"
                        class="form-control-merge"
                        :type="passwordFieldType"
                        name="login-password"
                        placeholder="请输入您的登录密码"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                          class="cursor-pointer"
                          :icon="passwordToggleIcon"
                          @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <br>

              <!-- submit buttons -->
              <b-button
                  type="submit"
                  variant="primary"
                  block
                  :disabled="invalid"
              >
                登 录
              </b-button>
            </b-form>
          </validation-observer>

        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BCardTitle,
  BImg,
  BForm,
  BButton,
  BAlert,
  VBTooltip,
} from 'bootstrap-vue'
import axiosIns from '@/libs/axios'
import { required, phone } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BAlert,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data () {
    return {
      status: '',
      userPhone: '15695293608',
      userPassword: 'admin',
      sideImg: require('@/assets/images/pages/login-v2.svg'),

      // validation rules
      required,
      phone,

      axiosIns,
    }
  },
  computed: {
    passwordToggleIcon () {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl () {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    login () {
      const that = this
      this.$refs.loginForm.validate()
      .then(success => {
        if (success) {
          that.axiosIns.post('/user/login', {
            userPhone: that.userPhone,
            userPassword: that.userPassword,
          })
          .then(res => {
            const statusCode = res.data.status.code

            if (statusCode === '0000') {
              const userData = res.data.data

              localStorage.setItem('userData', JSON.stringify(userData))

              that.$router.replace(getHomeRouteForLoggedInUser(userData.userRole))
              .then(() => {
                that.$toast({
                  component: ToastificationContent,
                  props: {
                    title: `欢迎 ${userData.userName}`,
                    icon: 'CoffeeIcon',
                    variant: 'success',
                    text: `${userData.userRole} 登录成功!`,
                  }
                })
              })
            } else {
              that.$toast({
                    component: ToastificationContent,
                    props: {
                      title: res.data.status.msg,
                      icon: 'DeleteIcon',
                      variant: 'warning',
                    }
                  },
                  { position: 'bottom-right' }
              )
            }
          })
          .catch(err => {
            that.$toast({
                  component: ToastificationContent,
                  props: {
                    title: '错误',
                    icon: 'DeleteIcon',
                    variant: 'danger',
                  }
                },
                { position: 'bottom-right' }
            )
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
