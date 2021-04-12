<template>
  <li
      v-if="canViewHorizontalNavMenuLink(item)"
      :class="{
      'active': isActive,
      'disabled': item.disabled
    }"
  >
    <b-link
        v-bind="linkProps"
        class="dropdown-item"
    >
      <feather-icon
          :icon="item.icon || 'CircleIcon'"
          size="24"
      />
      <span class="menu-title">{{ item.title }}</span>
    </b-link>
  </li>
</template>

<script>
import { BLink } from 'bootstrap-vue'
import { useUtils as useAclUtils } from '@core/libs/acl'
import useHorizontalNavMenuLink from './useHorizontalNavMenuLink'
import mixinHorizontalNavMenuLink from './mixinHorizontalNavMenuLink'
import { can } from '@core/libs/acl/utils'

export default {
  components: {
    BLink,
  },
  mixins: [mixinHorizontalNavMenuLink],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup (props) {
    const {
      isActive,
      linkProps,
      updateIsActive
    } = useHorizontalNavMenuLink(props.item)

    const canViewHorizontalNavMenuLink = item => {
      let canView = true

      const adminRoutes = ['management-user', 'management-department', 'management-document']
      const userData = JSON.parse(localStorage.getItem('userData'))
      if (userData.userRole === '用户' && adminRoutes.includes(item.route)) {
        canView = false
      }

      return canView
    }

    return {
      isActive,
      linkProps,
      updateIsActive,

      // ACL
      canViewHorizontalNavMenuLink
    }
  },

}
</script>
