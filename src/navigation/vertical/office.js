export default [
  {
    header: '办公'
  },
  {
    title: '军事训练',
    route: 'office-training-statistic',
    icon: 'CrosshairIcon'
  },
  {
    title: '考勤系统',
    icon: 'PackageIcon',
    children: [
      {
        title: '出勤信息',
        route: 'office-attendance'
      },
      {
        title: '假期管理',
        route: 'office-leave'
      }
    ]
  }
]
