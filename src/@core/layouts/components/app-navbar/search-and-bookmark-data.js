export default {
  pages: {
    key: 'title',
    data: [
      {
        title: '主页',
        route: { name: 'home-homepage' },
        icon: 'HomeIcon',
        isBookmarked: true
      },
      {
        title: '军事训练',
        route: { name: 'office-training-statistic' },
        icon: 'CrosshairIcon',
        isBookmarked: true
      },
      {
        title: '文档中心',
        route: { name: 'doc-center-list' },
        icon: 'FileTextIcon',
        isBookmarked: true
      },
      {
        title: '考勤系统',
        route: { name: 'office-attendance' },
        icon: 'CheckSquareIcon',
        isBookmarked: true
      }
    ]
  }
}
