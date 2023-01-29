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
    <span>学科章节：</span>
     <el-select v-model="questionsecmod" placeholder="请选择" @change="initpage">
            <el-option
                v-for="item in questionsec"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
     </el-select>
    <el-button size="small" style="margin-left:50px;margin-top:15px" type="primary" @click="check">查询</el-button>
    <el-button size="small" style="margin-left:0px;margin-top:15px" type="primary" @click="clear">清空</el-button>
    </el-form-item>
    </el-form>
    <el-table :data="pagination.records" border :row-class-name="tableRowClassName">
      <!-- <el-table-column fixed="left" prop="subject" label="试卷名称" width="200" ></el-table-column> -->
      <el-table-column prop="question" label="题目" width="985"  ></el-table-column>
      <!-- <el-table-column prop="examDate" label="考试日期" ></el-table-column> -->
      <el-table-column prop="sub" label="所属科目" width="200"  ></el-table-column>
      
      <el-table-column prop="section" label="所属章节" width="200"></el-table-column>
      <!-- <el-table-column prop="type" label="题目类型" width="200"></el-table-column> -->
      <el-table-column prop="score" label="试题分数" width="150"></el-table-column>
      <el-table-column prop="level" label="难度等级" width="133"></el-table-column>
      

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
      pagination: {
        //分页后的考试信息
        current: 1, //当前页
        total: null, //记录条数
        size: 6 //每页条数

      },
      questiontype:["选择题","填空题","判断题"],
      questionsub:[],
      questionsec:[],
      questiontypemod:'',
      questionsubmod:'',
      questionsecmod:'',
    };
  },
  created() {
    this.getAnswerInfo();
    this.getsubInfo();
    this.getsecInfo();
  },
  methods: {
    clear(){
        this.questiontypemod='';
        this.questionsubmod='';
        this.questionsecmod='';
    },
    getAnswerInfo() {
      //分页查询所有试卷信息
      this.$axios(
        `/api/answers/${this.pagination.current}/${this.pagination.size}`
      )
        .then(res => {
          this.pagination = res.data.data;
          console.log(res);
        })
        .catch(error => {});
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
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
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
  }
  },
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
