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
                class="my-1"
                :to="{ name: 'office-training-calendar-department', params: { department: currentDepartment }}"
            >
              训练安排 - {{ currentDepartment }}
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
          </vue-perfect-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {
  BButton, BListGroup, BListGroupItem, BBadge
} from 'bootstrap-vue'
import { isDynamicRouteActive, useRouter } from '@core/utils/utils'
import Ripple from 'vue-ripple-directive'
import { computed, watch, ref } from '@vue/composition-api'

export default {
  directives: {
    Ripple
  },
  components: {
    // BSV
    BButton,
    BListGroup,
    BListGroupItem,
    BBadge,

    // 3rd Party
    VuePerfectScrollbar
  },
  props: {
    shallShowTrainingComposeModal: {
      type: Boolean,
      required: true
    },
    departments: {
      type: Array,
      required: true
    },
    usersMeta: {
      type: Object,
      required: true
    }
  },
  setup () {
    const {
      route,
      router
    } = useRouter()

    // Route Params
    const routeParams = computed(() => route.value.params)

    let currentDepartment = ref('')
    const fetchDepartmentName = () => {
      if (router.currentRoute.params.department) {
        currentDepartment.value = router.currentRoute.params.department
      } else {
        currentDepartment.value = '所有部门'
      }
    }
    fetchDepartmentName()

    watch(routeParams, () => {
      fetchDepartmentName()
    })

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60
    }

    const resolveDepartmentBadgeColor = department => {
      if (department === '人事部门') return 'light-warning'
      if (department === '武装部门') return 'light-danger'
      return 'light-primary'
    }

    return {
      currentDepartment,

      // UI
      perfectScrollbarSettings,
      isDynamicRouteActive,
      resolveDepartmentBadgeColor
    }
  }
}
</script>
