<template>
  <div style="height: inherit">

    <!-- Department List -->
    <department-list
        ref="refDepartmentList"
        :is-department-add-sidebar-active.sync="isDepartmentAddSidebarActive"
        @edit-department="editDepartment"
        @del-department="delDepartment"
    />

    <!-- Add Handler -->
    <department-add-sidebar
        v-model="isDepartmentAddSidebarActive"
        :add="add"
        :allUsers="users"
        :clear-add-data="clearAddData"
        @ask-for-add="askForAdd"
        @ask-for-edit="askForEdit"
    />

  </div>
</template>

<script>
import { onUnmounted, ref } from '@vue/composition-api'
import {
  BDropdown,
  BDropdownItem,
  BFormCheckbox,
  BFormInput,
  BInputGroup,
  BInputGroupPrepend,
  BMedia,
  BMediaAside,
  BMediaBody,
  BBadge,
  BAvatar
} from 'bootstrap-vue'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import store from '@/store'
import DepartmentList from './DepartmentList'
import DepartmentAddSidebar from './DepartmentAddSidebar.vue'
import departmentStoreModule from './departmentStoreModule'

export default {
  components: {
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BDropdown,
    BDropdownItem,
    BFormCheckbox,
    BMedia,
    BMediaAside,
    BMediaBody,
    BBadge,
    BAvatar,

    // App SFC
    DepartmentList,
    DepartmentAddSidebar
  },
  setup () {
    const DEPARTMENT_MANAGE_STORE_MODULE_NAME = 'manage-department'

    // Register module
    if (!store.hasModule(DEPARTMENT_MANAGE_STORE_MODULE_NAME)) store.registerModule(DEPARTMENT_MANAGE_STORE_MODULE_NAME, departmentStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(DEPARTMENT_MANAGE_STORE_MODULE_NAME)) store.unregisterModule(DEPARTMENT_MANAGE_STORE_MODULE_NAME)
    })

    const isDepartmentAddSidebarActive = ref(false)
    const toast = useToast()
    const refDepartmentList = ref(null)
    const refetchDepartmentList = () => {
      refDepartmentList.value.refetchData()
    }

    const blankAdd = {
      deptName: '',
      deptRank: 0,
      deptUsers: [],
      depts: [],
      isEdit: false
    }

    const add = ref(JSON.parse(JSON.stringify(blankAdd)))
    const clearAddData = () => {
      add.value = JSON.parse(JSON.stringify(blankAdd))
    }

    const askForAdd = val => {
      store.dispatch('manage-department/askForAdd', val)
      .then((response) => {
        if (response.status === 201) {
          toast({
            component: ToastificationContent,
            props: {
              title: `新增成功`,
              icon: 'CoffeeIcon',
              variant: 'success'
            }
          })
          refetchDepartmentList()
        } else {
          toast({
                component: ToastificationContent,
                props: {
                  title: '错误',
                  icon: 'AlertTriangleIcon',
                  variant: 'danger'
                }
              },
              { position: 'bottom-right' })
        }
      })
    }

    const askForEdit = val => {
      store.dispatch('manage-department/askForEdit', val)
      .then((response) => {
        if (response.status === 201) {
          toast({
            component: ToastificationContent,
            props: {
              title: `修改成功`,
              icon: 'CoffeeIcon',
              variant: 'success'
            }
          })
          refetchDepartmentList()
        } else {
          toast({
                component: ToastificationContent,
                props: {
                  title: '错误',
                  icon: 'AlertTriangleIcon',
                  variant: 'danger'
                }
              },
              { position: 'bottom-right' })
        }
      })
    }

    const editDepartment = val => {
      isDepartmentAddSidebarActive.value = true
      add.value = JSON.parse(JSON.stringify(val))
      add.value.isEdit = true
    }

    const delDepartment = val => {
      store.dispatch('manage-department/askForDel', val)
      .then((response) => {
        if (response.status === 201) {
          toast({
            component: ToastificationContent,
            props: {
              title: `删除成功`,
              icon: 'CoffeeIcon',
              variant: 'success'
            }
          })
          refetchDepartmentList()
        } else {
          toast({
                component: ToastificationContent,
                props: {
                  title: '错误',
                  icon: 'AlertTriangleIcon',
                  variant: 'danger'
                }
              },
              { position: 'bottom-right' })
        }
      })
    }

    const users = ref([])
    const fetchUsers = () => {
      store.dispatch('manage-department/fetchUsers')
      .then(response => {
        users.value = response.data.data.users.map(item => {
          return {
            text: item.userName,
            value: item.userId
          }
        })
      })
    }
    fetchUsers()

    return {
      add,
      askForAdd,
      askForEdit,
      clearAddData,
      editDepartment,
      delDepartment,
      refDepartmentList,
      users,

      // UI
      isDepartmentAddSidebarActive
    }
  }
}
</script>
