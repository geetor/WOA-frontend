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
              placeholder="搜索考勤信息"
              @input="updateRouteQuery"
            />
          </b-input-group>
        </div>
      </div>

      <!-- App Action Bar -->
      <div class="app-action">
        <div class="action-left">
          <b-form-checkbox
            :checked="selectAllAttendanceCheckbox"
            :indeterminate="isSelectAllAttendanceCheckboxIndeterminate"
            @change="selectAllCheckboxUpdate"
          >
            全选
          </b-form-checkbox>
        </div>
        <div
          v-show="selectedAttendances.length"
          class="align-items-center"
          :class="{'d-flex': selectedAttendances.length}"
        >

          <!-- Update Attendance Folder Dropdown -->
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

            <b-dropdown-item @click="moveSelectedAttendancesToFolder('draft')">
              <feather-icon icon="Edit2Icon" />
              <span class="align-middle ml-50">Draft</span>
            </b-dropdown-item>

            <b-dropdown-item @click="moveSelectedAttendancesToFolder('spam')">
              <feather-icon icon="InfoIcon" />
              <span class="align-middle ml-50">Spam</span>
            </b-dropdown-item>

            <b-dropdown-item
              v-show="$route.params.folder !== 'trash'"
              @click="moveSelectedAttendancesToFolder('trash')"
            >
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Trash</span>
            </b-dropdown-item>
          </b-dropdown>

          <!-- Update Attendance Folder Dropdown -->
          <b-dropdown
            variant="link"
            no-caret
            toggle-class="p-0"
            class="ml-1"
            right
          >
            <template #button-content>
              <feather-icon
                icon="TagIcon"
                size="17"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item @click="updateSelectedAttendancesLabel('personal')">
              <span class="mr-50 bullet bullet-success bullet-sm" />
              <span>6级</span>
            </b-dropdown-item>
            <b-dropdown-item @click="updateSelectedAttendancesLabel('company')">
              <span class="mr-50 bullet bullet-primary bullet-sm" />
              <span>5级</span>
            </b-dropdown-item>
            <b-dropdown-item @click="updateSelectedAttendancesLabel('important')">
              <span class="mr-50 bullet bullet-warning bullet-sm" />
              <span>4级</span>
            </b-dropdown-item>
            <b-dropdown-item @click="updateSelectedAttendancesLabel('private')">
              <span class="mr-50 bullet bullet-danger bullet-sm" />
              <span>3级</span>
            </b-dropdown-item>
          </b-dropdown>

          <feather-icon
            icon="MailIcon"
            size="17"
            class="cursor-pointer ml-1"
            @click="markSelectedEmailsAsUnread"
          />

          <feather-icon
            v-show="$route.params.folder !== 'trash'"
            icon="TrashIcon"
            size="17"
            class="cursor-pointer ml-1"
            @click="moveSelectedEmailsToFolder('trash')"
          />

        </div>
      </div>
    </div>

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
  ref, onUnmounted, computed, watch,
  // ref, watch, computed, onUnmounted,
} from '@vue/composition-api'
import {
  BFormInput, BInputGroup, BInputGroupPrepend, BDropdown, BDropdownItem,
  BFormCheckbox, BMedia, BMediaAside, BMediaBody, BAvatar,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { filterTags, formatDateToMonthShort } from '@core/utils/filter'
import { useRouter } from '@core/utils/utils'
import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
import useAttendance from './useAttendance'

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
    BAvatar,

    // 3rd Party
    VuePerfectScrollbar,
  },
  setup() {
    const ATTENDANCE_STORE_MODULE_NAME = 'office-attendance'

    // Register module
    if (!store.hasModule(ATTENDANCE_STORE_MODULE_NAME)) store.registerModule(ATTENDANCE_STORE_MODULE_NAME, attendanceStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(ATTENDANCE_STORE_MODULE_NAME)) store.unregisterModule(ATTENDANCE_STORE_MODULE_NAME)
    })

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
