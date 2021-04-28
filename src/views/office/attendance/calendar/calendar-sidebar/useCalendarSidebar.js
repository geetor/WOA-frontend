import store from '@/store'

import { computed } from '@vue/composition-api'

export default function useCalendarSidebar() {
  // ------------------------------------------------
  // attendanceTypes
  // ------------------------------------------------
  const attendanceTypes = computed(() => store.state.calendar.attendanceTypes)

  // ------------------------------------------------
  // selectedTypes
  // ------------------------------------------------
  const selectedTypes = computed({
    get: () => store.state.calendar.selectedTypes,
    set: val => {
      store.commit('calendar/SET_SELECTED_TYPES', val)
    }
  })

  // ------------------------------------------------
  // checkAll
  // ------------------------------------------------
  const checkAll = computed({
    get: () => selectedTypes.value.length === attendanceTypes.value.length,
    set: val => {
      if (val) {
        selectedTypes.value = attendanceTypes.value.map(i => i.label)
      } else if (selectedTypes.value.length === attendanceTypes.value.length) {
        selectedTypes.value = []
      }
    }
  })

  return {
    attendanceTypes,
    selectedTypes,
    checkAll
  }
}
