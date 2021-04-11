<template>
  <b-card>
    <!-- form -->
    <b-form>
      <b-row>
        <!-- old password -->
        <b-col md="6">
          <b-form-group
              label="旧密码"
              label-for="account-old-password"
          >
            <b-input-group class="input-group-merge">
              <b-form-input
                  id="account-old-password"
                  v-model="passwordValueOld"
                  name="old-password"
                  :type="passwordFieldTypeOld"
                  placeholder="请输入您的旧密码"
              />
              <b-input-group-append is-text>
                <feather-icon
                    :icon="passwordToggleIconOld"
                    class="cursor-pointer"
                    @click="togglePasswordOld"
                />
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <!--/ old password -->
      </b-row>
      <b-row>
        <!-- new password -->
        <b-col md="6">
          <b-form-group
              label-for="account-new-password"
              label="新密码"
          >
            <b-input-group class="input-group-merge">
              <b-form-input
                  id="account-new-password"
                  v-model="newPasswordValue"
                  :type="passwordFieldTypeNew"
                  name="new-password"
                  placeholder="请输入您的新密码"
              />
              <b-input-group-append is-text>
                <feather-icon
                    :icon="passwordToggleIconNew"
                    class="cursor-pointer"
                    @click="togglePasswordNew"
                />
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <!--/ new password -->

        <!-- retype password -->
        <b-col md="6">
          <b-form-group
              label-for="account-retype-new-password"
              label="确认新密码"
          >
            <b-input-group class="input-group-merge">
              <b-form-input
                  id="account-retype-new-password"
                  v-model="RetypePassword"
                  :type="passwordFieldTypeRetype"
                  name="retype-password"
                  placeholder="请确认您的新密码"
              />
              <b-input-group-append is-text>
                <feather-icon
                    :icon="passwordToggleIconRetype"
                    class="cursor-pointer"
                    @click="togglePasswordRetype"
                />
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <!--/ retype password -->

        <!-- buttons -->
        <b-col cols="12">
          <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mt-1 mr-1"
              @click="editPassword"
          >
            确认
          </b-button>
          <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="reset"
              variant="outline-secondary"
              class="mt-1"
          >
            重置
          </b-button>
        </b-col>
        <!--/ buttons -->
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BInputGroup,
    BInputGroupAppend
  },
  directives: {
    Ripple
  },
  data () {
    return {
      passwordValueOld: '',
      newPasswordValue: '',
      RetypePassword: '',
      passwordFieldTypeOld: 'password',
      passwordFieldTypeNew: 'password',
      passwordFieldTypeRetype: 'password'
    }
  },
  computed: {
    passwordToggleIconOld () {
      return this.passwordFieldTypeOld === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordToggleIconNew () {
      return this.passwordFieldTypeNew === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordToggleIconRetype () {
      return this.passwordFieldTypeRetype === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    }
  },
  methods: {
    togglePasswordOld () {
      this.passwordFieldTypeOld = this.passwordFieldTypeOld === 'password' ? 'text' : 'password'
    },
    togglePasswordNew () {
      this.passwordFieldTypeNew = this.passwordFieldTypeNew === 'password' ? 'text' : 'password'
    },
    togglePasswordRetype () {
      this.passwordFieldTypeRetype = this.passwordFieldTypeRetype === 'password' ? 'text' : 'password'
    },
    editPassword () {
      const that = this

      if (this.newPasswordValue !== this.RetypePassword) {
        this.$toast({
              component: ToastificationContent,
              props: {
                title: '两次输入的密码不一致',
                icon: 'DeleteIcon',
                variant: 'warning'
              }
            },
            { position: 'bottom-right' }
        )

        return
      }

      that.axiosIns.post('/user/editPassword', {
        userId: JSON.parse(localStorage.getItem('userData')).userId,
        oldPassword: that.passwordValueOld,
        newPassword: that.newPasswordValue
      })
      .then(res => {
        const statusCode = res.data.status.code

        if (statusCode === '0000') {
          that.$toast({
            component: ToastificationContent,
            props: {
              title: '已成功修改密码',
              icon: 'CoffeeIcon',
              variant: 'success',
            }
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
  }
}
</script>
