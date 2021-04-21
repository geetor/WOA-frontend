Sopp:
<template>
  <div class="sidebar-left">
    <div class="sidebar">
      <div class="sidebar-content training-sidebar">
        <div class="training-menu">
          <div class="form-group-compose text-center compose-btn">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="warning"
              block
              class="my-1"
              @click="
                $emit('update:is-department-add-sidebar-active', true);
                $emit('close-left-sidebar');
              "
            >
              新 增
            </b-button>
          </div>
          <vue-perfect-scrollbar
            :settings="perfectScrollbarSettings"
            class="sidebar-training-list scroll-area"
          >
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
  },
  setup() {
    const {
      route,
      router
    } = useRouter()

    // Route Params
    const routeParams = computed(() => route.value.params)

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60
    }

    return {
      // UI
      perfectScrollbarSettings,
      isDynamicRouteActive
    }
  }
}
</script>

<style>
</style>

