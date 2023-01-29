// 所有学生
<template>
  <div class="all">
    <el-form type="flex" justify="end">
    <el-form-item>
      <span>学号：</span>
    <el-input style="width:200px" v-model.number="inputid"
      placeholder="请输入您想查询的同学学号">
     </el-input>
      <span>姓名：</span>
    <el-input style="width:200px" v-model="inputname"
      placeholder="请输入您想查询的姓名">
     </el-input>
     <span>所在班级：</span>
     <el-select v-model="value" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
     </el-select>
    <el-button size="small" type="primary" @click="check({inputid});checkbyName({inputname});checkbyClazz({value})">查询</el-button>
  
    </el-form-item>
    </el-form>
    <el-table :data="pagination.records" border v-if="student==''">
      <el-table-column fixed="left" prop="studentName" label="姓名" ></el-table-column>
       <el-table-column prop="studentId" label="学号"></el-table-column>
      <!-- <el-table-column prop="institute" label="学院" width="200"></el-table-column>
      <el-table-column prop="major" label="专业" width="200"></el-table-column>
      <el-table-column prop="grade" label="年级" width="200"></el-table-column> -->
      <el-table-column prop="clazz" label="班级" ></el-table-column>
      <el-table-column prop="sex" label="性别" ></el-table-column>
      <el-table-column prop="tel" label="电话号码" ></el-table-column>
      <el-table-column prop="email" label="邮箱" ></el-table-column>
      <el-table-column fixed="right" label="查看成绩" width="150">
        <template slot-scope="scope">
          <el-button @click="checkGrade(scope.row.studentId)" type="primary" size="small">查询</el-button>
        </template>
      </el-table-column>
    </el-table>
        <el-table :data="student" border v-else>
      <el-table-column fixed="left" prop="studentName" label="姓名" ></el-table-column>
       <el-table-column prop="studentId" label="学号"></el-table-column>
      <!-- <el-table-column prop="institute" label="学院" width="200"></el-table-column>
      <el-table-column prop="major" label="专业" width="200"></el-table-column>
      <el-table-column prop="grade" label="年级" width="200"></el-table-column> -->
      <el-table-column prop="clazz" label="班级" ></el-table-column>
      <el-table-column prop="sex" label="性别" ></el-table-column>
      <el-table-column prop="tel" label="电话号码" ></el-table-column>
      <el-table-column prop="email" label="邮箱" ></el-table-column>
      <el-table-column fixed="right" label="查看成绩" width="150">
        <template slot-scope="scope">
          <el-button @click="checkGrade(scope.row.studentId)" type="primary" size="small">查询</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.current"
      :page-sizes="[6, 10]"
      :page-size="pagination.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      class="page"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
       student:[],
        options: [{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        },
      ],
      inputid:'',
      inputname:'',
      value:'',       
      pagination: {
        //分页后的考试信息
        current: 1, //当前页
        total: null, //记录条数
        size: 6 //每页条数
      }
    };
  },
  created() {
    this.getAnswerInfo();
  },
  methods: {
    getAnswerInfo() {
      //分页查询所有试卷信息
      this.$axios(`/api/students/${this.pagination.current}/${this.pagination.size}`).then(res => {
        this.pagination = res.data.data;
      }).catch(error => {});
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getAnswerInfo();
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getAnswerInfo();
    },
    checkGrade(studentId) {
      this.$router.push({ path: "/grade", query: { studentId: studentId } });
    },
    /***************通过Id查找***************/
    getStudentInfobyId(studentId){
      this.$axios(`/api/student/${studentId.inputid}`).then(res =>{
          this.student.push(res.data.data);
         // console.log(res);
         // console.log(typeof(this.student));
      }).catch(()=>{})
    },
    check(studentId){//查询
      this.student=[];
      this.pagination.current=1;
      this.pagination.total=1;
      this.$axios({
        url:`/api/student/${studentId.inputid}`,
        method:'get',
        }).then(res=>{
          if(res.data.data==null){
             this.$message({
            showClose: true,
            type: 'error',
            message: '查询的学号不存在'
          })
          }
          this.getStudentInfobyId(studentId)
        }).catch(()=>{

        })
    }, 
    /************通过名字查找****************/
      getStudentInfobyName(studentId){
      this.$axios(`/api/student/name/${studentId.inputname}`).then(res =>{
          this.student.push(res.data.data);
         // console.log(res);
         // console.log(typeof(this.student));
         
      }).catch(()=>{})
    },
    checkbyName(studentId){//查询
    this.student=[];
      this.$axios({
        url:`/api/student/name/${studentId.inputname}`,
        method:'get',
        }).then(res=>{
           if(res.data.data==null){
             this.$message({
            showClose: true,
            type: 'error',
            message: '查询的姓名不存在'
          })
          }
          this.getStudentInfobyName(studentId)
        }).catch(()=>{

        })
    },
    //************通过班级查找************//
    getStudentInfobyClazz(studentId){
      this.$axios(`/api/student/clazz/${studentId.value}/${this.pagination.current}/${this.pagination.size}`).then(res =>{
        this.pagination = res.data.data;
      //  for(let i =0;i<res.data.data.length;i++)
      //     this.student.push(res.data.data[i]);
          //this.getStudentInfo();
          console.log(res);
         // console.log(typeof(this.student));
      }).catch(()=>{})
    },
    checkbyClazz(studentId){//查询
    this.student=[];
      this.$axios({
        url:`/api/student/clazz/${studentId.value}/${this.pagination.current}/${this.pagination.size}`,
        method:'get',
        }).then(res=>{
          this.getStudentInfobyClazz(studentId)
        }).catch(()=>{
        })
    },
  }
};
</script>
<style lang="scss" scoped>
.all {
  padding: 0px 40px;
  .page {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .edit {
    margin-left: 20px;
  }
  .el-table tr {
    background-color: #dd5862 !important;
  }
}
.el-table .warning-row {
  background: #000 !important;
}

.el-table .success-row {
  background: #dd5862;
}
</style>
