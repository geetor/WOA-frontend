<template>
  <b-tabs
    vertical
    content-class="col-12 col-md-9 mt-1 mt-md-0"
    pills
    nav-wrapper-class="col-md-2 col-12"
    nav-class="nav-left"
  >

    <!-- general tab -->
    <b-tab active>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="UserIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">账号资料</span>
      </template>

      <account-setting-general
        v-if="options.general"
        :general-data="options.general"
      />
    </b-tab>
    <!--/ general tab -->

    <!-- change password tab -->
    <b-tab>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="LockIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">修改密码</span>
      </template>

      <account-setting-password />
    </b-tab>
    <!--/ change password tab -->

    <!-- info -->
    <b-tab>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="InfoIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">个人信息</span>
      </template>

      <account-setting-information
        v-if="options.info"
        :information-data="options.info"
      />
    </b-tab>

  </b-tabs>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'
import AccountSettingGeneral from './AccountSettingGeneral.vue'
import AccountSettingPassword from './AccountSettingPassword.vue'
import AccountSettingInformation from './AccountSettingInformation.vue'

export default {
  components: {
    BTabs,
    BTab,
    AccountSettingGeneral,
    AccountSettingPassword,
    AccountSettingInformation,
  },
  data() {
    return {
      options: {},
    }
  },
  beforeCreate() {
    this.$http.get('/account-setting/data').then(res => { this.options = res.data })
  },
}
</script>
