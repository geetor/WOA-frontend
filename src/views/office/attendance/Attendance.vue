<template>
  <div style="height: inherit">

    <div
        class="body-content-overlay"
        :class="{'show': mqShallShowLeftSidebar}"
        @click="mqShallShowLeftSidebar = false"
    />

    <div class="attendance-list">
      <vue-perfect-scrollbar
          :settings="perfectScrollbarSettings"
          class="attendance-user-list scroll-area"
      >
          <user-list></user-list>
      </vue-perfect-scrollbar>

    </div>

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <attendance-left-sidebar
          :shall-show-attendance-compose-modal.sync="shallShowAttendanceComposeModal"
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
import AttendanceLeftSidebar from './AttendanceLeftSidebar.vue'
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
import attendanceStoreModule from '@/views/office/attendance/attendanceStoreModule'

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
    AttendanceLeftSidebar,
    UserList
  },
  setup () {
    const ATTENDANCE_STORE_MODULE_NAME = 'office-attendance'

    // Register module
    if (!store.hasModule(ATTENDANCE_STORE_MODULE_NAME)) store.registerModule(ATTENDANCE_STORE_MODULE_NAME, attendanceStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(ATTENDANCE_STORE_MODULE_NAME)) store.unregisterModule(ATTENDANCE_STORE_MODULE_NAME)
    })

    // Departments & UsersMeta
    const departments = ref([])
    const usersMeta = ref({})

    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }

    const fetchDepartments = () => {
      store.dispatch('office-attendance/fetchDepartments')
      .then(response => {
        departments.value = response.data.departments
        usersMeta.value = response.data.usersMeta
      })
    }
    fetchDepartments()

    // Compose
    const shallShowAttendanceComposeModal = ref(false)

    // Left Sidebar Responsiveness
    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()

    return {
      // UI
      perfectScrollbarSettings,

      // Departments & UsersMeta
      departments,
      usersMeta,

      // Compose
      shallShowAttendanceComposeModal,

      // Left Sidebar Responsiveness
      mqShallShowLeftSidebar,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
@import "~@core/scss/base/pages/office-attendance.scss";
</style>
