<template>
  <div class="sidebar-left">
    <div class="sidebar">
      <div class="sidebar-content training-sidebar">
        <div class="training-menu">
          <div class="form-group-compose text-center compose-btn">
            <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                block
                @click="console.log(123)"
            >
              发布训练任务
            </b-button>
          </div>
          <vue-perfect-scrollbar
              :settings="perfectScrollbarSettings"
              class="sidebar-training-list scroll-area"
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
                    v-if="usersMeta[department.name]"
                    pill
                    :variant="resolveDepartmentBadgeColor(department.name)"
                    class="float-right"
                >
                  {{ usersMeta[department.name] }}
                </b-badge>
              </b-list-group-item>
            </b-list-group>

            <!-- 训练状态 -->
            <h6 class="section-label mt-3 mb-1 px-2">
              训练状态
            </h6>

            <b-list-group class="list-group-labels">
              <b-list-group-item
                  v-for="status in trainingStatuses"
                  :key="status.title + $route.path"
                  :to="status.route"
                  :active="isDynamicRouteActive(status.route)"
                  @click="$emit('close-left-sidebar')"
              >
                <span
                    class="bullet bullet-sm mr-1"
                    :class="`bullet-${status.color}`"
                />
                <span>{{ status.title }}</span>
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
    shallShowTrainingComposeModal: {
      type: Boolean,
      required: true
    },
    departments: {
      type: Array,
      required: true,
    },
    usersMeta: {
      type: Object,
      required: true,
    }
  },
  setup () {
    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
    }

    const trainingStatuses = [
      {
        title: '未开始',
        color: 'success',
        route: {
          name: 'office-training-list-status',
          params: { status: '未开始' }
        }
      },
      {
        title: '进行中',
        color: 'primary',
        route: {
          name: 'office-training-list-status',
          params: { status: '进行中' }
        }
      },
      {
        title: '已结束',
        color: 'warning',
        route: {
          name: 'office-training-list-status',
          params: { status: '已结束' }
        }
      }
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

      // Statuses
      trainingStatuses
    }
  }
}
</script>

<style>

</style>
