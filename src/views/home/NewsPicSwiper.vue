<template>
    <b-card>
        <b-carousel
                id="carousel-interval"
                no-hover-pause
                controls
                indicators
                :interval="5000"
        >
            <b-carousel-slide :img-src="require('@/assets/images/slider/04.jpg')" />
            <b-carousel-slide :img-src="require('@/assets/images/slider/05.jpg')" />
            <b-carousel-slide :img-src="require('@/assets/images/slider/06.jpg')" />
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
