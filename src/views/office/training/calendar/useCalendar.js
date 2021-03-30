// Full Calendar Plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

// eslint-disable-next-line object-curly-newline
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
  // refStatusesColor
  // ------------------------------------------------
  const refStatusesColor = trainingStatus => {
    if (trainingStatus === '待训') return 'danger'
    if (trainingStatus === '在训') return 'success'
    if (trainingStatus === '结束') return 'warning'
  }

  // ------------------------------------------------
  // training
  // ------------------------------------------------
  const blankTraining = {
    title: '',
    start: '',
    end: '',
    extendedProps: {
      type: '',
      place: '',
      status: '',
      heads: [],
      members: []
    }
  }
  const training = ref(JSON.parse(JSON.stringify(blankTraining)))
  const clearTrainingData = () => {
    training.value = JSON.parse(JSON.stringify(blankTraining))
  }

  // *===========================================================================---*
  // *--------- Calendar API Function/Utils --------------------------------------------*
  // Template Future Update: We might move this utils function in its own file
  // *===========================================================================---*

  // ------------------------------------------------
  // (UI) editTrainingInCalendar
  // ------------------------------------------------
  const editTrainingInCalendar = (editedTrainingData, propsToEdit, extendedPropsToEdit) => {
    toast({
      component: ToastificationContent,
      props: {
        title: '训练任务已更新',
        icon: 'CheckIcon',
        variant: 'success',
      }
    })

    const existingTraining = calendarApi.getEventById(editedTrainingData.id)

    // --- Set training properties except date related ----- //
    // ? Docs: https://fullcalendar.io/docs/Training-setProp
    for (let index = 0; index < propsToEdit.length; index++) {
      const propName = propsToEdit[index]
      existingTraining.setProp(propName, editedTrainingData[propName])
    }

    // --- Set date related props ----- //
    // ? Docs: https://fullcalendar.io/docs/Training-setDates
    existingTraining.setDates(editedTrainingData.start, editedTrainingData.end)

    // --- Set training's extendedProps ----- //
    // ? Docs: https://fullcalendar.io/docs/Event-setExtendedProp
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < extendedPropsToEdit.length; index++) {
      const propName = extendedPropsToEdit[index]
      existingTraining.setExtendedProp(propName, editedTrainingData.extendedProps[propName])
    }
  }

  // ------------------------------------------------
  // (UI) delTrainingInCalendar
  // ------------------------------------------------
  const delTrainingInCalendar = trainingId => {
    toast({
      component: ToastificationContent,
      position: 'bottom-right',
      props: {
        title: '训练任务已删除',
        icon: 'TrashIcon',
        variant: 'danger',
      }
    })
    calendarApi.getEventById(trainingId)
    .remove()
  }

  // ------------------------------------------------
  // grabTrainingDataFromEventApi
  // ------------------------------------------------
  const grabTrainingDataFromEventApi = eventApi => {
    const {
      id,
      title,
      start,
      end,
      extendedProps: {
        type,
        place,
        status,
        heads,
        members
      }
    } = eventApi

    return {
      id,
      title,
      start,
      end,
      extendedProps: {
        type,
        place,
        status,
        heads,
        members
      }
    }
  }

  // ------------------------------------------------
  // addTraining
  // ------------------------------------------------
  const addTraining = trainingData => {
    store.dispatch('calendar/addTraining', { training: trainingData })
    .then(() => {
      refetchTrainings()
    })
  }

  // ------------------------------------------------
  // editTraining
  // ------------------------------------------------
  const editTraining = trainingData => {
    store.dispatch('calendar/editTraining', { training: trainingData })
    .then(response => {
      const editedTraining = response.data.training

      const propsToEdit = ['id', 'title']
      const extendedPropsToEdit = ['type', 'place', 'status', 'heads', 'members']

      editTrainingInCalendar(editedTraining, propsToEdit, extendedPropsToEdit)
    })
  }

  // ------------------------------------------------
  // delTraining
  // ------------------------------------------------
  const delTraining = () => {
    const trainingId = training.value.id
    store.dispatch('calendar/delTraining', { id: trainingId })
    .then(() => {
      delTrainingInCalendar(trainingId)
    })
  }

  // ------------------------------------------------
  // fetchLowerUsers
  // ------------------------------------------------
  const lowerUsers = ref([])
  const fetchLowerUsers = () => {
    store.dispatch('calendar/fetchLowerUsers')
    .then(response => {
      lowerUsers.value = response.data
    })
  }
  fetchLowerUsers()

  // ------------------------------------------------
  // refetchTrainings
  // ------------------------------------------------
  const refetchTrainings = () => {
    calendarApi.refetchEvents()
  }

  // ------------------------------------------------
  // selectedStatuses
  // ------------------------------------------------
  const selectedStatuses = computed(() => store.state.calendar.selectedStatuses)

  watch(selectedStatuses, () => {
    refetchTrainings()
  })

  // --------------------------------------------------------------------------------------------------
  // AXIOS: fetchTrainings
  // * This will be called by fullCalendar to fetch trainings. Also this can be used to refetch trainings.
  // --------------------------------------------------------------------------------------------------
  const fetchUserTrainings = (info, successCallback) => {
    // If there's no info => Don't make useless API call
    if (!info) return

    // Fetch Trainings from API endpoint
    store
    .dispatch('calendar/fetchUserTrainings', {
      userId: router.currentRoute.params.user,
      statuses: selectedStatuses.value
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
          variant: 'danger'
        }
      })
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
    events: fetchUserTrainings,
    locale: 'zh-cn',
    // firstDay: 1,

    /*
      Enable dragging and resizing training
      ? Docs: https://fullcalendar.io/docs/editable
    */
    editable: true,

    /*
      Enable resizing training from start
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

    eventClassNames ({ event: calendarTraining }) {
      // eslint-disable-next-line no-underscore-dangle
      const colorName = refStatusesColor(calendarTraining._def.extendedProps.status)

      return [
        // Background Color
        `bg-light-${colorName}`
      ]
    },
    eventClick ({ event: clickedTraining }) {
      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
      training.value = grabTrainingDataFromEventApi(clickedTraining)

      isTrainingHandlerSidebarActive.value = true
    },

    customButtons: {
      sidebarToggle: {
        text: 'sidebar',
        click () {
          isCalendarOverlaySidebarActive.value = !isCalendarOverlaySidebarActive.value
        }
      }
    },

    dateClick (info) {
      training.value = JSON.parse(JSON.stringify(Object.assign(training.value, { start: info.date })))

      isTrainingHandlerSidebarActive.value = true
    },

    eventDrop ({ event: droppedTraining }) {
      editTraining(grabTrainingDataFromEventApi(droppedTraining))
    },

    eventResize ({ event: resizedTraining }) {
      editTraining(grabTrainingDataFromEventApi(resizedTraining))
    },

    // Get direction from app state (store)
    direction: computed(() => (store.state.appConfig.isRTL ? 'rtl' : 'ltr')),
    rerenderDelay: 350
  })

  // ------------------------------------------------------------------------

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const isTrainingHandlerSidebarActive = ref(false)

  const isCalendarOverlaySidebarActive = ref(false)

  return {
    refCalendar,
    isCalendarOverlaySidebarActive,
    calendarOptions,
    training,
    clearTrainingData,
    lowerUsers,
    addTraining,
    editTraining,
    delTraining,
    refetchTrainings,
    fetchUserTrainings,

    // ----- UI ----- //
    isTrainingHandlerSidebarActive
  }
}
