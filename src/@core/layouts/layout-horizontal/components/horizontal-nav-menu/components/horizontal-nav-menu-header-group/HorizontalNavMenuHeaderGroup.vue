<template>
  <li
    v-if="canViewHorizontalNavMenuHeaderGroup(item)"
    class="dropdown nav-item"
    :class="{
      'sidebar-group-active active open': isActive,
      'show': isOpen,
    }"
    @mouseenter="() => updateGroupOpen(true)"
    @mouseleave="() => updateGroupOpen(false)"
  >
    <b-link class="nav-link dropdown-toggle d-flex align-items-center">
      <feather-icon
        size="14"
        :icon="item.icon"
      />
      <span>{{ item.header }}</span>
    </b-link>
    <ul class="dropdown-menu">
      <component
        :is="resolveHorizontalNavMenuItemComponent(child)"
        v-for="child in item.children"
        :key="child.title"
        :item="child"
      />
    </ul>
  </li>
</template>

<script>
import { BLink } from 'bootstrap-vue'
import { resolveHorizontalNavMenuItemComponent } from '@core/layouts/utils'
import useHorizontalNavMenuHeaderGroup from './useHorizontalNavMenuHeaderGroup'
import mixinHorizontalNavMenuHeaderGroup from './mixinHorizontalNavMenuHeaderGroup'

import HorizontalNavMenuGroup from '../horizontal-nav-menu-group/HorizontalNavMenuGroup.vue'
import HorizontalNavMenuLink from '../horizontal-nav-menu-link/HorizontalNavMenuLink.vue'

export default {
  components: {
    BLink,
    HorizontalNavMenuGroup,
    HorizontalNavMenuLink,
  },
  mixins: [mixinHorizontalNavMenuHeaderGroup],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const {
      isActive,
      updateIsActive,
      isOpen,
      updateGroupOpen,
    } = useHorizontalNavMenuHeaderGroup(props.item)

    const canViewHorizontalNavMenuGroup = item => {
      // ! This same logic is used in canViewHorizontalNavMenuGroup and canViewHorizontalNavMenuHeaderGroup. So make sure to update logic in them as well
      return item.children.some(i => {
        let canView = true
        const adminRoutes = ['management-user', 'management-department', 'management-document']
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData.userRole === '用户' && adminRoutes.includes(i.route)) {
          canView = false
        }
        if (userData.deptCharger === false && i.route === 'office-leave') {
          canView = false
        }
        return canView
      })
    }

    const canViewHorizontalNavMenuLink = item => {
      let canView = true

      const adminRoutes = ['management-user', 'management-department', 'management-document']
      const userData = JSON.parse(localStorage.getItem('userData'))
      if (userData.userRole === '用户' && adminRoutes.includes(item.route)) {
        canView = false
      }

      return canView
    }

    const canViewHorizontalNavMenuHeaderGroup = item => {
      // ? Same logic as canViewVerticalNavMenuGroup
      return item.children.some(grpOrItem => {
        // If it have children => It's grp
        // Call ACL function based on grp/link
        return grpOrItem.children ? canViewHorizontalNavMenuGroup(grpOrItem) : canViewHorizontalNavMenuLink(grpOrItem)
      })
    }

    return {
      isOpen,
      isActive,
      updateGroupOpen,
      updateIsActive,
      resolveHorizontalNavMenuItemComponent,

      // ACL
      canViewHorizontalNavMenuHeaderGroup
    }
  },
}
</script>
