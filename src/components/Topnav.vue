<template>
  <div class="lk">
    <div class="jz">
      <el-menu class="dio" :default-active="this.$route.path" router mode="horizontal">
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
      </el-menu>
      <div v-if="dh" class="lj">
        <el-button @click="tck" type="success">登陆|注册</el-button>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="登陆" name="login">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名：">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码：">
                  <el-input v-model="form.region"></el-input>
                </el-form-item>
                <el-button @click="dbn" type="danger">登陆</el-button>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="注册" name="register">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名：">
                  <el-input v-model="form.name1"></el-input>
                </el-form-item>
                <el-form-item label="密码：">
                  <el-input v-model="form.date1"></el-input>
                </el-form-item>
                <el-form-item label="都密码：">
                  <el-input v-model="form.date2"></el-input>
                </el-form-item>
                <el-button @click="dbn" type="danger">注册</el-button>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <div v-else class="lj">
        <el-button type="info">个人中心</el-button>
        <el-button type="warning">{{ nick }}</el-button>
        <el-button @click="LogoutHandler" type="danger">登出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { posthttp } from "../http/post";
export default {
  name: "Topnav",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      navList: [
        { name: "/", navItem: "头条" },
        { name: "/yule", navItem: "娱乐" },
        { name: "/keji", navItem: "科技" },
        { name: "/tiyu", navItem: "体育" }
      ],
      dh: true,
      dialogVisible: false,
      activeName: "login",
      nick: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        name1: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  mounted() {
    //判断是否在登陆状态
    if (localStorage.getItem("username")) {
      //已登陆
      (this.dh = false), (this.nick = localStorage.getItem("username"));
    }
  },
  methods: {
    tck() {
      this.dialogVisible = true;
    },
    handleClick(tab, event) {
      const dy = tab.index;
      if (dy === "0") {
        this.activeName = "login";
      } else {
        this.activeName = "register";
      }
    },
    dbn() {
      if (this.activeName === "login") {
        const result = posthttp("/api/login", {
          username: this.form.name,
          password: this.form.region
        });
        result
          .then(res => {
            console.log(res);
            return res.json();
          })
          .then(data => {
            if (data.length > 0) {
              this.dh = false;
              this.nick = data[0].username;
              this.dialogVisible = false;
              // 本地存储
              localStorage.setItem("username", data[0].username);
            } else {
              // 登陆失败
              this.$message({
                message: data.msg,
                type: "warning"
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        const result = posthttp("/api/register", {
          username: this.form.name1,
          password: this.form.date1
        });
        result
          .then(res => {
            console.log(res);
            return res.json();
          })
          .then(data => {
            this.$message({
              message: data.msg,
              type: "success"
            });
            this.activeName = "login";
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    //登出
    LogoutHandler() {
      this.dh = true;
      //清除本地存储
      localStorage.removeItem("username");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lk {
  overflow: hidden;
  background-color: #fff;
}
.dio {
  float: left;
}
.lj {
  float: right;
  line-height: 60px;
}
.jz {
  overflow: hidden;
  width: 1200px;
  margin: 0 auto;
}
</style>
