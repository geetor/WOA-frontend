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
            <!-- Filters -->
            <b-list-group class="list-group-messages">
              <b-list-group-item
                v-for="filter in departments"
                :key="filter.title + $route.path"
                :to="filter.route"
                :active="isDynamicRouteActive(filter.route)"
                @click="$emit('close-left-sidebar')"
              >
                <feather-icon
                  :icon="filter.icon"
                  size="18"
                  class="mr-75"
                />
                <span class="align-text-bottom line-height-1">{{ filter.title }}</span>
              </b-list-group-item>
            </b-list-group>

            <!-- Labels -->
            <h6 class="section-label mt-3 mb-1 px-2">
              标签
            </h6>

            <b-list-group class="list-group-labels">
              <b-list-group-item
                v-for="label in ranks"
                :key="label.title + $route.path"
                :to="label.route"
                :active="isDynamicRouteActive(label.route)"
                @click="$emit('close-left-sidebar')"
              >
                <span
                  class="bullet bullet-sm mr-1"
                  :class="`bullet-${label.color}`"
                />
                <span>{{ label.title }}</span>
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
  setup() {
    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
    }

    const departments = [
      { title: '人事部门', icon: 'MailIcon', route: { name: 'office-attendance' } },
      { title: '动力部门', icon: 'SendIcon', route: { name: 'office-attendance-folder', params: { folder: 'sent' } } },
      { title: '后勤部门', icon: 'Edit2Icon', route: { name: 'office-attendance-folder', params: { folder: 'draft' } } },
      { title: '武装部门', icon: 'StarIcon', route: { name: 'office-attendance-folder', params: { folder: 'starred' } } },
    ]

    const ranks = [
      { title: '6级', color: 'success', route: { name: 'office-attendance-label', params: { label: 'personal' } } },
      { title: '5级', color: 'primary', route: { name: 'office-attendance-label', params: { label: 'company' } } },
      { title: '4级', color: 'warning', route: { name: 'office-attendance-label', params: { label: 'important' } } },
      { title: '3级及以下', color: 'danger', route: { name: 'office-attendance-label', params: { label: 'private' } } },
    ]

    return {
      // UI
      perfectScrollbarSettings,
      isDynamicRouteActive,

      // Departments & Labels
      departments,
      ranks,
    }
  },
}
</script>

<style>

</style>
