<template>
  <b-nav-item-dropdown
      right
      toggle-class="d-flex align-items-center dropdown-user-link"
      class="dropdown-user"
  >
    <template #button-content>
      <div class="d-sm-flex d-none user-nav">
        <p class="user-name font-weight-bolder mb-0">
          {{ userData.userName }}
        </p>
        <span class="user-status">{{ userData.userRole }}</span>
      </div>
      <b-avatar
          size="40"
          :src="userData.userPhoto"
          variant="light-primary"
          badge
          class="badge-minimal"
          badge-variant="success"
      >
        <feather-icon
            v-if="!userData.userName"
            icon="UserIcon"
            size="22"
        />
      </b-avatar>
    </template>

    <b-dropdown-item
        :to="{ name: 'pages-account-setting' }"
        link-class="d-flex align-items-center"
    >
      <feather-icon
          size="16"
          icon="SettingsIcon"
          class="mr-50"
      />
      <span>修改密码</span>
    </b-dropdown-item>

    <b-dropdown-divider/>

    <b-dropdown-item
        link-class="d-flex align-items-center"
        @click="logout"
    >
      <feather-icon
          size="16"
          icon="LogOutIcon"
          class="mr-50"
      />
      <span>注销账号</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
  },
  data () {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      avatarText,
    }
  },
  methods: {
    logout () {
      // Remove userData from localStorage
      localStorage.removeItem('userData')

      // Redirect to login page
      this.$router.push({ name: 'auth-login' })
    },
  },
}
</script>
