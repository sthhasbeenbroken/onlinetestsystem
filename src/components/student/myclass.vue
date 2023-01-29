// 学生管理页面
<template>
  <div class="all">
    <p class="title">我的班级</p>
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
    <el-button size="small" type="primary" @click="check({inputid});checkbyName({inputname});checkbyClazz()">查询</el-button>
    </el-form-item>
    </el-form>
    <el-table :data="pagination.records" border v-if="student==''" style="margin-top:5px">
      <el-table-column fixed="left" prop="studentName" label="姓名" ></el-table-column>
      <!-- <el-table-column prop="institute" label="学院" width="200"></el-table-column>
      <el-table-column prop="major" label="专业" width="200"></el-table-column>
      <el-table-column prop="grade" label="年级" width="200"></el-table-column> -->
      <el-table-column prop="studentId" label="学号"></el-table-column>
      <el-table-column prop="sex" label="性别" ></el-table-column>
      <el-table-column prop="clazz" label="班级" ></el-table-column>
      <el-table-column prop="tel" label="电话号码" ></el-table-column>
      <el-table-column prop="email" label="邮箱" ></el-table-column>
      <!-- <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="checkGrade(scope.row.studentId)" type="primary" size="small">更新</el-button>
          <el-button @click="deleteById(scope.row.studentId)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
        <el-table :data="student" border v-else>
      <el-table-column fixed="left" prop="studentName" label="姓名" ></el-table-column>
      <!-- <el-table-column prop="institute" label="学院" width="200"></el-table-column>
      <el-table-column prop="major" label="专业" width="200"></el-table-column>
      <el-table-column prop="grade" label="年级" width="200"></el-table-column> -->
      <el-table-column prop="studentId" label="学号"></el-table-column>
      <el-table-column prop="sex" label="性别" ></el-table-column>
      <el-table-column prop="clazz" label="班级" ></el-table-column>
      <el-table-column prop="tel" label="电话号码" ></el-table-column>
      <el-table-column prop="email" label="邮箱" ></el-table-column>
      <!-- <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="checkGrade(scope.row.studentId)" type="primary" size="small">更新</el-button>
          <el-button @click="deleteById(scope.row.studentId)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.current"
      :page-sizes="[6, 10]"
      :page-size="pagination.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      class="page">
    </el-pagination>
    <!-- 编辑对话框-->
    <el-dialog
      title="更新学生信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <section class="update">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="form.studentName"></el-input>
          </el-form-item>
          <!-- <el-form-item label="学院">
            <el-input v-model="form.institute"></el-input>
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="form.major"></el-input>
          </el-form-item>
          <el-form-item label="年级">
            <el-input v-model="form.grade"></el-input>
          </el-form-item> -->
          
          <el-form-item label="性别">
            <el-input v-model="form.sex"></el-input>
          </el-form-item>
          <el-form-item label="班级">
            <el-input v-model="form.clazz"></el-input>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-form>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        //分页后的学生信息
        current: 1, //当前页
        total: null, //记录条数
        size: 6, //每页条数
      },
      student:[],
      dialogVisible: false, //对话框
      form: {}, //保存点击以后当前学生的信息
    };
  },
  created() {
    this.getStudentInfo();
  },
  methods: {
    getStudentInfo() {
      //分页查询所有学生信息
      this.$axios(`/api/students/${this.pagination.current}/${this.pagination.size}`).then(res => {
         console.log(res);
        this.pagination = res.data.data;
      }).catch(error => {});
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.size = val;
      if(this.inputid!=''){
        this.getStudentInfobyId();
      }
      else if(this.inputname!=''){
        this.getStudentInfobyName();
      }
      else if(this.value!=''){
        this.getStudentInfobyClazz();
      }
      else{
      this.getStudentInfo();
      }
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      console.log(this.value)
      this.pagination.current = val;
            if(this.inputid!=''){
        this.getStudentInfobyId();
      }
      else if(this.inputname!=''){
        this.getStudentInfobyName();
      }
      else if(this.value!=''){
        this.getStudentInfobyClazz();
      }
      else{
      this.getStudentInfo();
      }
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
    getStudentInfobyClazz(){
      this.$axios(`/api/student/clazz/${this.value}/${this.pagination.current}/${this.pagination.size}`).then(res =>{
        this.pagination = res.data.data;
      //  for(let i =0;i<res.data.data.length;i++)
      //     this.student.push(res.data.data[i]);
          //this.getStudentInfo();
          console.log(res);
         // console.log(typeof(this.student));
      }).catch(()=>{})
    },
    checkbyClazz(){//查询
    this.student=[];
      this.$axios({
        url:`/api/student/clazz/${this.value}/${this.pagination.current}/${this.pagination.size}`,
        method:'get',
        }).then(res=>{
          this.getStudentInfobyClazz()
        }).catch(()=>{
        })
    },
    table(){
      return this.student;
    },

    submit() { //提交更改
      this.dialogVisible = false
      this.$axios({
        url: '/api/student',
        method: 'put',
        data: {
          ...this.form
        }
      }).then(res => {
        console.log(res)
        if(res.data.code ==200) {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
        }
        this.getStudentInfo()
      })
    },
    handleClose(done) { //关闭提醒
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        }).catch(_ => {});
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
    background-color: #6a6da9 !important;
  }
}
.el-table .warning-row {
  background: #000 !important;
}

.el-table .success-row {
  background: #6a6da9;
}
.all .title{
       border-bottom: 1px solid #eee;
     background-color: #fff;
      padding: 20px;
}
.el-form{
  background-color: #fff;
  padding: 10px;
}
</style>
