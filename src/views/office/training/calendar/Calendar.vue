<template>
  <div class="app-calendar overflow-hidden border">
    <div class="row no-gutters">
      <!-- Sidebar -->
      <div
        class="col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column"
        :class="{'show': isCalendarOverlaySidebarActive}"
      >
        <calendar-sidebar :is-training-handler-sidebar-active.sync="isTrainingHandlerSidebarActive" />
      </div>

      <!-- Calendar -->
      <div class="col position-relative">
        <div class="card shadow-none border-0 mb-0 rounded-0">
          <div class="card-body pb-0">
            <full-calendar
              ref="refCalendar"
              :options="calendarOptions"
              class="full-calendar"
            />
          </div>
        </div>
      </div>

      <!-- Sidebar Overlay -->
      <div
        class="body-content-overlay"
        :class="{'show': isCalendarOverlaySidebarActive}"
        @click="isCalendarOverlaySidebarActive = false"
      />
      <calendar-training-handler
        v-model="isTrainingHandlerSidebarActive"
        :training="training"
        :clear-training-data="clearTrainingData"
        @remove-training="removeTraining"
        @add-training="addTraining"
        @update-training="updateTraining"
      />
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import store from '@/store'
import { onUnmounted } from '@vue/composition-api'
import calendarStoreModule from './calendarStoreModule'
import CalendarSidebar from './calendar-sidebar/CalendarSidebar.vue'
import CalendarTrainingHandler from './calendar-training-handler/CalendarTrainingHandler.vue'
import useCalendar from './useCalendar'

export default {
  components: {
    FullCalendar,
    CalendarSidebar,
    CalendarTrainingHandler,
  },
  setup() {
    const CALENDAR_APP_STORE_MODULE_NAME = 'calendar'

    // Register module
    if (!store.hasModule(CALENDAR_APP_STORE_MODULE_NAME)) store.registerModule(CALENDAR_APP_STORE_MODULE_NAME, calendarStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CALENDAR_APP_STORE_MODULE_NAME)) store.unregisterModule(CALENDAR_APP_STORE_MODULE_NAME)
    })

    const {
      refCalendar,
      isCalendarOverlaySidebarActive,
      training,
      clearTrainingData,
      addTraining,
      updateTraining,
      removeTraining,
      fetchUserTrainings,
      refetchTrainings,
      calendarOptions,

      // ----- UI ----- //
      isTrainingHandlerSidebarActive,
    } = useCalendar()

    fetchUserTrainings()

    return {
      refCalendar,
      isCalendarOverlaySidebarActive,
      training,
      clearTrainingData,
      addTraining,
      updateTraining,
      removeTraining,
      refetchTrainings,
      calendarOptions,

      // ----- UI ----- //
      isTrainingHandlerSidebarActive,
    }
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/apps/calendar.scss";
</style>
