<template>
    <b-card no-body>
        <b-card-header
                class="email-detail-head"
        >
            <div class="user-details d-flex justify-content-between align-items-center flex-wrap">
                <b-avatar
                        size="48"
                        class="mr-75"
                />
                <div class="mail-items">
                    <h5 class="mb-0">
                       {{message.bulletinPublisher}}
                    </h5>
                </div>
            </div>
            <div class="mail-meta-item d-flex align-items-center">
                <small class="mail-date-time text-muted">{{message.issuingTime}}</small>
                <!-- Mail Action DD -->
                <b-dropdown
                        variant="link"
                        no-caret
                        toggle-class="p-0"
                        right
                >
                    <template #button-content>
                        <feather-icon
                                icon="MoreVerticalIcon"
                                size="17"
                                class="ml-50 text-body"
                        />
                    </template>

                    <b-dropdown-item>
                        <feather-icon icon="CornerUpLeftIcon" />
                        <span class="align-middle ml-50">Reply</span>
                    </b-dropdown-item>

                    <b-dropdown-item>
                        <feather-icon icon="CornerUpRightIcon" />
                        <span class="align-middle ml-50">Forward</span>
                    </b-dropdown-item>

                    <b-dropdown-item>
                        <feather-icon icon="TrashIcon" />
                        <span class="align-middle ml-50">Delete</span>
                    </b-dropdown-item>
                </b-dropdown>
            </div>
        </b-card-header>

        <b-card-body class="mail-message-wrapper pt-2">
            <!-- eslint-disable vue/no-v-html -->
            <div
                    class="mail-message"
                    v-html="message.bulletinContent"
            />
            <!-- eslint-enable -->
        </b-card-body>
    </b-card>
</template>

<script>
    import {
        BDropdown, BDropdownItem, BCard, BCardHeader, BCardBody, BCardFooter, BAvatar, BLink, BImg,
    } from 'bootstrap-vue'
    import { formatDate } from '@core/utils/filter'

    export default {
        components: {
            BDropdown, BDropdownItem, BCard, BCardHeader, BCardBody, BCardFooter, BAvatar, BLink, BImg,
        },
        props: {
            message: {
                type: Object,
                required: true,
            },
        },
        setup() {
            return {
                formatDate,
            }
        },
    }
</script>

<style>

</style>

