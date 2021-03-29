import store from '@/store'

import { computed } from '@vue/composition-api'

export default function useCalendarSidebar() {
  // ------------------------------------------------
  // statusOptions
  // ------------------------------------------------
  const statusOptions = computed(() => store.state.calendar.statusOptions)

  // ------------------------------------------------
  // selectedStatuses
  // ------------------------------------------------
  const selectedStatuses = computed({
    get: () => store.state.calendar.selectedStatuses,
    set: val => {
      store.commit('calendar/SET_SELECTED_STATUSES', val)
    },
  })

  // ------------------------------------------------
  // checkAll
  // ------------------------------------------------
  const checkAll = computed({
    get: () => selectedStatuses.value.length === statusOptions.value.length,
    set: val => {
      if (val) {
        selectedStatuses.value = statusOptions.value.map(i => i.label)
      } else if (selectedStatuses.value.length === statusOptions.value.length) {
        selectedStatuses.value = []
      }
    },
  })

  return {
    statusOptions,
    selectedStatuses,
    checkAll,
  }
}
