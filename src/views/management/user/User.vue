<template>
  <div style="height: inherit">
    <div
      class="body-content-overlay"
      :class="{'show': mqShallShowLeftSidebar }"
      @click="mqShallShowLeftSidebar = false"
    />

    <!--UserList-->
    <div class="training-list">
      <vue-perfect-scrollbar
        :settings="perfectScrollbarSettings"
        class="training-user-list scroll-area"
      >
        <user-list></user-list>
      </vue-perfect-scrollbar>
    </div>

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <user-manage-sidebar
          :shall-show-training-compose-modal="shallShowTrainingComposeModal"
          :departments="departments"
          :users-meta="usersMeta"
          :class="{'show': mqShallShowLeftSidebar}"
          @close-left-sidebar="mqShallShowLeftSidebar = false"
      />
    </portal>

  </div>
</template>

<script>
import { onUnmounted, ref } from '@vue/composition-api'
import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
import UserManageSidebar from './UserManageSidebar.vue'
import UserList from './UserList'
import {
  BDropdown,
  BDropdownItem,
  BFormCheckbox,
  BFormInput,
  BInputGroup,
  BInputGroupPrepend,
  BMedia,
  BMediaAside,
  BMediaBody,
  BBadge,
  BAvatar
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import store from '@/store'
import useStoreModule from './userStoreModule'

export default {
  components: {
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BDropdown,
    BDropdownItem,
    BFormCheckbox,
    BMedia,
    BMediaAside,
    BMediaBody,
    BBadge,
    BAvatar,

    // 3rd Party
    VuePerfectScrollbar,

    // App SFC
    UserManageSidebar,
    UserList
  },
  setup() {
    const USER_MANAGE_STORE_MODULE_NAME = 'manage-user'

    // Register module
    if (!store.hasModule(USER_MANAGE_STORE_MODULE_NAME)) store.registerModule(USER_MANAGE_STORE_MODULE_NAME, useStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_MANAGE_STORE_MODULE_NAME)) store.unregisterModule(USER_MANAGE_STORE_MODULE_NAME)
    })

    // Departments & UsersMeta
    const departments = ref([])
    const usersMeta = ref({})

    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }

    const fetchDepartments = () => {
      store.dispatch('manage-user/fetchDepartments')
        .then(response => {
          departments.value = response.data.departments
          usersMeta.value = response.data.usersMeta
        })
    }
    fetchDepartments()

    // Compose
    const shallShowTrainingComposeModal = ref(false)

    // Left Sidebar Responsiveness
    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()

    return {
      // UI
      perfectScrollbarSettings,

      // Departments & UsersMeta
      departments,
      usersMeta,

      // Compose
      shallShowTrainingComposeModal,

      // Left Sidebar Responsiveness
      mqShallShowLeftSidebar
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<style lang="scss">
@import "~@core/scss/base/pages/office-training.scss";
</style>
