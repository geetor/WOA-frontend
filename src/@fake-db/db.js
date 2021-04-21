import mock from './mock'

// JWT
import './jwt'

// Table
import './data/extensions/good-table'
import './data/extensions/auto-suggest'
import './data/card/card-statistics'
import './data/card/card-analytics'

// Apps
import './data/apps/calendar'
import './data/apps/user'
import './data/apps/email'
import './data/apps/invoice'
import './data/apps/todo'
import './data/apps/chat'

// Manage
import './data/management/user/user'
import './data/management/department/department'
import './data/management/document/document'

// Office
import './data/office/attendance/attendance'
import './data/office/attendance/calendar'
import './data/office/training/training'
import './data/office/training/calendar'

// dashboard
import './data/dashboard/analytics'

// pages
import './data/pages/faq-data'
import './data/pages/knowledge-base'
import './data/pages/pricing-data'
import './data/pages/account-setting'
import './data/pages/profile-data'
import './data/pages/blog'

mock.onAny().passThrough() // forwards the matched request over network
