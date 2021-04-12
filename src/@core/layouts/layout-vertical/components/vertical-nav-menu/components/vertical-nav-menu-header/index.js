const canViewVerticalNavMenuHeader = item => {
  let canView = true
  const adminHeaders = ['管理']
  const userData = JSON.parse(localStorage.getItem('userData'))
  if (userData.userRole === '用户' && adminHeaders.includes(item.header)) {
    canView = false
  }
  return canView
}

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  render (h) {
    const span = h('span', {}, this.item.header)
    const icon = h('feather-icon', {
      props: {
        icon: 'MoreHorizontalIcon',
        size: '18'
      }
    })
    if (canViewVerticalNavMenuHeader(this.item)) {
      return h('li', { class: 'navigation-header text-truncate' }, [span, icon])
    }
    return h()
  }
}
