import mock from '@/@fake-db/mock'
import axiosIns from '@/libs/axios'

const date = new Date()

const fetchAttendances = async (userId, year, month) => {
  return await axiosIns.get('attendance/getAttendanceCalendar', {
    params: {
      requestUserId: JSON.parse(localStorage.getItem('userData')).userId,
      userId: userId,
      year: year,
      month: month
    }
  })
  .then(response => {
    if (response.data.status.code === '0000') {
      const vo = response.data.data

      let attendances = []

      vo.forEach(attendance => {
        const calendarItem = {
          title: attendance.attendanceType,
          start: attendance.attendanceTime || attendance.leaveStartTime,
          end: attendance.attendanceTime || attendance.leaveEndTime,
          allDay: false,
          extendedProps: {
            type: attendance.attendanceTime ? attendance.attendanceType : '请假'
          }
        }
        attendances.push(calendarItem)
      })

      return attendances
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
    month = date.getMonth() + 1,
    types
  } = config.params
  types = types.split(',')

  return fetchAttendances(userId, year, month)
  .then(attendances => {
    return [200, attendances.filter(attendance => types.includes(attendance.extendedProps.type))]
  })
})
