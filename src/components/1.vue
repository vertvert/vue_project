<template>
  <div id="background">
    <div id="contain">
      <h1>Register</h1>
      <div class="form">
        <label>用户名：</label><input type="text" v-model.trim="name"><br/>
      </div>
      <div class="form">
        <label>密码：</label><input type="password" v-model.trim="password"><br/>
      </div>
      <div class="form">
        <label>邮箱：</label><input type="email" v-model.trim="mail"><br/>
      </div>
      <div class="form">
        <label>手机号：</label><input type="tel" v-model.trim="tel"><br/>
      </div>
      <button @click.prevent="handlefinish">提交</button>
      <el-form :model="form" :rules="rulesForm" label-width="120px">
        <el-form-item label="手机号码：" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="验证码：">
          <el-input v-model="form.code">
            <template #suffix>
              <div v-if="messageCodeVis" class="second-text">{{countdown}}秒后重新获取</div>
              <el-button v-else type="primary" link @click="sendCode">获取验证码</el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>  
      <el-button type="primary">确定</el-button>
    </div>
  </div>
</template>

<style scoped>
#background {
  width: 100%;
  height: 100%;
  background: url("../assets/logo.png");
  background-size: 100% 100%;
  position: fixed;
  top: 0;
  left: 0;
}
#contain {
  width: 580px;
  height: 560px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #00000090;
  text-align: center;
  border-radius: 20px;
}
#contain h1 {
  color: white;
}
.form {
  color: white;
  margin-left: 20%;
  margin-top: 60px;
  font-size: 20px;
  text-align: left;
}
label {
  float: left;
  width: 5em;
  margin-right: 1em;
  text-align: right;
}
input,
textarea {
  margin-left: 10px;
  padding: 4px;
  border: solid 1px #4e5ef3;
  outline: 0;
  font: normal 13px/100% Verdana, Tahoma, sans-serif;
  width: 200px;
  height: 20px;
  background: #f1f1f190;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
}
input:hover,
textarea:hover,
input:focus,
textarea:focus {
  border-color: #0d0aa1;
}
button {
  position: relative;
  height: 33px;
  width: 150px;
  background: rgba(35, 19, 252, 0.425);
  border-radius: 10px;
  margin-top: 38px;
  box-shadow: none;
  color: white;
  margin-left: 40px;
}
.read-the-docs {
  color: #888;
}
.second-text {
  color: #e60707;
}
</style>

<script>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

export default {
  name: 'register',
  data() {
    return {
      name: "",
      password: "",
      mail: "",
      tel: "",
      form: {
        phone: '',
        code: ''
      },
      messageCodeVis: false,
      countdown: 0,
      rulesForm: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入有效的手机号码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handlefinish() {
      if (localStorage['name'] === this.name) {
        alert("用户名已存在");//如果用户名已存在则无法注册
      } else if (this.name === '') {
        alert("用户名不能为空");
      } else {//将新用户信息存储到localStorage
        localStorage.setItem('name', this.name);
        localStorage.setItem('password', this.password);
        localStorage.setItem('mail', this.mail);
        localStorage.setItem('tel', this.tel);
        localStorage.setItem('s', "false");
        alert("注册成功");
        this.$router.replace('/Login');//完成注册后跳转至登录页面
      }
    },
    sendCode() {
      const reg = /^1[3456789]\d{9}$/;
      if (!this.form.phone) return ElMessage.error('请输入手机号码');
      if (!reg.test(this.form.phone)) return;
      this.countdown = 60;
      this.messageCodeVis = true;
      this.startCountdown();
    },
    startCountdown() {
      const intervalId = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(intervalId);
          this.messageCodeVis = false;
        }
      }, 1000);
    }
  }
};
</script>