import { ref, watch } from '@vue/composition-api'

export default function useDepartmentAdd (props, emit) {
  // ------------------------------------------------
  // addLocal
  // ------------------------------------------------
  const addLocal = ref(JSON.parse(JSON.stringify(props.add.value)))
  const resetAddLocal = () => {
    addLocal.value = JSON.parse(JSON.stringify(props.add.value))
    addLocal.value.deptUsers = addLocal.value.deptUsers.map(item => item.userId)
  }
  watch(props.add, () => {
    resetAddLocal()
  })

  const onSubmit = () => {
    const addData = JSON.parse(JSON.stringify(addLocal))

    if (addData.value.isEdit) {
      emit('ask-for-edit', addData.value)
    } else {
      emit('ask-for-add', addData.value)
    }

    // Close sidebar
    emit('update:is-department-add-sidebar-active', false)
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const rankTypes = [
    {
      label: '1级',
      value: 1
    },
    {
      label: '2级',
      value: 2
    },
    {
      label: '3级',
      value: 3
    },
    {
      label: '4级',
      value: 4
    },
    {
      label: '5级',
      value: 5
    },
    {
      label: '6级',
      value: 6
    },
    {
      label: '7级',
      value: 7
    },
    {
      label: '8级',
      value: 8
    },
    {
      label: '9级',
      value: 9
    },
    {
      label: '10级',
      value: 10
    }
  ]

  return {
    addLocal,
    resetAddLocal,

    // UI
    rankTypes,

    onSubmit
  }
}
