<template>
  <div style="height: inherit">

    <div
        class="body-content-overlay"
        :class="{'show': mqShallShowLeftSidebar}"
        @click="mqShallShowLeftSidebar = false"
    />

    <div class="training-list">
      <vue-perfect-scrollbar
          :settings="perfectScrollbarSettings"
          class="training-user-list scroll-area"
      >
        <user-list />
      </vue-perfect-scrollbar>
    </div>

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <training-left-sidebar
          :shall-show-training-compose-modal="shallShowTrainingComposeModal"
          :departments="departments"
          :users-meta="usersMeta"
          :class="{'show': mqShallShowLeftSidebar}"
          @close-left-sidebar="mqShallShowLeftSidebar = false"
      />
    </portal>

  </div>
</template>

<script>
import { onUnmounted, ref } from '@vue/composition-api'

import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
import TrainingLeftSidebar from './TrainingLeftSidebar.vue'
import UserList from './UserList'
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
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import store from '@/store'
import trainingStoreModule from '@/views/office/training/trainingStoreModule'

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
    TrainingLeftSidebar,
    UserList
  },
  setup () {
    const TRAINING_STORE_MODULE_NAME = 'office-training-statistic'

    // Register module
    if (!store.hasModule(TRAINING_STORE_MODULE_NAME)) store.registerModule(TRAINING_STORE_MODULE_NAME, trainingStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(TRAINING_STORE_MODULE_NAME)) store.unregisterModule(TRAINING_STORE_MODULE_NAME)
    })

    // Departments & UsersMeta
    const departments = ref([])
    const usersMeta = ref({})

    const perfectScrollbarSettings = {
      maxScrollbarLength: 150
    }

    const fetchDepartments = () => {
      store.dispatch('office-training-statistic/fetchDepartments')
      .then(response => {
        departments.value = response.data.departments
        usersMeta.value = response.data.usersMeta
      })
    }
    fetchDepartments()

    // Compose
    const shallShowTrainingComposeModal = ref(false)

    // Left Sidebar Responsiveness
    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()

    return {
      // UI
      perfectScrollbarSettings,

      // Departments & UsersMeta
      departments,
      usersMeta,

      // Compose
      shallShowTrainingComposeModal,

      // Left Sidebar Responsiveness
      mqShallShowLeftSidebar
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
@import "~@core/scss/base/pages/office-training.scss";
</style>
