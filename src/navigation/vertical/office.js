export default [
  {
    header: '办公'
  },
  {
    title: '军事训练',
    icon: 'TargetIcon',
    children: [
      {
        title: '训练清单',
        route: 'office-training-list'
      },
      {
        title: '训练日历',
        route: 'office-training-calendar'
      }
    ]
  },
  {
    title: '考勤系统',
    route: 'office-attendance',
    icon: 'CheckSquareIcon'
  }
]
