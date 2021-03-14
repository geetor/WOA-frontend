import { ref, watch } from '@vue/composition-api'
// import store from '@/store'

export default function useTaskHandler(props, emit) {
  // ------------------------------------------------
  // taskLocal
  // ------------------------------------------------
  const taskLocal = ref(JSON.parse(JSON.stringify(props.task.value)))
  const resetTaskLocal = () => {
    taskLocal.value = JSON.parse(JSON.stringify(props.task.value))
  }
  watch(props.task, () => {
    resetTaskLocal()
  })

  // ------------------------------------------------
  // isEventHandlerSidebarActive
  // * Clear form if sidebar is closed
  // ! We can hide it using @hidden event
  // ------------------------------------------------
  // watch(props.isEventHandlerSidebarActive, val => {
  //   // ? Don't reset event till transition is finished
  //   if (!val) {
  //     setTimeout(() => {
  //       clearForm.value()
  //     }, 350)
  //   }
  // })

  const onSubmit = () => {
    const taskData = JSON.parse(JSON.stringify(taskLocal))

    // * If event has id => Edit Event
    // Emit event for add/update event
    if (props.task.value.id) emit('update-task', taskData.value)
    else emit('add-task', taskData.value)

    // Close sidebar
    emit('update:is-task-handler-sidebar-active', false)
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  // ------------------------------------------------
  // guestOptions
  // ------------------------------------------------

  /* eslint-disable global-require */
  const assigneeOptions = [
    { avatar: require('@/assets/images/avatars/1-small.png'), fullName: 'Jane Foster' },
    { avatar: require('@/assets/images/avatars/3-small.png'), fullName: 'Donna Frank' },
    { avatar: require('@/assets/images/avatars/5-small.png'), fullName: 'Gabrielle Robertson' },
    { avatar: require('@/assets/images/avatars/7-small.png'), fullName: 'Lori Spears' },
    { avatar: require('@/assets/images/avatars/9-small.png'), fullName: 'Sandy Vega' },
    { avatar: require('@/assets/images/avatars/11-small.png'), fullName: 'Cheryl May' },
  ]
  /* eslint-enable global-require */

  const resolveAvatarVariant = tags => {
    if (tags.includes('跑步')) return 'primary'
    if (tags.includes('越野')) return 'warning'
    if (tags.includes('试飞')) return 'success'
    if (tags.includes('体锻')) return 'danger'
    if (tags.includes('演习')) return 'info'
    return 'primary'
  }

  const tagOptions = [
    { label: '跑步', value: '跑步' },
    { label: '越野', value: '越野' },
    { label: '试飞', value: '试飞' },
    { label: '体锻', value: '体锻' },
    { label: '演习', value: '演习' },
  ]

  return {
    taskLocal,
    resetTaskLocal,

    // UI
    assigneeOptions,
    resolveAvatarVariant,
    tagOptions,
    onSubmit,
  }
}
