<template>
    <div>

        <!-- content -->
        <b-row>
            <b-col class="offset-2" cols="8">
                <div class="blog-detail-wrapper">
                    <b-row>
                        <!-- blogs -->
                        <b-col cols="12">
                            <b-card>
                                <h2 class="doc-title">{{emailViewData.bulletinTitle}}</h2>
                                <b-media no-body>
                                    <b-media-aside
                                            vertical-align="center"
                                            class="mr-50"
                                    >
                                        <b-avatar
                                                href="javascript:void(0)"
                                                size="24"
                                                :src="docDetail.avatar"
                                        />
                                    </b-media-aside>
                                    <b-media-body>
                                        <small class="text-muted mr-50">来源: </small>
                                        <small>
                                            <span class="text-body">{{ emailViewData.bulletinPublisher }}</span>
                                        </small>
                                        <span class="text-muted ml-75 mr-50">|</span>
                                        <small class="text-muted">{{ emailViewData.issuingTime }}</small>

                                    </b-media-body>
                                </b-media>
                                <!-- eslint-disable vue/no-v-html -->
                                <div
                                        class="blog-content"
                                        v-html="emailViewData.bulletinContent"
                                />
                                <!-- eslint-enable -->
                                <hr class="my-2">

<!--                                <div>-->
<!--                                    <span class="viewed-number">浏览量: 1234</span>-->
<!--                                </div>-->
                            </b-card>
                        </b-col>
                    </b-row>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {
        BFormInput, BMedia, BAvatar, BMediaAside, BMediaBody, BImg, BLink, BFormGroup, BInputGroup, BInputGroupAppend,
        BCard, BRow, BCol, BBadge, BCardText, BDropdown, BDropdownItem, BForm, BFormTextarea, BFormCheckbox, BButton,BCardTitle
    } from 'bootstrap-vue'
    import Ripple from 'vue-ripple-directive'
    import { kFormatter } from '@core/utils/filter'
    import ContentWithSidebar from '@core/layouts/components/content-with-sidebar/ContentWithSidebar.vue'
    import axiosIns from "../../../libs/axios";

    export default {
        components: {
            BFormInput,
            BMedia,
            BAvatar,
            BMediaAside,
            BMediaBody,
            BLink,
            BCard,
            BRow,
            BCol,
            BFormGroup,
            BInputGroup,
            BInputGroupAppend,
            BImg,
            BBadge,
            BCardText,
            BDropdown,
            BForm,
            BDropdownItem,
            BFormTextarea,
            BFormCheckbox,
            BButton,
            BCardTitle,
            ContentWithSidebar,
        },
        directives: {
            Ripple,
        },
        data() {
            return {
                docDetail: {},
                emailViewData: {},
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
        methods: {
            kFormatter,
        },
        computed: {
        },
    }
</script>

<style lang="scss">
    @import '@core/scss/vue/pages/page-blog.scss';

    .doc-title {
        text-align: center;
        font-weight: bolder;
        color: black;
    }

    .blog-content p {
        color: #333;
        padding: 5px 20px;
    }

    .blog-content{
        margin-top: 40px;
        padding: 20px;
    }

    .viewed-number{
        text-align: right;
        display: block;
        font-size: 10px;
    }

</style>
