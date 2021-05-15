<template>
  <!-- Coming soon page-->
  <div class="misc-wrapper">
    <b-link class="brand-logo">
      <logo/>
      <h2 class="brand-text text-primary">
        西宁舰办公系统
      </h2>
    </b-link>

    <div class="misc-inner p-2 p-sm-3">
      <div class="w-100 text-center">
        <h2 class="mb-1">
          很快回来 🚀
        </h2>

        <b-button
            variant="primary"
            class="mb-2 btn-sm-block"
            :to="{path:'/'}"
        >
          返回首页
        </b-button>

        <b-img
            fluid
            center
            :src="imgUrl"
            alt="Coming soon page"
        />
      </div>
    </div>
  </div>
  <!-- / Coming soon page-->
</template>

<script>
import {
  BLink, BForm, BFormInput, BButton, BImg,
} from 'bootstrap-vue'
import Logo from '@core/layouts/components/Logo.vue'
import store from '@/store/index'

export default {
  components: {
    Logo,
    BLink,
    BForm,
    BButton,
    BFormInput,
    BImg
  },
  data () {
    return {
      downImg: require('@/assets/images/pages/coming-soon.svg'),
    }
  },
  computed: {
    imgUrl () {
      if (store.state.appConfig.layout.skin === 'dark') {
        this.downImg = require('@/assets/images/pages/coming-soon-dark.svg')
        return this.downImg
      }
      return this.downImg
    }
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>
