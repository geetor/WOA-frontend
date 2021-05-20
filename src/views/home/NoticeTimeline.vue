<template>
    <b-card
            v-if="timelineData"
            no-body
    >
        <b-card-header>
            <div>
                <b-card-title style="font-weight: bolder">通知公告</b-card-title>
            </div>
            <feather-icon
                    icon="MoreVerticalIcon"
                    size="18"
                    class="cursor-pointer"
                    @click="moreBulletinInfo"
            />
        </b-card-header>

        <b-card-body>
            <app-timeline>
                <div v-for="item in timelineData"
                        :key="item.bulletinId">
                    <app-timeline-item id="timeline-bulletin">
                        <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
                            <h6>{{item.bulletinTitle}}</h6>
                            <small class="text-muted">{{item.issuingTime}}</small>
                        </div>
                        <p>暂无简要信息</p>
                    </app-timeline-item>
                </div>
            </app-timeline>
        </b-card-body>
    </b-card>
</template>

<script>
    import {
        BAvatar, BButton, BCollapse, VBToggle, BListGroup, BListGroupItem, BAvatarGroup, BBadge, VBTooltip,
        BCard, BCardHeader, BCardTitle, BCardText, BCardBody, BMediaAside, BMediaBody, BDropdown, BDropdownItem,
    } from 'bootstrap-vue'
    import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
    import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
    import Ripple from 'vue-ripple-directive'

    export default {
        components: {
            AppTimeline,
            AppTimelineItem,
            BAvatar,
            BButton,
            BCollapse,
            BListGroup,
            BListGroupItem,
            BAvatarGroup,
            BBadge,
            BCard,
            BCardHeader,
            BCardTitle,
            BCardText,
            BCardBody,
            BMediaAside,
            BMediaBody,
            BDropdown,
            BDropdownItem,
        },
        directives: { 'b-toggle': VBToggle, 'b-tooltip': VBTooltip, Ripple },
        data(){
            return {
            }
        },
        props:{
            timelineData: {
                type: Array,
                default: () => [],
            },
        },
        methods:{
            moreBulletinInfo(){
                this.$router.push({name:"bulletin-page",query:{selectedClass:'通知公告'}})
            }
        }
    }
</script>

<style lang="scss">
    #timeline-bulletin .text-muted{
        font-family: sans-serif !important;
    }
</style>
