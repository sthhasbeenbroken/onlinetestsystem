// 学生管理页面
<template>
  <div class="all">
    <el-form type="flex" justify="end">
    <el-form-item>
    <span>所在班级：</span>
     <el-select v-model="value" placeholder="请选择" @change="clazzchange">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"> 
            </el-option>
     </el-select>
     </el-form-item>
    </el-form>
    <el-table :data="pagination.records" border v-if="clazz==''">
      <el-table-column fixed="left" prop="studentName" label="姓名" ></el-table-column>
      <!-- <el-table-column prop="institute" label="学院" width="200"></el-table-column>
      <el-table-column prop="major" label="专业" width="200"></el-table-column>
      <el-table-column prop="grade" label="年级" width="200"></el-table-column> -->
      
      <el-table-column prop="sex" label="性别" ></el-table-column>
      <el-table-column prop="clazz" label="班级" ></el-table-column>
      <el-table-column prop="tel" label="电话号码" ></el-table-column>
      <el-table-column prop="email" label="邮箱" ></el-table-column>

    </el-table>
        <el-table :data="clazz" border v-else>
      <el-table-column fixed="left" prop="studentName" label="姓名" ></el-table-column>
      <!-- <el-table-column prop="institute" label="学院" width="200"></el-table-column>
      <el-table-column prop="major" label="专业" width="200"></el-table-column>
      <el-table-column prop="grade" label="年级" width="200"></el-table-column> -->
      
      <el-table-column prop="sex" label="性别" ></el-table-column>
      <el-table-column prop="clazz" label="班级" ></el-table-column>
      <el-table-column prop="tel" label="电话号码" ></el-table-column>
      <el-table-column prop="email" label="邮箱" ></el-table-column>

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

  </div>
</template>

<script>
export default {
  data() {
    return {
      pagination: {
        //分页后的学生信息
        current: 1, //当前页
        total: null, //记录条数
        size: 6, //每页条数
      },
      dialogVisible: false, //对话框
      form: {}, //保存点击以后当前学生的信息
      clazz:[],
      options:[{
        value:1,
        label:1
      },
      {
        value:2,
        label:2
      }
      ],
      value:'',
    };
  },
  created() {
    this.getStudentInfo();
  },
  methods: {
    getStudentInfo() {
      //分页查询所有学生信息
      this.$axios(`/api/students/${this.pagination.current}/${this.pagination.size}`).then(res => {
        this.pagination = res.data.data;
        console.log(this.pagination);
      }).catch(error => {});
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getStudentInfo();
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getStudentInfo();
    },
    clazzchange(){
      this.clazz=[];
      for(let i=0;i<this.pagination.records.length;i++){
        if(this.value==this.pagination.records[i].clazz){
          this.clazz.push(this.pagination.records[i]);
        }
      }
    }


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
