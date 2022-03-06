// 将getters单独创建一个模块，配合 mapGetters 辅助函数可以很方便的获取vuex中的一些简单数据
const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  image: state => state.user.image,
  role: state => state.user.role,
  address: state => state.user.address,
  phoneNumber: state => state.user.phoneNumber,
  sex: state => state.user.sex,
  name: state => state.user.name,
  userId: state => state.user.userId,
  email: state => state.user.email,
  faceToken: state => state.user.faceToken,
  introduction: state => state.user.introduction,
  avatar: state => state.user.avatar,
  token: state => state.user.token,
  className: state => state.user.className,
  permissionRoutes: state => state.permission.routes,
}

export default getters
