<template>
  <div style="height: inherit">

    <!--UserList-->
    <div class="training-list">
      <vue-perfect-scrollbar
        :settings="perfectScrollbarSettings"
        class="training-user-list scroll-area"
      >
        <user-list
          ref="refUserList"
          :is-user-add-sidebar-active.sync="isUserAddSidebarActive"
          @edit-user="editUser"
          @del-user="delUser"
        />
      </vue-perfect-scrollbar>
    </div>
    <!-- Add Handler -->
    <user-add-sidebar
      v-model="isUserAddSidebarActive"
      :add="add"
      :clear-add-data="clearAddData"
      @ask-for-add="askForAdd"
      @ask-for-edit="askForEdit"
    />

  </div>
</template>

<script>
import { onUnmounted, ref } from '@vue/composition-api'
import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
import UserManageSidebar from './UserManageSidebar.vue'
import UserList from './UserList'
import UserAddSidebar from './UserAddSidebar.vue'
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
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import store from '@/store'
import useStoreModule from './userStoreModule'

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

    // 3rd Party
    VuePerfectScrollbar,

    // App SFC
    UserManageSidebar,
    UserList,
    UserAddSidebar
  },
  setup() {
    const USER_MANAGE_STORE_MODULE_NAME = 'manage-user'

    // Register module
    if (!store.hasModule(USER_MANAGE_STORE_MODULE_NAME)) store.registerModule(USER_MANAGE_STORE_MODULE_NAME, useStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_MANAGE_STORE_MODULE_NAME)) store.unregisterModule(USER_MANAGE_STORE_MODULE_NAME)
    })

    const perfectScrollbarSettings = {
      maxScrollbarLength: 150
    }

    const isUserAddSidebarActive = ref(false)

    const toast = useToast()
    const refUserList = ref(null)
    const refetchUserList = () => {
      refUserList.value.refetchData()
    }

    const blankAdd = {
      userName: '',
      admin: false,
      userRank: 0,
      userGender: '',
      userPhone: '',
      userEmail: '',
      userStatus: '',
      userPassword: '',
      userDepts: [],
      isEdit: false
    }

    const add = ref(JSON.parse(JSON.stringify(blankAdd)))
    const clearAddData = () => {
      add.value = JSON.parse(JSON.stringify(blankAdd))
    }

    const askForAdd = val => {
      store.dispatch('manage-user/askForAdd', val)
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
            refetchUserList()
          } else {
            toast({
              component: ToastificationContent,
              props: {
                title: '错误',
                icon: 'AlertTriangleIcon',
                variant: 'danger',
              },
            },
              { position: 'bottom-right' })
          }
        })
    }

    const askForEdit = val => {
      store.dispatch('manage-user/askForEdit', val)
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
            refetchUserList()
          } else {
            toast({
              component: ToastificationContent,
              props: {
                title: '错误',
                icon: 'AlertTriangleIcon',
                variant: 'danger',
              },
            },
              { position: 'bottom-right' })
          }
        })
    }

    const editUser = val => {
      isUserAddSidebarActive.value = true
      add.value = JSON.parse(JSON.stringify(val))
      add.value.userPassword = ''
      add.value.isEdit = true
    }

    const delUser = val => {
      store.dispatch('manage-user/askForDel', val)
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
            refetchUserList()
          } else {
            toast({
              component: ToastificationContent,
              props: {
                title: '错误',
                icon: 'AlertTriangleIcon',
                variant: 'danger',
              },
            },
              { position: 'bottom-right' })
          }
        })
    }

    return {
      add,
      askForAdd,
      askForEdit,
      clearAddData,
      editUser,
      delUser,
      refUserList,

      // UI
      perfectScrollbarSettings,
      isUserAddSidebarActive
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<style lang="scss">
@import "~@core/scss/base/pages/office-training.scss";
</style>
