import mock from './mock'

// Manage
import './data/management/user/user'
import './data/management/department/department'
import './data/management/document/document'

// Office
import './data/office/attendance/attendance'
import './data/office/attendance/leave'
import './data/office/attendance/calendar'
import './data/office/training/training'
import './data/office/training/calendar'

mock.onAny().passThrough() // forwards the matched request over network
