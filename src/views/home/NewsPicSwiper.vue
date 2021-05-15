<template>
    <b-card>
        <b-carousel
                id="carousel-interval"
                no-hover-pause
                controls
                indicators
                :interval="5000"
                height="3000"
        >
            <b-carousel-slide :img-src="require('@/assets/images/naval-fleet/0.png')" />
            <b-carousel-slide :img-src="require('@/assets/images/naval-fleet/1.jpeg')" />
            <b-carousel-slide :img-src="require('@/assets/images/naval-fleet/2.jpg')" />
        </b-carousel>
    </b-card>
</template>

<script>
    import { BCard, BCarousel, BCarouselSlide, BCardText} from 'bootstrap-vue'

    export default {
        components: {
            BCard,
            BCarousel,
            BCarouselSlide,
            BCardText,
        },
        data() {
            return {
            }
        },
    }
</script>

<style lang="scss" scoped>
  #carousel-interval ::v-deep .carousel-indicators li {
    background-color: #7ab8cc !important;
  }
</style>
