// 教师管理界面
import VUE from 'vue'
import VUEX from 'vuex'

VUE.use(VUEX)

const state = {
  isPractice: false, //练习模式标志
  flag: false, //菜单栏左右滑动标志
  userInfo: null,
  menu: [{
     icon: 'el-icon-info',
      index: '1',
      title: '考试信息管理',
      content:[{item1:'√ 考试查询',path:'/selectExam'},{item2:'√ 添加考试',path:'/addExam'}],
    },
    {
      index: '2',
      icon: 'el-icon-s-order',
      title: '题库信息管理',
      content:[{item1:'√ 添加题目',path:'/addAnswer'},{path: '/addAnswerChildren'},{item2:'√ 题目信息',path:'/selectAnswer'}],
    },
    {
      index: '3',
      title: '成绩查询管理',
      icon:'el-icon-s-data',
      content:[{item1:'√ 学生成绩查询',path:'/allStudentsGrade'},{path: '/grade'},{item2: '√ 成绩分段查询',path: '/selectExamToPart'},{path: '/scorePart'}],
    },
    {
      index: '4',
      title: '学生信息管理',
      icon:'el-icon-user-solid',
      content:[{item1:'√ 学生管理',path:'/studentManage'},{item2: '√ 添加学生',path: '/addStudent'}],
    },
    // {
    //   index: '5',
    //   title: '⑤ 教师信息管理',
    //   content:[{item1:'√ 教师信息',path:'/teacherManage'}],
    // },
    {
      index:'5',
      title:'我的教学班',
      icon:'el-icon-s-flag',
      content:[{item1:'√ 我的教学班',path:'/showmetheclass'}]
    }

  ],
}
const mutations = {
  practice(state,status) {
    state.isPractice = status
  },
  toggle(state) {
    state.flag = !state.flag
  },
  changeUserInfo(state,info) {
    state.userInfo = info
  }
}
const getters = {
 
}
const actions = {
  getUserInfo(context,info) {
    context.commit('changeUserInfo',info)
  },
  getPractice(context,status) {
    context.commit('practice',status)
  }
}
export default new VUEX.Store({
  state,
  mutations,
  getters,
  actions,
  // store
})
