import { ref, watch } from '@vue/composition-api'

export default function useUserAdd (props, emit) {
  // ------------------------------------------------
  // addLocal
  // ------------------------------------------------
  const addLocal = ref(JSON.parse(JSON.stringify(props.add.value)))
  const resetAddLocal = () => {
    addLocal.value = JSON.parse(JSON.stringify(props.add.value))
    addLocal.value.authors = addLocal.value.authors.map(item => item.userId)
    addLocal.value.depts = addLocal.value.depts.map(item => item.deptId)
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
    emit('update:is-document-add-sidebar-active', false)
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const typeOptions = [
    {
      label: '男',
      value: '男'
    },
    {
      label: '女',
      value: '女'
    }
  ]
  const statusTypes = [
    {
      label: '退役',
      value: '退役'
    },
    {
      label: '现役',
      value: '现役'
    }
  ]
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
  const openTypes = [
    {
      label: '是',
      value: true
    },
    {
      label: '否',
      value: false
    }
  ]
  const deptsTypes = [
    {
      text: '人事部门',
      value: 1
    },
    {
      text: '驾驶部门',
      value: 2
    },
    {
      text: '后勤部门',
      value: 3
    },
    {
      text: '武装部门',
      value: 4
    },
    {
      text: '管理部门',
      value: 5
    }
  ]

  return {
    addLocal,
    resetAddLocal,

    // UI
    openTypes,
    typeOptions,
    statusTypes,
    rankTypes,
    deptsTypes,
    onSubmit
  }
}
