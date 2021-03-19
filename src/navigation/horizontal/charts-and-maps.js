export default [
  {
    header: '图表',
    icon: 'PieChartIcon',
    children: [
      {
        title: 'Charts',
        icon: 'PieChartIcon',
        children: [
          {
            title: 'Apex Chart',
            route: 'charts-apex-chart',
          },
          {
            title: 'Chartjs',
            route: 'charts-chartjs',
          },
          {
            title: 'Echart',
            route: 'charts-echart',
          },
        ],
      },
      {
        title: 'Leaflet',
        route: 'maps-leaflet',
        icon: 'MapIcon',
      },
    ],
  },
]
