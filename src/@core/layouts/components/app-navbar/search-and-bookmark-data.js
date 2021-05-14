export default {
  pages: {
    key: 'title',
    data: [
      {
        title: '信息门户',
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
        title: '出勤信息',
        route: { name: 'office-attendance' },
        icon: 'CheckSquareIcon',
        isBookmarked: true
      }
    ]
  }
}
