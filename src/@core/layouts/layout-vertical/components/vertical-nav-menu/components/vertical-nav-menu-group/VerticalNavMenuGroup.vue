<template>
  <li
      v-if="canViewVerticalNavMenuGroup(item)"
      class="nav-item has-sub"
      :class="{
      'open': isOpen,
      'disabled': item.disabled,
      'sidebar-group-active': isActive,
    }"
  >
    <b-link
        class="d-flex align-items-center"
        @click="() => updateGroupOpen(!isOpen)"
    >
      <feather-icon :icon="item.icon || 'CircleIcon'"/>
      <span class="menu-title text-truncate">{{ item.title }}</span>
      <b-badge
          v-if="item.tag"
          pill
          :variant="item.tagVariant || 'primary'"
          class="mr-1 ml-auto"
      >
        {{ item.tag }}
      </b-badge>
    </b-link>
    <b-collapse
        v-model="isOpen"
        class="menu-content"
        tag="ul"
    >
      <component
          :is="resolveNavItemComponent(child)"
          v-for="child in item.children"
          :key="child.header || child.title"
          ref="groupChild"
          :item="child"
      />
    </b-collapse>
  </li>
</template>

<script>
import { BLink, BBadge, BCollapse } from 'bootstrap-vue'
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from '@core/layouts/utils'
import VerticalNavMenuHeader from '../vertical-nav-menu-header'
import VerticalNavMenuLink from '../vertical-nav-menu-link/VerticalNavMenuLink.vue'

// Composition Function
import useVerticalNavMenuGroup from './useVerticalNavMenuGroup'
import mixinVerticalNavMenuGroup from './mixinVerticalNavMenuGroup'

export default {
  name: 'VerticalNavMenuGroup',
  components: {
    VerticalNavMenuHeader,
    VerticalNavMenuLink,
    BLink,
    BBadge,
    BCollapse
  },
  mixins: [mixinVerticalNavMenuGroup],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const {
      isOpen,
      isActive,
      updateGroupOpen,
      updateIsActive
    } = useVerticalNavMenuGroup(props.item)

    const canViewVerticalNavMenuGroup = item => {
      // ! This same logic is used in canViewHorizontalNavMenuGroup and canViewHorizontalNavMenuHeaderGroup. So make sure to update logic in them as well
      return item.children.some(i => {
        let canView = true
        const adminRoutes = ['management-user', 'management-department', 'management-document']
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData.userRole === '用户' && adminRoutes.includes(i.route)) {
          canView = false
        }
        return canView
      })
    }

    return {
      resolveNavItemComponent,
      isOpen,
      isActive,
      updateGroupOpen,
      updateIsActive,

      // ACL
      canViewVerticalNavMenuGroup
    }
  },
}
</script>

<style>

</style>
