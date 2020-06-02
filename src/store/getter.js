
const getter = {
  deviceInfo: state => state.app.deviceInfo,
  token: state => state.user.token,
  orgCode: state => state.user.orgCode,
  isTopOrg: state => state.user.isTopOrg,
  isTobyTeam: state => state.user.isTobyTeam,
  watermasksImg: state => state.user.watermasksImg,
  pageStack: state => state.app.pageStack,
  dialogStack: state => state.app.dialogStack,
  userInfo: state => state.user.userInfo,
  updatedProjects: state => state.projects.updatedProjects,
  projectsVersion: state => state.projects.projetcsVersion,
  refreshFlags: state => state.app.refreshFlags
}

export default getter
