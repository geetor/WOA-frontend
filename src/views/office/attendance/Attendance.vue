<template>
  <div style="height: inherit">

    <div
        class="body-content-overlay"
        :class="{'show': mqShallShowLeftSidebar}"
        @click="mqShallShowLeftSidebar = false"
    />

    <!-- User List -->
    <!--    <div class="attendance-list">-->
    <!--      &lt;!&ndash; App Searchbar Header &ndash;&gt;-->
    <!--      <div class="app-fixed-search d-flex align-items-center">-->

    <!--        &lt;!&ndash; Toggler &ndash;&gt;-->
    <!--        <div class="sidebar-toggle d-block d-lg-none ml-1">-->
    <!--          <feather-icon-->
    <!--              icon="MenuIcon"-->
    <!--              size="21"-->
    <!--              class="cursor-pointer"-->
    <!--              @click="mqShallShowLeftSidebar = true"-->
    <!--          />-->
    <!--        </div>-->

    <!--        &lt;!&ndash; Searchbar &ndash;&gt;-->
    <!--        <div class="d-flex align-content-center justify-content-between w-100">-->
    <!--          <b-input-group class="input-group-merge">-->
    <!--            <b-input-group-prepend is-text>-->
    <!--              <feather-icon-->
    <!--                  icon="SearchIcon"-->
    <!--                  class="text-muted"-->
    <!--              />-->
    <!--            </b-input-group-prepend>-->
    <!--            <b-form-input-->
    <!--                :data="searchQuery"-->
    <!--                placeholder="搜索部门成员"-->
    <!--                @input="updateRouteQuery"-->
    <!--            />-->
    <!--          </b-input-group>-->
    <!--        </div>-->
    <!--      </div>-->

    <!--      &lt;!&ndash; User List &ndash;&gt;-->
    <!--      <vue-perfect-scrollbar-->
    <!--          :settings="perfectScrollbarSettings"-->
    <!--          class="attendance-user-list scroll-area"-->
    <!--      >-->
    <!--        <ul class="attendance-media-list">-->
    <!--          <b-media-->
    <!--              v-for="user in users"-->
    <!--              :key="user.userId"-->
    <!--              tag="li"-->
    <!--              no-body-->
    <!--          >-->

    <!--            <b-media-aside class="media-left mr-0">-->
    <!--              <b-avatar-->
    <!--                  class="avatar"-->
    <!--                  size="35"-->
    <!--                  variant="primary"-->
    <!--                  :src="user.userPhoto"-->
    <!--              />-->
    <!--            </b-media-aside>-->

    <!--            <b-media-body>-->
    <!--              <div class="user-details align-items-center">-->
    <!--                <div class="user-items ml-1">-->
    <!--                  <h5 class="mb-25">-->
    <!--                    {{ user.userName }}-->
    <!--                  </h5>-->
    <!--                  <span class="text-truncate">{{ user.userPhone }}</span>-->
    <!--                </div>-->
    <!--                <div class="todo-item-action">-->
    <!--                  <div class="badge-wrapper mr-1">-->
    <!--                    <b-badge-->
    <!--                        pill-->
    <!--                        :variant="`light-${resolveRankColor(user.userRank)}`"-->
    <!--                        class="text-capitalize"-->
    <!--                    >-->
    <!--                      {{ user.userRank }}级-->
    <!--                    </b-badge>-->
    <!--                  </div>-->
    <!--                </div>-->
    <!--              </div>-->
    <!--            </b-media-body>-->
    <!--          </b-media>-->
    <!--        </ul>-->
    <!--        <div-->
    <!--            class="no-results"-->
    <!--            :class="{'show': !users.length}"-->
    <!--        >-->
    <!--        </div>-->
    <!--      </vue-perfect-scrollbar>-->
    <!--    </div>-->

    <!-- User List -->
    <div class="attendance-list">
      <vue-perfect-scrollbar
          :settings="perfectScrollbarSettings"
          class="attendance-user-list scroll-area"
      >
        <ul class="attendance-media-list">
          <user-list
              :departments="departments"
              :users="users"
          >
          </user-list>
        </ul>
      </vue-perfect-scrollbar>

    </div>

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <attendance-left-sidebar
          :shall-show-attendance-compose-modal.sync="shallShowAttendanceComposeModal"
          :departments="departments"
          :class="{'show': mqShallShowLeftSidebar}"
          @close-left-sidebar="mqShallShowLeftSidebar = false"
      />
    </portal>

  </div>
