const accounts = {
  admin: {
    role: 'admin',
    token: 'admin-token',
    password: 'adminPassword'
  },
  student: {
    role: 'student',
    token: 'student-token',
    password: 'studentPassword'
  },
  teacher: {
    role: 'teacher',
    token: 'teacher-token',
    password: 'teacherPassword'
  },
  visitor: {
    role: 'visitor',
    token: 'visitor-token',
    password: 'visitorPassword'
  }
}

const users = {
  'admin-token': {
    role: 'admin',
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'SuperAdmin',
    studentId: 20141331,
    imgUrl: 'https://lovestories0eng.github.io/cdn/avatar.jpg',
    phoneNumber: 19357523498,
    address: "杭州市",
    email: '1494121350@qq.com',
    className: '智能财务（软件工程）'
  },
  'teacher-token': {
    role: 'teacher',
    introduction: 'I am a teacher',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'NormalTeacher',
    studentId: 20141331,
    imgUrl: 'https://lovestories0eng.github.io/cdn/avatar.jpg',
    phoneNumber: 19357523498,
    address: "杭州市",
    email: '1494121350@qq.com',
    className: '智能财务（软件工程）'
  },
  'student-token': {
    role: 'student',
    introduction: 'I am a student',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'NormalStudent',
    studentId: 20141331,
    imgUrl: 'https://lovestories0eng.github.io/cdn/avatar.jpg',
    phoneNumber: 19357523498,
    address: "杭州市",
    email: '1494121350@qq.com',
    className: '智能财务（软件工程）'
  },
  'visitor-token': {
    role: 'visitor',
    introduction: 'I am just a visitor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'NormalVisitor',
    studentId: 20141331,
    imgUrl: 'https://lovestories0eng.github.io/cdn/avatar.jpg',
    phoneNumber: 19357523498,
    address: "杭州市",
    email: '1494121350@qq.com',
    className: '智能财务（软件工程）'
  }
}

module.exports = [
  // user login
  {
    url: '/web/user/login',
    type: 'post',
    response: config => {
      const { username, password } = config.body
      const accountInfo = accounts[username]
      if (!accountInfo) {
        return {
          code: 508,
          message: '用户名不存在'
        }
      } else if (password !== accounts[username].password) {
        return {
          code: 508,
          message: '密码错误'
        }
      } else {
        return {
          code: 200,
          data: accountInfo
        }
      }
    }
  },

  // get user info
  {
    url: '/web/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      return {
        code: 200,
        // 根据token返回的用户的全局信息
        data: users[token]
      }
    }
  },

  // user logout
  {
    url: '/web/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]
