<template>
  <div style="height: inherit">

    <!--DocumentList-->
    <div class="training-list">
      <vue-perfect-scrollbar
        :settings="perfectScrollbarSettings"
        class="training-document-list scroll-area"
      >
        <document-list
          ref="refDocumentList"
          :is-document-add-sidebar-active.sync="isDocumentAddSidebarActive"
          @edit-document="editDocument"
          @del-document="delDocument"
          @close-left-sidebar="mqShallShowLeftSidebar = false"
        />
      </vue-perfect-scrollbar>
    </div>
    <!-- Add Handler -->
    <document-add-sidebar
      v-model="isDocumentAddSidebarActive"
      :add="add"
      :allUsers="users"
      :allDepts="departments"
      :clear-add-data="clearAddData"
      @ask-for-add="askForAdd"
      @ask-for-edit="askForEdit"
    />
  </div>
</template>

<script>
import { onUnmounted, ref } from '@vue/composition-api'
import DocumentList from './DocumentList'
import DocumentAddSidebar from './DocumentAddSidebar.vue'
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
import documentStoreModule from './documentStoreModule'

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
    DocumentList,
    DocumentAddSidebar
  },
  setup() {
    const DOCUMENT_MANAGE_STORE_MODULE_NAME = 'manage-document'

    // Register module
    if (!store.hasModule(DOCUMENT_MANAGE_STORE_MODULE_NAME)) store.registerModule(DOCUMENT_MANAGE_STORE_MODULE_NAME, documentStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(DOCUMENT_MANAGE_STORE_MODULE_NAME)) store.unregisterModule(DOCUMENT_MANAGE_STORE_MODULE_NAME)
    })

    const perfectScrollbarSettings = {
      maxScrollbarLength: 150
    }

    const isDocumentAddSidebarActive = ref(false)

    const toast = useToast()
    const refDocumentList = ref(null)
    const refetchDocumentList = () => {
      refDocumentList.value.refetchData()
    }

    const blankAdd = {
      documentId: '',
      documentTitle: '',
      open: false,
      documentRank: 0,
      documentType: '',
      authors: [],
      depts: [],
      documentSubject: '',
      documentContent: '',
      issuingTime: '',
      modifiedTime: [],
      isEdit: false,
    }

    const add = ref(JSON.parse(JSON.stringify(blankAdd)))
    const clearAddData = () => {
      add.value = JSON.parse(JSON.stringify(blankAdd))
    }

    const askForAdd = val => {
      store.dispatch('manage-document/askForAdd', val)
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
            refetchDocumentList()
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
      store.dispatch('manage-document/askForEdit', val)
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
            refetchDocumentList()
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

    const editDocument = val => {
      isDocumentAddSidebarActive.value = true
      add.value = JSON.parse(JSON.stringify(val))
      add.value.documentPassword = ''
      add.value.isEdit = true
    }

    const delDocument = val => {
      store.dispatch('manage-document/askForDel', val)
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
            refetchDocumentList()
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
    const users = ref([])
    const fetchUsers = () => {
      store.dispatch('manage-document/fetchUsers')
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
    const departments = ref([])
    const fetchDepartments = () => {
      store.dispatch('manage-document/fetchDepartments')
        .then(response => {
          departments.value = response.data.data.depts.map(item => {
            return {
              text: item.deptName,
              value: item.deptId
            }
          })
        })
    }
    fetchDepartments()

    return {
      add,
      askForAdd,
      askForEdit,
      clearAddData,
      editDocument,

      delDocument,
      refDocumentList,
      users,
      departments,
      // UI
      perfectScrollbarSettings,
      isDocumentAddSidebarActive
    }
  }
}
</script>

<style lang="scss">
@import "~@core/scss/base/pages/office-training.scss";
</style>
