// Full Calendar Plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { ref, computed, watch, onMounted } from '@vue/composition-api'
import store from '@/store'
import { useRouter } from '@core/utils/utils'

export default function userCalendar () {
  // Use toast
  const toast = useToast()
  // ------------------------------------------------
  // refCalendar
  // ------------------------------------------------
  const refCalendar = ref(null)

  const {
    router
  } = useRouter()

  // ------------------------------------------------
  // calendarApi
  // ------------------------------------------------
  let calendarApi = null
  onMounted(() => {
    calendarApi = refCalendar.value.getApi()
  })

  // ------------------------------------------------
  // refAttendancesColor
  // ------------------------------------------------
  const refAttendancesColor = attendanceType => {
    if (attendanceType === '签到') return 'success'
    if (attendanceType === '迟到') return 'danger'
    if (attendanceType === '签退') return 'success'
    if (attendanceType === '早退') return 'danger'
    if (attendanceType === '请假') return 'info'
  }

  // *===========================================================================---*
  // *--------- Calendar API Function/Utils --------------------------------------------*
  // Template Future Update: We might move this utils function in its own file
  // *===========================================================================---*

  // ------------------------------------------------
  // refetchAttendances
  // ------------------------------------------------
  const refetchAttendances = () => {
    calendarApi.refetchEvents()
  }

  // ------------------------------------------------
  // selectedTypes
  // ------------------------------------------------
  const selectedTypes = computed(() => store.state.calendar.selectedTypes)

  watch(selectedTypes, () => {
    refetchAttendances()
  })

  // --------------------------------------------------------------------------------------------------
  // AXIOS: fetchAttendances
  // * This will be called by fullCalendar to fetch attendances. Also this can be used to refetch events.
  // --------------------------------------------------------------------------------------------------
  const fetchAttendances = (info, successCallback) => {
    // If there's no info => Don't make useless API call
    if (!info) return

    // Fetch Attendances from API endpoint
    store
    .dispatch('calendar/fetchAttendances', {
      userId: router.currentRoute.params.userId,
      startDateStr: info.startStr.split('T')[0],
      endDateStr: info.endStr.split('T')[0],
      types: selectedTypes.value
    })
    .then(response => {
      successCallback(response.data)
    })
    .catch(() => {
      toast({
          component: ToastificationContent,
          props: {
            title: '错误',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        },
        { position: 'bottom-right' })
    })
  }

  // ------------------------------------------------------------------------
  // calendarOptions
  // * This isn't considered in UI because this is the core of calendar app
  // ------------------------------------------------------------------------
  const calendarOptions = ref({
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'sidebarToggle, prev, title, next',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
    },
    buttonText: {
      month: '月历',
      week: '周历',
      day: '日历',
      list: '列表'
    },
    events: fetchAttendances,
    locale: 'zh-cn',
    // firstDay: 1,

    /*
      Enable dragging and resizing event
      ? Docs: https://fullcalendar.io/docs/editable
    */
    editable: false,

    /*
      Enable resizing event from start
      ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
    */
    eventResizableFromStart: true,

    /*
      Automatically scroll the scroll-containers during event drag-and-drop and date selecting
      ? Docs: https://fullcalendar.io/docs/dragScroll
    */
    dragScroll: true,

    /*
      Max number of events within a given day
      ? Docs: https://fullcalendar.io/docs/dayMaxEvents
    */
    dayMaxEvents: 2,

    /*
      Determines if day names and week names are clickable
      ? Docs: https://fullcalendar.io/docs/navLinks
    */
    navLinks: true,

    eventClassNames ({ event: calendarEvent }) {
      // eslint-disable-next-line no-underscore-dangle
      const colorName = refAttendancesColor(calendarEvent._def.extendedProps.type)

      return [
        // Background Color
        `bg-light-${colorName}`,
      ]
    },

    // Get direction from app state (store)
    direction: computed(() => (store.state.appConfig.isRTL ? 'rtl' : 'ltr')),
    rerenderDelay: 350,
  })

  // ------------------------------------------------------------------------

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const isCalendarOverlaySidebarActive = ref(false)

  return {
    refCalendar,
    isCalendarOverlaySidebarActive,
    calendarOptions,
    refetchAttendances,
    fetchAttendances
  }
}
