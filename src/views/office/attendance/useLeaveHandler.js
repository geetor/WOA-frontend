import { ref, watch } from '@vue/composition-api'

export default function useLeaveHandler (props, emit) {
  // ------------------------------------------------
  // leaveLocal
  // ------------------------------------------------
  const leaveLocal = ref(JSON.parse(JSON.stringify(props.leave.value)))
  const resetLeaveLocal = () => {
    leaveLocal.value = JSON.parse(JSON.stringify(props.leave.value))
  }
  watch(props.leave, () => {
    resetLeaveLocal()
  })

  const onSubmit = () => {
    const leaveData = JSON.parse(JSON.stringify(leaveLocal))

    emit('ask-for-leave', leaveData.value)

    // Close sidebar
    emit('update:is-leave-handler-sidebar-active', false)
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const leaveTypes = [
    {
      label: '病假',
      value: '病假'
    },
    {
      label: '事假',
      value: '事假'
    },
    {
      label: '年假',
      value: '年假'
    },
    {
      label: '调休',
      value: '调休'
    }
  ]

  return {
    leaveLocal,
    resetLeaveLocal,

    // UI
    leaveTypes,
    onSubmit
  }
}
