<template>
  <b-card no-body>
    <b-card-body class="d-flex align-items-center justify-content-center">
      <b-carousel
          id="carousel-interval"
          no-hover-pause
          controls
          indicators
          :interval="5000"
      >
        <b-carousel-slide :img-src="require('@/assets/images/naval-fleet/0.jpg')"/>
        <b-carousel-slide :img-src="require('@/assets/images/naval-fleet/1.jpg')"/>
        <b-carousel-slide :img-src="require('@/assets/images/naval-fleet/2.jpg')"/>
      </b-carousel>
    </b-card-body>
  </b-card>
</template>

<script>
import { BCard, BCardText, BCardBody, BCarousel, BCarouselSlide } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardText,
    BCardBody,
    BCarousel,
    BCarouselSlide
  }
}
</script>
