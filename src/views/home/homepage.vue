<template>
  <section id="homepage-home">
    <b-row class="match-height">
      <b-col>
        <news-swiper />
      </b-col>

      <b-col >
        <bulletin-table :table-data="newsList" :card-title="bulletinTitle[0]" />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col cols="4">
        <notice-timeline :timeline-data="noticeList"/>
      </b-col>
      <b-col>
        <bulletin-table :table-data="regulationList" :card-title="bulletinTitle[2]"/>
      </b-col>
      <b-col>
        <bulletin-table :table-data="activityList" :card-title="bulletinTitle[3]"/>
      </b-col>
    </b-row>
    <b-row class="match-height">
      <b-col
      >
        <card-statistics-group />
      </b-col>
    </b-row>
    </section>
</template>

<script>
    import { BRow, BCol } from 'bootstrap-vue'
    import { kFormatter } from '@core/utils/filter'
    import NoticeTimeline from "./NoticeTimeline"
    import BulletinTable from "./BulletinTable"
    import NewsSwiper from './NewsPicSwiper.vue'
    import '@core/scss/vue/libs/swiper.scss'
    import CardStatisticsGroup from './CardStatisticsGroup.vue'

    export default {
        components: {
            BRow,
            BCol,
            NewsSwiper,
            BulletinTable,
            NoticeTimeline,
            CardStatisticsGroup,
        },
        data() {
            return {
                data: {},
                bulletinInfo: {},
                newsList: [],
                noticeList: [],
                regulationList: [],
                activityList: [],
                bulletinTitle:["相关新闻 ", "通知公告", "规章制度", "活动安排"],
            }
        },
        created() {
            // for (let i=0;i<4;i++){
            //     this.$http.get('/bulletin/getSimpleBulletinsByType',
            //         {params: {bulletinType: this.bulletinTitle[i]}})
            //         .then(response => {
            //             this.bulletinInfo[i] = response.data.data});
            // }
            this.$http.get('/bulletin/getSimpleBulletinsByType',
                {params: {bulletinType: this.bulletinTitle[0]}})
                .then(response => {
                    this.newsList = response.data.data});
            this.$http.get('/bulletin/getSimpleBulletinsByType',
                {params: {bulletinType: this.bulletinTitle[1]}})
                .then(response => {
                    this.noticeList = response.data.data});
            this.$http.get('/bulletin/getSimpleBulletinsByType',
                {params: {bulletinType: this.bulletinTitle[2]}})
                .then(response => {
                    this.regulationList = response.data.data});
            this.$http.get('/bulletin/getSimpleBulletinsByType',
                {params: {bulletinType: this.bulletinTitle[3]}})
                .then(response => {
                    this.activityList = response.data.data});
        },
        methods: {
            kFormatter,
        },
    }
</script>
