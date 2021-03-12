<template>
  <b-navbar-nav class="nav">
    <b-nav-item
      v-for="(bookmark, index) in bookmarks"
      :id="`bookmark-${index}`"
      :key="index"
      :to="bookmark.route"
    >
      <feather-icon
        :icon="bookmark.icon"
        size="21"
      />
      <b-tooltip
        triggers="hover"
        :target="`bookmark-${index}`"
        :title="bookmark.title"
        :delay="{ show: 1000, hide: 50 }"
      />
    </b-nav-item>

  </b-navbar-nav>
</template>

<script>
import {
  BNavbarNav, BNavItem, BTooltip,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import searchAndBookmarkData from '../search-and-bookmark-data'

export default {
  components: {
    BNavbarNav, BNavItem, BTooltip,
  },
  setup() {
    const bookmarks = ref(searchAndBookmarkData.pages.data.filter(page => page.isBookmarked))
    const currentSelected = ref(-1)

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
    }

    const toggleBookmarked = item => {
      // Find Index of item/page in bookmarks' array
      const pageIndexInBookmarks = bookmarks.value.findIndex(i => i.route === item.route)

      // If index is > -1 => Item is bookmarked => Remove item from bookmarks array using index
      // Else => Item is not bookmarked => Add item to bookmarks' array
      if (pageIndexInBookmarks > -1) {
        bookmarks.value[pageIndexInBookmarks].isBookmarked = false
        bookmarks.value.splice(pageIndexInBookmarks, 1)
      } else {
        bookmarks.value.push(item)
        bookmarks.value[bookmarks.value.length - 1].isBookmarked = true
      }
    }

    return {
      bookmarks,
      perfectScrollbarSettings,
      currentSelected,
      toggleBookmarked,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';

ul
{
  list-style: none;
  padding: 0;
  margin: 0;
}
p {
  margin: 0;
}

.nav-bookmar-content-overlay {
    position: fixed;
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-transition: all 0.7s;
    transition: all 0.7s;
    z-index: -1;

    &:not(.show) {
      pointer-events: none;
    }

    &.show {
      cursor: pointer;
      z-index: 10;
      opacity: 1;
    }
}
</style>
