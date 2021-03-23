<template>
  <div class="sidebar-wrapper d-flex justify-content-between flex-column flex-grow-1">
    <div class="p-2">
      <div class="mt-1">
        <h5 class="app-label section-label mb-1">
          <span class="align-middle">考勤类型</span>
        </h5>
        <b-form-checkbox
          v-model="checkAll"
          class="mb-1"
        >
          全部
        </b-form-checkbox>
        <b-form-group>
          <b-form-checkbox-group
            v-model="selectedTypes"
            name="type-filter"
            stacked
          >
            <b-form-checkbox
              v-for="item in attendanceTypes"
              :key="item.label"
              name="type-filter"
              :value="item.label"
              class="mb-1"
              :class="`custom-control-${item.color}`"
            >
              {{ item.label }}
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
    Ripple,
  },
  components: {
    BButton,
    BImg,
    BFormCheckbox,
    BFormGroup,
    BFormCheckboxGroup,
  },
  setup() {
    const {
      attendanceTypes,
      selectedTypes,
      checkAll,
    } = useCalendarSidebar()

    return {
      attendanceTypes,
      selectedTypes,
      checkAll,
    }
  },
}
</script>

<style>

</style>
