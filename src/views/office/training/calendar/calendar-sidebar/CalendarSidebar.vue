<template>
  <div class="sidebar-wrapper d-flex justify-content-between flex-column flex-grow-1">
    <div class="p-2">
      <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          aria-controls="sidebar-add-new-training"
          :aria-expanded="String(isTrainingHandlerSidebarActive)"
          variant="primary"
          block
          class="my-1"
          @click="$emit('update:isTrainingHandlerSidebarActive', true)"
      >
        发布训练任务
      </b-button>
      <div class="mt-3">
        <h5 class="app-label section-label mb-1">
          <span class="align-middle">训练状态</span>
        </h5>
        <b-form-checkbox
            v-model="checkAll"
            class="mb-1"
        >
          全部
        </b-form-checkbox>
        <b-form-group>
          <b-form-checkbox-group
              v-model="selectedStatuses"
              name="event-filter"
              stacked
          >
            <b-form-checkbox
                v-for="status in statusOptions"
                :key="status.label"
                name="event-filter"
                :value="status.label"
                class="mb-1"
                :class="`custom-control-${status.color}`"
            >
              {{ status.label }}
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BButton, BFormGroup, BFormCheckboxGroup, BFormCheckbox, BImg,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import useCalendarSidebar from './useCalendarSidebar'

export default {
  directives: {
    Ripple
  },
  components: {
    BButton,
    BImg,
    BFormCheckbox,
    BFormGroup,
    BFormCheckboxGroup
  },
  props: {
    isTrainingHandlerSidebarActive: {
      type: Boolean,
      require: true
    }
  },
  setup () {
    const {
      statusOptions,
      selectedStatuses,
      checkAll
    } = useCalendarSidebar()

    return {
      statusOptions,
      selectedStatuses,
      checkAll
    }
  },
}
</script>

<style>

</style>
