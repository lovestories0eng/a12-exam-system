// 将getters单独创建一个模块，配合 mapGetters 辅助函数可以很方便的获取vuex中的一些简单数据
const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  role: state => state.user.role,
  introduction: state => state.user.introduction,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  studentId: state => state.user.studentId,
  token: state => state.user.token,
  permissionRoutes: state => state.permission.routes,
}

export default getters
