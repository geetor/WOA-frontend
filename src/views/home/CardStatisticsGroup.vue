<template>
  <b-card
    no-body
    class="card-statistics"
  >
    <b-card-header>
      <b-card-title style="font-weight: bolder">数据统计</b-card-title>
      <b-card-text class="mr-25 mb-0">
        近30天
      </b-card-text>
    </b-card-header>
    <b-card-body class="statistics-body">
      <b-row cols="10">
        <b-col
          class="mb-2 mb-md-0"
        >
          <b-media no-body>
            <b-media-aside
              class="mr-2"
            >
              <b-avatar
                size="48"
                variant="light-success"
              >
                <feather-icon
                  size="24"
                  icon="ThumbsUpIcon"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{statisticsItems.countOfNormal}}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                正常出勤
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
      </b-row>
      <b-row>
        <b-col
                class="mb-2 mb-md-0"
        >
          <b-media no-body>
            <b-media-aside
                    class="mr-2"
            >
              <b-avatar
                      size="48"
                      variant="light-danger"
              >
                <feather-icon
                        size="24"
                        icon="ThumbsDownIcon"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{statisticsItems.countOfAbnormal}}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                异常出勤
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
      </b-row>
      <b-row>
        <b-col
                class="mb-2 mb-md-0"
        >
          <b-media no-body>
            <b-media-aside
                    class="mr-2"
            >
              <b-avatar
                      size="48"
                      variant="light-primary"
              >
                <feather-icon
                        size="24"
                        icon="UserXIcon"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{statisticsItems.countOfLeaves}}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                请假次数
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
      </b-row>
      <b-row>
        <b-col
                class="mb-2 mb-md-0"
        >
          <b-media no-body>
            <b-media-aside
                    class="mr-2"
            >
              <b-avatar
                      size="48"
                      variant="light-warning"
              >
                <feather-icon
                        size="24"
                        icon="UsersIcon"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{statisticsItems.countOfTrainings}}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                训练次数
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardText, BCardBody, BRow, BCol, BMedia, BMediaAside, BAvatar, BMediaBody,
} from 'bootstrap-vue'
import axiosIns from "../../libs/axios";

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
  },
  created(){
    const that = this
    axiosIns.get('/bulletin/getStatistics')
            .then(response => {
              that.statisticsItems = response.data.data
            });
  },
  data() {
    return {
      statisticsItems: [
        {
          icon: 'ThumbsUpIcon',
          color: 'light-success',
          title: '230k',
          subtitle: '正常出勤'
        },
        {
          icon: 'ThumbsDownIcon',
          color: 'light-danger',
          title: '8.549k',
          subtitle: '异常出勤'
        },
        {
          icon: 'UserXIcon',
          color: 'light-primary',
          title: '1.423k',
          subtitle: '请假次数'
        },
        {
          icon: 'UsersIcon',
          color: 'light-warning',
          title: '$9745',
          subtitle: '训练次数',
        }
      ],
      statisticsCategory: {
        countOfNormal: '正常出勤',
        countOfAbnormal: '异常出勤',
        countOfLeaves: '请假次数',
        countOfTrainings: '训练次数',
      }
    }
  },
}
</script>

<style lang="scss">
  [dir] .mb-md-0, [dir] .my-md-0 {
    margin-bottom: 15% !important;
  }
</style>
