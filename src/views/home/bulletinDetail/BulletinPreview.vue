<template>
    <div class="email-app-details">

        <!-- Email Header -->
        <div class="email-detail-header">

            <!-- Header: Left -->
            <div class="email-header-left d-flex align-items-center">
                <span class="go-back mr-1">
                  <feather-icon
                          :icon="$store.state.appConfig.isRTL ? 'ChevronRightIcon' : 'ChevronLeftIcon'"
                          size="20"
                          class="align-bottom"
                          @click="goback"
                  />
                </span>
                <h4 class="email-subject mb-0">
                    {{emailViewData.bulletinTitle}}
                </h4>
            </div>

        <!-- Email Details -->
            <vue-perfect-scrollbar
                    :settings="perfectScrollbarSettings"
                    class="email-scroll-area scroll-area"
            >
                <!-- Email Thread -->
                <b-row>
                    <b-col cols="12">
                        <bulletin-message-card :message="emailViewData" />
                    </b-col>
                </b-row>
            </vue-perfect-scrollbar>
            </div>
    </div>
</template>

<script>
    import {
        BDropdown, BDropdownItem, BRow, BCol, BBadge, BCard, BLink,
    } from 'bootstrap-vue'
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import { ref, watch } from '@vue/composition-api'
    import axiosIns from "../../../libs/axios";
    import BulletinMessageCard from "./BulletinMessageCard";

    export default {
        components: {

            // BSV
            BDropdown,
            BDropdownItem,
            BRow,
            BCol,
            BBadge,
            BCard,
            BLink,

            // 3rd Party
            VuePerfectScrollbar,

            // SFC
            BulletinMessageCard,
        },
        props: {
        },
        data(){
            return{
                emailViewData: {},
            }
        },
        setup(props)   {
            const perfectScrollbarSettings = {
                maxScrollbarLength: 150,
            }

            const showWholeThread = ref(false)

            return {

                // UI
                perfectScrollbarSettings,
                showWholeThread,
            }
        },
        created(){
            const that = this
            axiosIns.get('/bulletin/getBulletinById',
                {params: {bulletinId: this.$route.query.bulletinId}})
                .then(response => {
                    that.emailViewData = response.data.data
                    console.log(this.emailViewData)});
        },
        methods:{
            goback(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style>

</style>
