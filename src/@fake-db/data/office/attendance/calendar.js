import mock from '@/@fake-db/mock'
import axiosIns from '@/libs/axios'
import router from '@/router'
import attendance from '@/navigation/horizontal/attendance'

const date = new Date()
const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
// prettier-ignore
const nextMonth = date.getMonth() === 11 ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1)
// prettier-ignore
const prevMonth = date.getMonth() === 11 ? new Date(date.getFullYear() - 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1)

const data = {
  events: [
    {
      id: 1,
      url: '',
      title: 'Design Review',
      start: date,
      end: nextDay,
      allDay: false,
      extendedProps: {
        calendar: 'Business',
      },
    },
    {
      id: 2,
      url: '',
      title: 'Meeting With Client',
      start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
      allDay: true,
      extendedProps: {
        calendar: 'Business',
      },
    },
    {
      id: 3,
      url: '',
      title: 'Family Trip',
      allDay: true,
      start: new Date(date.getFullYear(), date.getMonth() + 1, -9),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -7),
      extendedProps: {
        calendar: 'Holiday',
      },
    },
    {
      id: 4,
      url: '',
      title: 'Doctor\'s Appointment',
      start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
      allDay: true,
      extendedProps: {
        calendar: 'Personal',
      },
    },
    {
      id: 5,
      url: '',
      title: 'Dart Game?',
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: true,
      extendedProps: {
        calendar: 'ETC',
      },
    },
    {
      id: 6,
      url: '',
      title: 'Meditation',
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: true,
      extendedProps: {
        calendar: 'Personal',
      },
    },
    {
      id: 7,
      url: '',
      title: 'Dinner',
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: true,
      extendedProps: {
        calendar: 'Family',
      },
    },
    {
      id: 8,
      url: '',
      title: 'Product Review',
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: true,
      extendedProps: {
        calendar: 'Business',
      },
    },
    {
      id: 9,
      url: '',
      title: 'Monthly Meeting',
      start: nextMonth,
      end: nextMonth,
      allDay: true,
      extendedProps: {
        calendar: 'Business',
      },
    },
    {
      id: 10,
      url: '',
      title: 'Monthly Checkup',
      start: prevMonth,
      end: prevMonth,
      allDay: true,
      extendedProps: {
        calendar: 'Personal',
      },
    },
  ],
}

const fetchAttendances = async (userId, year, month) => {
  const data = {}

  return await axiosIns.get('attendance/getAttendanceCalendar', {
    params: {
      userId: userId,
      year: year,
      month: month
    }
  })
  .then(response => {
    if (response.data.status.code === '0000') {
      const vo = response.data.data

      let attendanceTypes = ['所有类型']
      let attendances = []

      vo.forEach(date => {
        const attendancesOfDate = date.attendanceInfo
        attendancesOfDate.forEach(attendance => {
            const calendarItem = {
              title: attendance.attendanceType,
              start: attendance.attendanceTime,
              end: attendance.attendanceTime,
              allDay: false,
              extendedProps: {
                type: attendance.attendanceType
              }
            }
            attendances.push(calendarItem)
            attendanceTypes.push(attendance.attendanceType)
          }
        )
      })

      attendanceTypes = Array.from(new Set(attendanceTypes))

      data.attendances = attendances
      data.attendanceTypes = attendanceTypes

      return data
    }
  })
}

// ------------------------------------------------
// GET: Return attendances
// ------------------------------------------------
mock.onGet('/office/attendance/attendances')
.reply(config => {
  let {
    userId,
    year = date.getFullYear(),
    month = date.getMonth(),
    types
  } = config.params
  types = types.split(',')

  return fetchAttendances(year, year, month)
  .then(data => {
    return [200, data.attendances.filter(attendance => types.include(attendance.extendedProps.type))]
  })
})
