<template>
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
          无权访问该页面 🔐
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
            alt="Not authorized page"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { BLink, BImg, BButton } from 'bootstrap-vue'
import Logo from '@core/layouts/components/Logo.vue'
import store from '@/store/index'

export default {
  components: {
    BLink,
    BImg,
    BButton,
    Logo
  },
  data () {
    return {
      downImg: require('@/assets/images/pages/not-authorized.svg')
    }
  },
  computed: {
    imgUrl () {
      if (store.state.appConfig.layout.skin === 'dark') {
        this.downImg = require('@/assets/images/pages/not-authorized-dark.svg')
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
