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
                @click="check"
            >
              考勤
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
                  :key="department.name + $route.path"
                  :to="department.route"
                  :active="isDynamicRouteActive(department.route)"
                  @click="$emit('close-left-sidebar')"
              >
                <feather-icon
                    :icon="'AnchorIcon'"
                    size="18"
                    class="mr-75"
                />
                <span class="align-text-bottom line-height-1">{{ department.name }}</span>
                <b-badge
                    v-if="department.users.length"
                    pill
                    :variant="resolveDepartmentBadgeColor(department.name)"
                    class="float-right"
                >
                  {{ department.users.length }}
                </b-badge>
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
    BBadge,

    // 3rd Party
    VuePerfectScrollbar,
  },
  props: {
    shallShowAttendanceComposeModal: {
      type: Boolean,
      required: true
    },
    departments: {
      type: Array,
      required: true
    }
  },
  setup () {
    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
    }

    const ranks = [
      {
        title: '6级+',
        color: 'success',
        route: {
          name: 'office-attendance-rank',
          params: { rank: 6 }
        }
      },
      {
        title: '5级',
        color: 'secondary',
        route: {
          name: 'office-attendance-rank',
          params: { rank: 5 }
        }
      },
      {
        title: '4级',
        color: 'primary',
        route: {
          name: 'office-attendance-rank',
          params: { rank: 4 }
        }
      },
      {
        title: '3级',
        color: 'warning',
        route: {
          name: 'office-attendance-rank',
          params: { rank: 3 }
        }
      },
      {
        title: '2级',
        color: 'danger',
        route: {
          name: 'office-attendance-rank',
          params: { rank: 2 }
        }
      },
      {
        title: '1级',
        color: 'info',
        route: {
          name: 'office-attendance-rank',
          params: { rank: 1 }
        }
      },
    ]

    const resolveDepartmentBadgeColor = department => {
      if (department === '人事部门') return 'light-warning'
      if (department === '武装部门') return 'light-danger'
      return 'light-primary'
    }

    return {
      // UI
      perfectScrollbarSettings,
      isDynamicRouteActive,
      resolveDepartmentBadgeColor,

      // Ranks
      ranks
    }
  },
  methods: {
    check () {
      const that = this
      that.axiosIns.get('/attendance/checkIn', {
        params: {
          userId: JSON.parse(localStorage.getItem('userData')).userId
        }
      })
      .then(res => {
        const statusCode = res.data.status.code

        if (statusCode === '0000') {
          that.$toast({
            component: ToastificationContent,
            props: {
              title: `签到成功!`,
              icon: 'CoffeeIcon',
              variant: 'success',
              text: '请勿重复点击，以免误签!'
            }
          })
        } else {
          that.$toast({
                component: ToastificationContent,
                props: {
                  title: res.data.status.msg,
                  icon: 'DeleteIcon',
                  variant: 'warning',
                  text: '请勿重复点击，以免误签!'
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
                variant: 'danger',
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
