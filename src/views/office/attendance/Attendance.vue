<template>
  <div style="height: inherit">
    <div
        class="body-content-overlay"
        :class="{ show: mqShallShowLeftSidebar }"
        @click="mqShallShowLeftSidebar = false"
    />
    <!-- user-list -->
    <div class="attendance-list">
      <vue-perfect-scrollbar
          :settings="perfectScrollbarSettings"
          class="attendance-user-list scroll-area"
      >
        <user-list
            ref="refUserList"
            :mq-shall-show-left-sidebar.sync="mqShallShowLeftSidebar"
        />
      </vue-perfect-scrollbar>
    </div>

    <!-- Leave Handler -->
    <leave-handler-sidebar
        v-model="isLeaveHandlerSidebarActive"
        :leave="leave"
        :clear-leave-data="clearLeaveData"
        @ask-for-leave="askForLeave"
    />

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <department-list
          :shall-show-attendance-compose-modal.sync="shallShowAttendanceComposeModal"
          :is-leave-handler-sidebar-active.sync="isLeaveHandlerSidebarActive"
          :departments="departments"
          :users-meta="usersMeta"
          :class="{ show: mqShallShowLeftSidebar }"
          :refetch-user-list="refetchUserList"
          @close-left-sidebar="mqShallShowLeftSidebar = false"
      />
    </portal>
  </div>
</template>

<script>
import { onUnmounted, ref } from '@vue/composition-api'
import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
import DepartmentList from './DepartmentList.vue'
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
import LeaveHandlerSidebar from '@/views/office/attendance/LeaveHandlerSidebar'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export default {
  components: {
    LeaveHandlerSidebar,
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
    DepartmentList,
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

    const isLeaveHandlerSidebarActive = ref(false)
    const toast = useToast()
    const refUserList = ref(null)
    const refetchUserList = () => {
      refUserList.value.refetchData()
    }

    const blankLeave = {
      leaveType: '',
      startTime: new Date(),
      dueTime: new Date(),
      reason: ''
    }
    const leave = ref(JSON.parse(JSON.stringify(blankLeave)))
    const clearLeaveData = () => {
      leave.value = JSON.parse(JSON.stringify(blankLeave))
    }

    const askForLeave = val => {
      store.dispatch('office-attendance/askForLeave', val)
      .then((response) => {
        if (response.status === 201) {
          toast({
            component: ToastificationContent,
            props: {
              title: `请假成功`,
              icon: 'CoffeeIcon',
              variant: 'success'
            }
          })
          refetchUserList()
        } else {
          toast({
                component: ToastificationContent,
                props: {
                  title: '错误',
                  icon: 'AlertTriangleIcon',
                  variant: 'danger'
                }
              },
              { position: 'bottom-right' })
        }
      })
    }

    // Departments & UsersMeta
    const departments = ref([])
    const usersMeta = ref({})

    const perfectScrollbarSettings = {
      maxScrollbarLength: 150
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
      leave,
      askForLeave,
      clearLeaveData,

      refUserList,
      refetchUserList,

      // UI
      perfectScrollbarSettings,
      isLeaveHandlerSidebarActive,

      // Departments & UsersMeta
      departments,
      usersMeta,

      // Compose
      shallShowAttendanceComposeModal,

      // Left Sidebar Responsiveness
      mqShallShowLeftSidebar
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<style lang="scss">
@import "~@core/scss/base/pages/office-attendance.scss";
</style>
