import { ref, computed, watch } from '@vue/composition-api'
import store from '@/store'

export default function useCalendarTrainingHandler(props, clearForm, emit) {
  // ------------------------------------------------
  // trainingLocal
  // ------------------------------------------------
  const trainingLocal = ref(JSON.parse(JSON.stringify(props.training.value)))
  const resetTrainingLocal = () => {
    trainingLocal.value = JSON.parse(JSON.stringify(props.training.value))
  }
  watch(props.training, () => {
    resetTrainingLocal()
  })

  // ------------------------------------------------
  // isTrainingHandlerSidebarActive
  // * Clear form if sidebar is closed
  // ------------------------------------------------
  watch(props.isTrainingHandlerSidebarActive, val => {
    // ? Don't reset training till transition is finished
    if (!val) {
      setTimeout(() => {
        clearForm.value()
      }, 350)
    }
  })
  // ------------------------------------------------
  // statusOptions
  // ------------------------------------------------
  const statusOptions = computed(() => store.state.calendar.statusOptions)

  const onSubmit = () => {
    const trainingData = JSON.parse(JSON.stringify(trainingLocal))

    // * If training has id => Edit Training
    // Emit training for add/update training
    if (props.training.value.id) emit('update-training', trainingData.value)
    else emit('add-training', trainingData.value)

    // Close sidebar
    emit('update:is-training-handler-sidebar-active', false)
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  // ------------------------------------------------
  // headsOptions
  // ------------------------------------------------

  /* eslint-disable global-require */
  const headsOptions = [
    { userName: 'Jane Foster' },
    { userName: 'Donna Frank' },
    { userName: 'Gabrielle Robertson' },
    { userName: 'Lori Spears' },
    { userName: 'Sandy Vega' },
    { userName: 'Cheryl May' }
  ]
  /* eslint-enable global-require */

  return {
    trainingLocal,
    resetTrainingLocal,
    statusOptions,

    // UI
    headsOptions,
    onSubmit
  }
}
