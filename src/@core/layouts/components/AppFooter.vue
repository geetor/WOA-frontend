<template>
  <p class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">
      Copyright ©{{ new Date().getFullYear() }}
      <b-link
        class="ml-25"
        href="https://www.nju.edu.cn/"
        target="_blank"
      >南京大学</b-link>
      <span class="d-none d-sm-inline-block">， All Rights Reserved.</span>
    </span>

  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>
