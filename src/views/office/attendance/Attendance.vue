<template>
  <div style="height: inherit">
    <div
      class="body-content-overlay"
      :class="{'show': mqShallShowLeftSidebar}"
      @click="mqShallShowLeftSidebar = false"
    />

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <attendance-left-sidebar
        :shall-show-attendance-compose-modal.sync="shallShowAttendanceComposeModal"
        :class="{'show': mqShallShowLeftSidebar}"
        @close-left-sidebar="mqShallShowLeftSidebar = false"
      />
    </portal>

    <!-- Compose Email Modal -->
    <attendance-compose v-model="shallShowAttendanceComposeModal" />
  </div>
</template>

<script>
import store from '@/store'
import {
  ref, onUnmounted,
  // ref, watch, computed, onUnmounted,
} from '@vue/composition-api'

import { filterTags, formatDateToMonthShort } from '@core/utils/filter'
import { useRouter } from '@core/utils/utils'
import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
import useAttendance from './useAttendance'

export default {
  components: {

  },
  setup() {
    const ATTENDANCE_STORE_MODULE_NAME = 'office-attendance'

    // Register module
    // eslint-disable-next-line no-undef
    if (!store.hasModule(ATTENDANCE_STORE_MODULE_NAME)) store.registerModule(ATTENDANCE_STORE_MODULE_NAME, attendanceStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(ATTENDANCE_STORE_MODULE_NAME)) store.unregisterModule(ATTENDANCE_STORE_MODULE_NAME)
    })

    // eslint-disable-next-line no-unused-vars
    const { route, router } = useRouter()
    const { resolveLabelColor } = useAttendance()

    // Compose
    const shallShowAttendanceComposeModal = ref(false)

    // Left Sidebar Responsiveness
    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()

    return {

      // UI Filters
      filterTags,
      formatDateToMonthShort,

      // useAttendance
      resolveLabelColor,

      // Compose
      shallShowAttendanceComposeModal,

      // Left Sidebar Responsiveness
      mqShallShowLeftSidebar,
    }
  },
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
@import "~@core/scss/base/pages/office-attendance.scss";
</style>