</template>

<script>
import { computed, ref, watch } from '@vue/composition-api'

import { useRouter } from '@core/utils/utils'
import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
import AttendanceLeftSidebar from './AttendanceLeftSidebar.vue'
import UserList from './user-list/UserList'
import useAttendance from './useAttendance'
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
import axiosIns from '@/libs/axios'

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
    const {
      route,
      router
    } = useRouter()
    const { resolveRankColor } = useAttendance()

    // Route Params
    const routeParams = computed(() => route.value.params)
    watch(routeParams, () => {
      fetchDepartments()
      fetchUsers()
    })

    // Departments && Users
    const departments = ref(
        [{
          name: '所有部门',
          route: {
            name: 'office-attendance'
          },
          users: []
        }]
    )
    let users = ref([])
    let allUsers = []

    const fetchDepartments = () => {
      axiosIns.get('/attendance/getLowerUsersAttendance', {
        params: {
          userId: JSON.parse(localStorage.getItem('userData')).userId
        }
      })
      .then(response => {
        const statusCode = response.data.status.code

        if (statusCode === '0000') {
          const vo = response.data.data

          allUsers = []
          vo.forEach(department => {
            departments.value.push({
              name: department.deptName,
              route: {
                name: 'office-attendance-department',
                params: { department: department.deptName }
              },
              users: department.userAttendances
            })

            allUsers = allUsers.concat(department.userAttendances)
          })

          let hash = {}
          allUsers = allUsers.reduce(function (item, next) {
            hash[next.userName] ? '' : hash[next.userName] = true && item.push(next)
            return item
          }, [])

          allUsers = allUsers.sort((user1, user2) => {
            return user2.userRank - user1.userRank
          })

          departments.value[0].users = allUsers
          users.value = JSON.parse(JSON.stringify(allUsers))
        }
      })
    }

    fetchDepartments()

    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }

    // Search Query
    const routeQuery = computed(() => route.value.query.q)
    const searchQuery = ref(routeQuery.value)
    watch(routeQuery, val => {
      searchQuery.value = val
    })
    watch(searchQuery, () => {
      fetchUsers()
    })

    const fetchUsers = () => {
      const departmentName = router.currentRoute.params.department || '所有部门'
      const rank = router.currentRoute.params.rank
      const searchContent = searchQuery.value

      if (departmentName !== '所有部门') {
        const department = departments.value.find(department => department.name === departmentName)
        if (typeof department != 'undefined') {
          users.value = department.users
        }
      } else {
        users.value = allUsers
      }

      if (typeof rank != 'undefined') {
        users.value = []
        if (rank < 6) {
          users.value = users.value.concat(allUsers.filter(user => user.userRank === rank))
        } else {
          users.value = users.value.concat(allUsers.filter(user => user.userRank >= rank))
        }
      }

      if (typeof searchContent == 'string') {
        const searchFilterFunction = user => user.userName.includes(searchContent)
        users.value = computed(() => users.value.filter(searchFilterFunction)).value
      }
    }

    fetchUsers()

    // Compose
    const shallShowAttendanceComposeModal = ref(false)

    // Left Sidebar Responsiveness
    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()

    return {
      // UI
      perfectScrollbarSettings,

      // Departments && Users
      departments,
      users,

      // Search Query
      searchQuery,

      // useAttendance
      resolveRankColor,

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
