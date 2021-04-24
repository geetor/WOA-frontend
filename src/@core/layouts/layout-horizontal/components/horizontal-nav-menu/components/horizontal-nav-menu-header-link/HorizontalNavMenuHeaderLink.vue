<template>
  <li
      v-if="canViewHorizontalNavMenuHeaderLink(item)"
      class="nav-item"
      :class="{'sidebar-group-active active': isActive}"
  >
    <b-link
        class="nav-link align-items-center"
        :to="{ name: item.route }"
    >
      <feather-icon
          size="14"
          :icon="item.icon"
      />
      <span>{{ item.title }}</span>
    </b-link>
  </li>
</template>

<script>
import { BLink } from 'bootstrap-vue'
import useHorizontalNavMenuHeaderLink from './useHorizontalNavMenuHeaderLink'
import mixinHorizontalNavMenuHeaderLink from './mixinHorizontalNavMenuHeaderLink'

export default {
  components: {
    BLink,
  },
  mixins: [mixinHorizontalNavMenuHeaderLink],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup (props) {
    const {
      isActive,
      updateIsActive
    } = useHorizontalNavMenuHeaderLink(props.item)

    const canViewHorizontalNavMenuHeaderLink = item => {
      let canView = true

      const adminRoutes = ['management-user', 'management-department', 'management-document']
      const userData = JSON.parse(localStorage.getItem('userData'))
      if (userData.userRole === '用户' && adminRoutes.includes(item.route)) {
        canView = false
      }
      if (userData.deptCharger === false && item.route === 'office-leave') {
        canView = false
      }

      return canView
    }

    return {
      isActive,
      updateIsActive,

      // ACL
      canViewHorizontalNavMenuHeaderLink
    }
  },
}
</script>
