<template>
  <div class="sidebar-left">
    <div class="sidebar">
      <div class="sidebar-content attendance-sidebar">
        <div class="attendance-menu">
          <div class="form-group-compose text-center compose-btn">
            <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                block
                @click="console.log('test')"
            >
              签到
            </b-button>
          </div>
          <vue-perfect-scrollbar
              :settings="perfectScrollbarSettings"
              class="sidebar-attendance-list scroll-area"
          >
            <!-- Departments -->
            <b-list-group class="list-group-messages">
              <b-list-group-item
                  v-for="department in departments"
                  :key="department.title + $route.path"
                  :to="department.route"
                  :active="isDynamicRouteActive(department.route)"
                  @click="$emit('close-left-sidebar')"
              >
                <feather-icon
                    :icon="'AnchorIcon'"
                    size="18"
                    class="mr-75"
                />
                <span class="align-text-bottom line-height-1">{{ department.title }}</span>
              </b-list-group-item>
            </b-list-group>

            <!-- Ranks -->
            <h6 class="section-label mt-3 mb-1 px-2">
              等级
            </h6>

            <b-list-group class="list-group-labels">
              <b-list-group-item
                  v-for="rank in ranks"
                  :key="rank.title + $route.path"
                  :to="rank.route"
                  :active="isDynamicRouteActive(rank.route)"
                  @click="$emit('close-left-sidebar')"
              >
                <span
                    class="bullet bullet-sm mr-1"
                    :class="`bullet-${rank.color}`"
                />
                <span>{{ rank.title }}</span>
              </b-list-group-item>
            </b-list-group>

          </vue-perfect-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {
  BButton, BListGroup, BListGroupItem, BBadge,
} from 'bootstrap-vue'
import { isDynamicRouteActive } from '@core/utils/utils'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export default {
  directives: {
    Ripple,
  },
  components: {
    // BSV
    BButton,
    BListGroup,
    BListGroupItem,
    // eslint-disable-next-line vue/no-unused-components
    BBadge,

    // 3rd Party
    VuePerfectScrollbar,
  },
  props: {
    shallShowAttendanceComposeModal: {
      type: Boolean,
      required: true,
    },
    attendancesMeta: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      departments: [],
      ranks: []
    }
  },
  setup () {
    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
    }

    const departments = []

    const ranks = [
      {
        title: '6级',
        color: 'success',
        route: {
          name: 'office-attendance-rank',
          params: { rank: 6 }
        }
      },
      {
        title: '5级',
        color: 'primary',
        route: {
          name: 'office-attendance-rank',
          params: { rank: 5 }
        }
      },
      {
        title: '4级',
        color: 'warning',
        route: {
          name: 'office-attendance-rank',
          params: { rank: 4 }
        }
      },
      {
        title: '3级及以下',
        color: 'danger',
        route: {
          name: 'office-attendance-rank',
          params: { rank: 3 }
        }
      },
    ]

    return {
      // UI
      perfectScrollbarSettings,
      isDynamicRouteActive,

      // Departments & Labels
      departments,
      ranks
    }
  },
  mounted () {
    this.getDeptsAndUsers()
  },
  methods: {
    getDeptsAndUsers () {
      const that = this
      this.axiosIns.get('/user/getLowerUsers', {
        params: {
          userId: JSON.parse(localStorage.getItem('userData')).userId
        }
      })
      .then(res => {
        const statusCode = res.data.status.code
        if (statusCode === '0000') {
          const departments = res.data.data

          departments.forEach(department => {
            console.log(department)
            const newDepartment = {
              title: department.deptName,
              route: {
                name: 'office-attendance-department',
                params: { folder: `${department.deptName}` }
              }
            }
            that.departments.push(newDepartment)
          })
        } else {
          that.$toast({
                component: ToastificationContent,
                props: {
                  title: res.data.status.msg,
                  icon: 'DeleteIcon',
                  variant: 'warning',
                }
              },
              { position: 'bottom-right' }
          )
        }
      })
      .catch(err => {
        that.$toast({
              component: ToastificationContent,
              props: {
                title: '错误',
                icon: 'DeleteIcon',
                variant: 'warning',
              }
            },
            { position: 'bottom-right' }
        )
      })
    }
  }
}
</script>

<style>

</style>
