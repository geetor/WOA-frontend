<template>
  <div style="height: inherit">
    <div
      class="body-content-overlay"
      :class="{'show': mqShallShowLeftSidebar}"
      @click="mqShallShowLeftSidebar = false"
    />

    <!-- Attendance List -->
    <div class="attendance-list">
      <!-- App Searchbar Header -->
      <div class="app-fixed-search d-flex align-items-center">

        <!-- Toggler -->
        <div class="sidebar-toggle d-block d-lg-none ml-1">
          <feather-icon
              icon="MenuIcon"
              size="21"
              class="cursor-pointer"
              @click="mqShallShowLeftSidebar = true"
          />
        </div>

        <!-- Searchbar -->
        <div class="d-flex align-content-center justify-content-between w-100">
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon
                  icon="SearchIcon"
                  class="text-muted"
              />
            </b-input-group-prepend>
            <b-form-input
                :value="searchQuery"
                placeholder="搜索部门人员"
                @input="updateRouteQuery"
            />
          </b-input-group>
        </div>
      </div>

      <!-- App Action Bar -->
      <div class="app-action">
        <div class="action-left">
          <b-form-checkbox
              :checked="selectAllDeptUsers"
              :indeterminate="isSelectAllDeptUsersIndeterminate"
              @change="selectAllDeptUsersUpdate"
          >
            全选
          </b-form-checkbox>
        </div>
        <div
            v-show="selectedUsers.length"
            class="align-items-center"
            :class="{'d-flex': selectedUsers.length}"
        >

          <!-- Update Dept Dropdown -->
          <b-dropdown
              variant="link"
              no-caret
              toggle-class="p-0"
              right
          >
            <template #button-content>
              <feather-icon
                  icon="FolderIcon"
                  size="17"
                  class="align-middle text-body"
              />
            </template>

            <b-dropdown-item
                v-for="department in departments"
                :key="department.title + $route.path"
                @click="moveSelectedUsersToDept(department.title)">
              <feather-icon icon="AnchorIcon" />
              <span class="align-middle ml-50">{{department.title}}</span>
            </b-dropdown-item>
          </b-dropdown>

        </div>
      </div>

      <!-- Users List -->
      <vue-perfect-scrollbar
          :settings="perfectScrollbarSettings"
          class="email-user-list scroll-area"
      >
        <ul class="attendance-media-list">
          <b-media
              v-for="user in users"
              :key="user.userId"
              tag="li"
              no-body
          >

            <b-media-body>
              <div class="attendance-details">
                <div class="attendance-items">
                  <h5 class="mb-25">
                    {{ user.userName }}
                  </h5>
                  <span class="text-truncate">{{ user.userRank }}</span>
                </div>
                <div class="mail-meta-item">
                  <span
                      v-for="rank in user.userRank"
                      :key="rank"
                      class="mx-50 bullet bullet-sm"
                      :class="`bullet-${resolveLabelColor(rank)}`"
                  />
                </div>
              </div>

              <div class="mail-message">
                <p class="text-truncate mb-0">
                  {{ filterTags(email.message) }}
                </p>
              </div>
            </b-media-body>
          </b-media>
        </ul>
        <div
            class="no-results"
            :class="{'show': !users.length}"
        >
          <h5>No Items Found</h5>
        </div>
      </vue-perfect-scrollbar>
    </div>

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <attendance-left-sidebar
        :shall-show-attendance-compose-modal.sync="shallShowAttendanceComposeModal"
        :attendances-meta="attendancesMeta"
        :class="{'show': mqShallShowLeftSidebar}"
        @close-left-sidebar="mqShallShowLeftSidebar = false"
      />
    </portal>

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
import AttendanceLeftSidebar from './AttendanceLeftSidebar.vue'
import useAttendance from './useAttendance'

export default {
  components: {
    // App SFC
    AttendanceLeftSidebar,
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

    // Attendances & AttendancesMeta
    const attendances = ref([])
    const attendancesMeta = ref({})

    // Compose
    const shallShowAttendanceComposeModal = ref(false)

    // Left Sidebar Responsiveness
    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()

    return {

      // Attendances & AttendancesMeta
      attendances,
      attendancesMeta,

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
