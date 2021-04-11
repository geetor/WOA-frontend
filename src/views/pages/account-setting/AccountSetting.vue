<template>
  <b-tabs
      vertical
      content-class="col-12 col-md-9 mt-1 mt-md-0"
      pills
      nav-wrapper-class="col-md-2 col-12"
      nav-class="nav-left"
  >

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

      <account-setting-password/>
    </b-tab>
    <!--/ change password tab -->

  </b-tabs>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'
import AccountSettingPassword from './AccountSettingPassword.vue'

export default {
  components: {
    BTabs,
    BTab,
    AccountSettingPassword
  },
  data () {
    return {
      options: {}
    }
  }
}
</script>
