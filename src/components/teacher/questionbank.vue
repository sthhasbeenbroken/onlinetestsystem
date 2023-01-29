//查询所有题库
<template>
  <div class="exam">
    <el-form type="flex" justify="end">
    <el-form-item>

     <span>题目类型：</span>
     <el-select v-model="questiontypemod" placeholder="请选择" @change="initpage">
            <el-option
                v-for="item in questiontype"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
     </el-select>
     <span>所属科目：</span>
     <el-select v-model="questionsubmod" placeholder="请选择" @change="initpage">
            <el-option
                v-for="item in questionsub"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
     </el-select>
     <br>
    <span>学科章节：</span>
     <el-select v-model="questionsecmod" placeholder="请选择" @change="initpage">
            <el-option
                v-for="item in questionsec"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
     </el-select>
    <el-button size="small" style="margin-left:300px;margin-top:15px" type="primary" @click="check">查询</el-button>
    <el-button size="small" style="margin-left:0px;margin-top:15px" type="primary" @click="clear">清空</el-button>
    </el-form-item>
    </el-form>
    <el-table :data="pagination.records" border :row-class-name="tableRowClassName">
      <!-- <el-table-column prop="subject" label="试卷名称" width="120" ></el-table-column> -->
      <el-table-column prop="sub" label="所属科目" width="200"  ></el-table-column>
      <el-table-column prop="question" label="题目" width="985"  ></el-table-column>
      <!-- <el-table-column prop="examDate" label="考试日期" ></el-table-column> -->   
      <el-table-column prop="section" label="所属章节" width="200"></el-table-column>
      <!-- <el-table-column prop="type" label="题目类型" width="200"></el-table-column>
      <el-table-column prop="score" label="试题分数" width="150"></el-table-column>
      <el-table-column prop="level" label="难度等级" width="133"></el-table-column> -->
       <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button @click="add(scope.row)" type="primary" size="small">添加</el-button>
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
      postChange:{
        subject: '', //试卷名称
        level: '', //难度等级选中值 
        rightAnswer: '', //正确答案选中值
        section: '', //对应章节
        question: '', //题目
        analysis: '', //解析
        answerA: '',
        answerB: '',
        answerC: '',
        answerD: '',
      },
      postPaper: { //考试管理表对应字段
        paperId: null,
        questionType: null, // 试卷类型 1--选择题  2--填空题   3--判断题
        questionId: null,
      },
      postFill: { //填空题提交内容
        subject: '', //试卷名称
        level: '', //难度等级选中值 
        answer: '', //正确答案
        section: '', //对应章节
        question: '', //题目
        analysis: '', //解析
      },
      postJudge: { //判断题提交内容
        subject: '', //试卷名称
        level: '', //难度等级选中值 
        answer: '', //正确答案
        section: '', //对应章节
        question: '', //题目
        analysis: '', //解析
      },
      questiontype:["选择题","填空题","判断题"],
      questionsub:[],
      questionsec:[],
      questiontypemod:'',
      questionsubmod:'',
      questionsecmod:'',
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
    this.getsubInfo();
    this.getsecInfo();
  },
  methods: {
    add(question){
      if(this.questiontypemod=='选择题'){
       // console.log(question);
        this.postChange=question
        this.$axios({ //提交数据到选择题题库表
        url: '/api/MultiQuestion',
        method: 'post',
        data: {
          ...this.postChange       
        }
      }).then(res => { //添加成功显示提示
        let status = res.data.code
        if(status == 200) {
          this.$message({
            message: '已添加到题库',
            type: 'success'
          })
          this.postChange = {}
         }      
       }).then(() => {
        this.$axios(`/api/multiQuestionId`).then(res => { //获取当前题目的questionId
          let questionId = res.data.data.questionId
          this.postPaper.questionId = questionId
          this.postPaper.questionType = 1
          this.$axios({
            url: '/api/paperManage',
            method: 'Post',
            data: {
              ...this.postPaper
            }
          })
        })
      })
      }

      else if(this.questiontypemod=='填空题'){
      this.postChange=question
      this.$axios({
        url: '/api/fillQuestion',
        method: 'post',
        data: {
          ...this.postFill
        }
      }).then(res => {
        let status = res.data.code
        if(status == 200) {
          this.$message({
            message: '已添加到题库',
            type: 'success'
          })
          this.postFill = {}
        }
      }).then(() => {
        this.$axios(`/api/fillQuestionId`).then(res => { //获取当前题目的questionId
          let questionId = res.data.data.questionId
          this.postPaper.questionId = questionId
          this.postPaper.questionType = 2
          this.$axios({
            url: '/api/paperManage',
            method: 'Post',
            data: {
              ...this.postPaper
            }
          })
        })
      })
      }
      else if(this.questiontypemod=='判断题'){
        this.postChange=question
        this.$axios({
        url: '/api/judgeQuestion',
        method: 'post',
        data: {
          ...this.postJudge
        }
      }).then(res => {
        let status = res.data.code
        if(status == 200) {
          this.$message({
            message: '已添加到题库',
            type: 'success'
          })
          this.postJudge = {}
        }
      }).then(() => {
        this.$axios(`/api/judgeQuestionId`).then(res => { //获取当前题目的questionId
          let questionId = res.data.data.questionId
          this.postPaper.questionId = questionId
          this.postPaper.questionType = 3
          this.$axios({
            url: '/api/paperManage',
            method: 'Post',
            data: {
              ...this.postPaper
            }
          })
        })
      })
    
      }
    },
    clear(){
        this.questiontypemod='';
        this.questionsubmod='';
        this.questionsecmod='';
    },
    /***********获取所属科目************ */
    getsubInfo(){
      this.questionsub=[];
   this.$axios(
        `/api/answers/sub/${this.pagination.current}/${this.pagination.size}`
      )
        .then(res => { 
         // console.log(res.data.data.records);
          for(let i =0;i<res.data.data.records.length;i++)
           this.questionsub.push(res.data.data.records[i].sub)

        })
        .catch(error => {});
    },
     /***********获取题目类型************ */
    getsecInfo(){
      this.questionsec=[];
      this.$axios(
        `/api/answers/sec/${this.pagination.current}/${this.pagination.size}`
      )
        .then(res => { 
         // console.log(res.data.data.records);
          for(let i =0;i<res.data.data.records.length;i++)
           this.questionsec.push(res.data.data.records[i].section)

        })
        .catch(error => {});
    },
    initpage(){
      this.pagination={
        //分页后的考试信息
        current: 1, //当前页
        total: null, //记录条数
        size: 6 //每页条数
      }
    },
    check(){
      if(this.questiontypemod==''){
        this.$message({
        type: 'warning',
        message: '请选择题目类型',
        showClose: true,
        center: true,
      })
    }
      //console.log(this.questiontypemod);
      /*********************选type，课程与章节 *************/
      if(this.questiontypemod=='选择题'&&this.questionsecmod!=''&&this.questionsubmod!=''){
       
         this.$axios(
        `/api/answers/multis/${this.questionsubmod}/${this.questionsecmod}/${this.pagination.current}/${this.pagination.size}`
      )
        .then(res => { 
          this.pagination=res.data.data;
        })
        .catch(error => {});
      }
      /******************选type，课程，没选章节 ****************/
      else if(this.questiontypemod=='选择题'&&this.questionsubmod!=''&&this.questionsecmod==''){
       
         this.$axios(
        `/api/answers/multis/${this.questionsubmod}/${this.pagination.current}/${this.pagination.size}`
      )
        .then(res => { 
          this.pagination=res.data.data;
        })
        .catch(error => {});
      }
      /******************选type，章节，没选课程 ****************/
      else if(this.questiontypemod=='选择题'&&this.questionsubmod==''&&this.questionsecmod!=''){
        this.$message({
        type: 'warning',
        message: '请输入课程',
        showClose: true,
        center: true,
})
      }
     /******************选type，没选课程，章节 ****************/
       else if(this.questiontypemod=='选择题'&&this.questionsubmod==''&&this.questionsecmod==''){ 
         this.$axios(
        `/api/answers/multis/${this.pagination.current}/${this.pagination.size}`
      )
        .then(res => { 
          this.pagination=res.data.data;
        })
        .catch(error => {});
      }
      
              /******************填空******************** */
            /*********************选type，课程与章节 *************/
      if(this.questiontypemod=='填空题'&&this.questionsecmod!=''&&this.questionsubmod!=''){
       
         this.$axios(
        `/api/answers/fills/${this.questionsubmod}/${this.questionsecmod}/${this.pagination.current}/${this.pagination.size}`
      )
        .then(res => { 
          this.pagination=res.data.data;
        })
        .catch(error => {});
      }
      /******************选type，课程，没选章节 ****************/
      else if(this.questiontypemod=='填空题'&&this.questionsubmod!=''&&this.questionsecmod==''){
       
         this.$axios(
        `/api/answers/fills/${this.questionsubmod}/${this.pagination.current}/${this.pagination.size}`
      )
        .then(res => { 
          this.pagination=res.data.data;
        })
        .catch(error => {});
      }
      /******************选type，章节，没选课程 ****************/
      else if(this.questiontypemod=='填空题'&&this.questionsubmod==''&&this.questionsecmod!=''){
        this.$message({
        type: 'warning',
        message: '请输入课程',
        showClose: true,
        center: true,
})
      }
     /******************选type，没选课程，章节 ****************/
       else if(this.questiontypemod=='填空题'&&this.questionsubmod==''&&this.questionsecmod==''){ 
         this.$axios(
        `/api/answers/fills/${this.pagination.current}/${this.pagination.size}`
      )
        .then(res => { 
          this.pagination=res.data.data;
        })
        .catch(error => {});
      }

             /******************判断******************** */
            /*********************选type，课程与章节 *************/
      if(this.questiontypemod=='判断题'&&this.questionsecmod!=''&&this.questionsubmod!=''){
       
         this.$axios(
        `/api/answers/judge/${this.questionsubmod}/${this.questionsecmod}/${this.pagination.current}/${this.pagination.size}`
      )
        .then(res => { 
          this.pagination=res.data.data;
        })
        .catch(error => {});
      }
      /******************选type，课程，没选章节 ****************/
      else if(this.questiontypemod=='判断题'&&this.questionsubmod!=''&&this.questionsecmod==''){
       
         this.$axios(
        `/api/answers/judge/${this.questionsubmod}/${this.pagination.current}/${this.pagination.size}`
      )
        .then(res => { 
          this.pagination=res.data.data;
        })
        .catch(error => {});
      }
      /******************选type，章节，没选课程 ****************/
      else if(this.questiontypemod=='判断题'&&this.questionsubmod==''&&this.questionsecmod!=''){
        this.$message({
        type: 'warning',
        message: '请输入课程',
        showClose: true,
        center: true,
      })
      }
     /******************选type，没选课程，章节 ****************/
       else if(this.questiontypemod=='判断题'&&this.questionsubmod==''&&this.questionsecmod==''){ 
         this.$axios(
        `/api/answers/judge/${this.pagination.current}/${this.pagination.size}`
      )
        .then(res => { 
          this.pagination=res.data.data;
        })
        .catch(error => {});
      }

    },

    getAnswerInfo() {
      //分页查询所有试卷信息
      this.$axios(
        `/api/answers/${this.pagination.current}/${this.pagination.size}`
      )
        .then(res => {
          this.pagination = res.data.data;
         // console.log(res.data.data.records);
        })
        .catch(error => {});
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.size = val;
      if(this.questionsubmod!=''||this.questionsecmod!=''||this.questiontypemod!=''){
        this.check();
      }
      else{
      this.getAnswerInfo();
      }
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val;
      if(this.questionsubmod!=''||this.questionsecmod!=''||this.questiontypemod!=''){
        this.check();
      }
      else{
      this.getAnswerInfo();
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.exam {
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
    background-color: #DD5862 !important;
  }
}
  .el-table .warning-row {
    background: #000 !important;
    
  }

  .el-table .success-row {
    background: #DD5862;
  }

</style>
