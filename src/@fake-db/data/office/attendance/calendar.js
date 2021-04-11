import mock from '@/@fake-db/mock'
import axiosIns from '@/libs/axios'

const fetchAttendances = async (userId, startDateStr, endDateStr) => {
  return await axiosIns.get('attendance/getAttendanceCalendar', {
    params: {
      requestUserId: JSON.parse(localStorage.getItem('userData')).userId,
      userId: userId,
      startDateStr: startDateStr,
      endDateStr: endDateStr
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
    startDateStr,
    endDateStr,
    types
  } = config.params
  types = types.split(',')

  return fetchAttendances(userId, startDateStr, endDateStr)
  .then(attendances => {
    return [200, attendances.filter(attendance => types.includes(attendance.extendedProps.type))]
  })
})
