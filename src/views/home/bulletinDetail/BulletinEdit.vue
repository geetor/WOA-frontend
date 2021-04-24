<template>
    <b-card
            v-if="Object.keys(bulletinEdit).length"
            class="blog-edit-wrapper"
    >
        <!-- form -->
        <b-form class="mt-2 my-b-form">
            <b-row>
                <b-col md="6">
                    <b-form-group
                            label="标题"
                            label-for="blog-edit-title"
                            class="mb-2"
                    >
                        <b-form-input
                                id="blog-edit-title"
                                v-model="bulletinEdit.bulletinTitle"
                        />
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group
                            label="发布部门"
                            label-for="blog-edit-publisher"
                            class="mb-2"
                    >
                        <b-form-input
                                id="blog-edit-publisher"
                                v-model="bulletinEdit.bulletinPublisher"
                        />
                    </b-form-group>
                </b-col>

                <b-col md="6">
                <b-form-group
                        label="设置分类"
                        label-for="blog-edit-category"
                        class="mb-2"
                        @focus="pInput()"
                >
                    <v-select
                            id="blog-edit-category"
                            v-model="bulletinEdit.bulletinType"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="bulletinTypeOps"
                    />
                </b-form-group>
                </b-col>
                <b-col md="6">
                    <div>
                        <b-card-text class="mb-0">
                            置顶
                        </b-card-text>
                        <b-form-checkbox
                                v-model="bulletinEdit.top"
                                class="custom-control-primary"
                                name="check-button"
                                switch
                        />
                    </div>
                </b-col>
                <b-col cols="12">
                    <b-form-group
                            label="Content"
                            label-for="blog-content"
                            class="mb-2"
                    >
                        <quill-editor
                                id="blog-content"
                                v-model="bulletinEdit.bulletinContent"
                                :options="snowOption"
                        />
                    </b-form-group>
                </b-col>
                <b-col
                        cols="12"
                        class="mb-2"
                >
                </b-col>
                <b-col
                        cols="12"
                        class="mt-50"
                >
                    <b-button
                            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                            variant="primary"
                            class="mr-1 sub-btn"
                            @click="publishBulletin()"
                    >
                        发布
                    </b-button>
                    <b-button
                            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                            variant="primary"
                            class="mr-1 sub-btn"
                            @click="resetBulletin()"
                    >
                        Reset
                    </b-button>
                </b-col>
            </b-row>
        </b-form>
        <!--/ form -->
    </b-card>

</template>

<script>
    import {
        BCard, BMedia, BAvatar, BCardText, BMediaAside, BMediaBody, BForm, BRow, BCol, BFormGroup, BFormInput, BImg, BFormFile, BLink, BButton,BFormCheckbox
    } from 'bootstrap-vue'
    import vSelect from 'vue-select'
    import { quillEditor } from 'vue-quill-editor'
    import Ripple from 'vue-ripple-directive'
    import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
    import { ref } from '@vue/composition-api'
    import axiosIns from "../../../libs/axios";

    export default {
        components: {
            BCard,
            BMedia,
            BAvatar,
            BCardText,
            BMediaAside,
            BMediaBody,
            BForm,
            BLink,
            BImg,
            BRow,
            BCol,
            BButton,
            BFormGroup,
            BFormInput,
            BFormFile,
            vSelect,
            quillEditor,
            BFormCheckbox
        },
        directives: {
            Ripple,
        },
        data() {
            return {
                originalBulletin: {
                    bulletinId:-1,
                    top: false,
                    bulletinType: '',
                    bulletinTitle:'',
                    bulletinPublisher:'',
                    issuingTime:this.getCurrentTime,
                    modifiedTime:this.getCurrentTime,
                    bulletinContent:'',
                },
                bulletinEdit: {},
                blogFile: null,
                bulletinTypeOps: ['相关新闻','通知公告', '规章制度','活动安排'],
                snowOption: {
                    theme: 'snow',
                },
                userData:{}
            }
        },
        created() {
            const that = this
            this.currentBulletinId = this.$route.query.bulletinId
            if (this.currentBulletinId==-1){
                that.bulletinEdit = JSON.parse(JSON.stringify(this.originalBulletin))
            }
            else{
                axiosIns.get('/bulletin/getBulletinById',
                    {params: {bulletinId: that.currentBulletinId}})
                    .then(response => {
                        that.originalBulletin = response.data.data
                        that.bulletinEdit = JSON.parse(JSON.stringify(this.originalBulletin))});
            }
        },
        setup() {
            const refInputEl = ref(null)
            const refPreviewEl = ref(null)

            const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => { refPreviewEl.value.src = base64 })

            return {
                refInputEl,
                refPreviewEl,
                inputImageRenderer,
            }
        },
        methods:{
            publishBulletin(){
                let richText = this.bulletinEdit.bulletinContent;
                let postBody = {
                    bulletinId:this.$route.query.bulletinId,
                    top: this.bulletinEdit.top,
                    bulletinType:this.bulletinEdit.bulletinType,
                    bulletinTitle:this.bulletinEdit.bulletinTitle,
                    bulletinPublisher:this.bulletinEdit.bulletinPublisher,
                    issuingTime:this.getCurrentTime,
                    modifiedTime:this.getCurrentTime,
                    bulletinContent:richText,
                };
                if (this.currentBulletinId == -1){
                    axiosIns.post('/bulletin/addBulletin', postBody)
                        .then(res=>{
                            if(res.data.status.code='0000'){
                                alert('发布成功！');
                                this.$router.push({name:"bulletin-page",query:{selectedClass: this.bulletinEdit.bulletinType}})
                            }
                        })
                }
                else{
                    axiosIns.post('/bulletin/editBulletin', postBody)
                        .then(res=>{
                            if(res.data.status.code='0000'){
                                alert('发布成功！');
                                this.$router.push({name:"bulletin-page",query:{selectedClass: this.bulletinEdit.bulletinType}})
                            }
                        })
                }
            },
            resetBulletin(){
                console.log(this.bulletinEdit)
                this.bulletinEdit = JSON.parse(JSON.stringify(this.originalBulletin))
                console.log(this.bulletinEdit)
            },
            pInput(){
                console.log('Hello world!')
            }
        },
        computed:{
            getCurrentTime(){
                let myDate = new Date();
                let year = myDate.getFullYear();
                let month = myDate.getMonth()+1;
                let day = myDate.getDate();
                let Hour = myDate.getHours();
                let Minute = myDate.getMinutes();
                let Second = myDate.getSeconds();
                return year+"-"+month+"-"+day+" "+Hour+":"+Minute+":"+Second;

            }
        }
    }
</script>

<style lang="scss">
    @import '@core/scss/vue/libs/vue-select.scss';
    @import '@core/scss/vue/libs/quill.scss';
    @import '@core/scss/vue/pages/page-blog.scss';

    .sub-btn{
        float: right;
    }
</style>
