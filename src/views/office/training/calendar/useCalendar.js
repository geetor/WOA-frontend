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

export default function userCalendar() {
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
    allDay: false,
    extendedProps: {
      type: '',
      place: '',
      status: '',
      heads: []
    },
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
  // (UI) addTrainingInCalendar
  // ? This is useless because this just add training in calendar and not in our data
  // * If we try to call it on new training then callback & try to toggle from calendar we get two trainings => One from UI and one from data
  // ------------------------------------------------
  // const addTrainingInCalendar = trainingData => {
  //   toast({
  //     component: ToastificationContent,
  //     position: 'bottom-right',
  //     props: {
  //       title: 'Training Added',
  //       icon: 'CheckIcon',
  //       variant: 'success',
  //     },
  //   })
  //   calendarApi.addTraining(trainingData)
  // }

  // ------------------------------------------------
  // (UI) updateTrainingInCalendar
  // ------------------------------------------------
  const updateTrainingInCalendar = (updatedTrainingData, propsToUpdate, extendedPropsToUpdate) => {
    toast({
      component: ToastificationContent,
      props: {
        title: '训练任务已更新',
        icon: 'CheckIcon',
        variant: 'success',
      },
    })

    const existingTraining = calendarApi.getEventById(updatedTrainingData.id)

    // --- Set training properties except date related ----- //
    // ? Docs: https://fullcalendar.io/docs/Training-setProp
    // dateRelatedProps => ['start', 'end', 'allDay']
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < propsToUpdate.length; index++) {
      const propName = propsToUpdate[index]
      existingTraining.setProp(propName, updatedTrainingData[propName])
    }

    // --- Set date related props ----- //
    // ? Docs: https://fullcalendar.io/docs/Training-setDates
    existingTraining.setDates(updatedTrainingData.start, updatedTrainingData.end, { allDay: updatedTrainingData.allDay })

    // --- Set training's extendedProps ----- //
    // ? Docs: https://fullcalendar.io/docs/Event-setExtendedProp
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < extendedPropsToUpdate.length; index++) {
      const propName = extendedPropsToUpdate[index]
      existingTraining.setExtendedProp(propName, updatedTrainingData.extendedProps[propName])
    }
  }

  // ------------------------------------------------
  // (UI) removeTrainingInCalendar
  // ------------------------------------------------
  const removeTrainingInCalendar = trainingId => {
    toast({
      component: ToastificationContent,
      position: 'bottom-right',
      props: {
        title: 'Training Removed',
        icon: 'TrashIcon',
        variant: 'danger',
      }
    })
    calendarApi.getEventById(trainingId).remove()
  }

  // ------------------------------------------------
  // grabTrainingDataFromEventApi
  // ? It will return just training data from fullCalendar's EventApi which is not required for event mutations and other tasks
  // ! You need to update below function as per your extendedProps
  // ------------------------------------------------
  const grabTrainingDataFromEventApi = eventApi => {
    const {
      id,
      title,
      start,
      end,
      extendedProps: { type, place, status, heads },
      allDay,
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
      },
      allDay,
    }
  }

  // ------------------------------------------------
  // addTraining
  // ------------------------------------------------
  const addTraining = trainingData => {
    store.dispatch('calendar/addTraining', { training: trainingData }).then(() => {
      refetchTrainings()
    })
  }

  // ------------------------------------------------
  // updateTraining
  // ------------------------------------------------
  const updateTraining = trainingData => {
    store.dispatch('calendar/updateTraining', { training: trainingData }).then(response => {
      const updatedTraining = response.data.training

      const propsToUpdate = ['id', 'title']
      const extendedPropsToUpdate = ['type', 'place', 'status', 'heads']

      updateTrainingInCalendar(updatedTraining, propsToUpdate, extendedPropsToUpdate)
    })
  }

  // ------------------------------------------------
  // removeTraining
  // ------------------------------------------------
  const removeTraining = () => {
    const trainingId = training.value.id
    store.dispatch('calendar/removeTraining', { id: trainingId }).then(() => {
      removeTrainingInCalendar(trainingId)
    })
  }

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
        statuses: selectedStatuses.value,
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
    firstDay: 1,

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

    eventClassNames({ event: calendarEvent }) {
      // eslint-disable-next-line no-underscore-dangle
      const colorName = refStatusesColor(calendarEvent._def.extendedProps.status)

      return [
        // Background Color
        `bg-light-${colorName}`,
      ]
    },
    eventClick({ event: clickedEvent }) {
      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
      training.value = grabTrainingDataFromEventApi(clickedEvent)

      // eslint-disable-next-line no-use-before-define
      isTrainingHandlerSidebarActive.value = true
    },

    customButtons: {
      sidebarToggle: {
        // --- This dummy text actual icon rendering is handled using SCSS ----- //
        text: 'sidebar',
        click() {
          // eslint-disable-next-line no-use-before-define
          isCalendarOverlaySidebarActive.value = !isCalendarOverlaySidebarActive.value
        },
      },
    },

    dateClick(info) {
      /*
        ! Vue3 Change
        Using Vue.set isn't working for now so we will try to check reactivity in Vue 3 as it can handle this automatically
        ```
        training.value.start = info.date
        ```
      */
      training.value = JSON.parse(JSON.stringify(Object.assign(training.value, { start: info.date })))
      // eslint-disable-next-line no-use-before-define
      isTrainingHandlerSidebarActive.value = true
    },

    /*
      Handle event drop (Also include dragged event)
      ? Docs: https://fullcalendar.io/docs/eventDrop
      ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
    */
    eventDrop({ event: droppedEvent }) {
      updateTraining(grabTrainingDataFromEventApi(droppedEvent))
    },

    /*
      Handle event resize
      ? Docs: https://fullcalendar.io/docs/eventResize
    */
    eventResize({ event: resizedEvent }) {
      updateTraining(grabTrainingDataFromEventApi(resizedEvent))
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
    addTraining,
    updateTraining,
    removeTraining,
    refetchTrainings,
    fetchUserTrainings,

    // ----- UI ----- //
    isTrainingHandlerSidebarActive
  }
}
