<template>
  <div id="background">
    <div id="contain">
      <h1>Register</h1>

      <div class="form">
        <label>用户名：</label><input type="text" v-model.trim="name"><br />
      </div>
      <div class="form">
        <label>密码：</label><input type="password" v-model.trim="password"><br />
      </div>
      <div class="form captcha-container">
  <!-- 验证码文字说明放在前面，图片放在后面 -->
  <label>验证码：</label>
  <input type="text" v-model.trim="captchaInput" placeholder="请输入验证码" style="width: auto;">
  <img :src="captchaImageUrl" alt="图片验证码" @click="refreshCaptcha" style="margin-left: 5px;">
</div>
      <div class="form">
        <label>邮箱：</label><input type="email" v-model.trim="mail"><br />
      </div>
      <div class="form">
        <label>手机号：</label><input type="tel" v-model.trim="tel"><br />
      </div>
      <!-- 添加两个按钮，一个用于提交注册，另一个用于返回主页 -->
<button @click="handlefinish">提交注册</button>
<button @click="goHome">返回主页</button>
      </div>
  </div>
</template>
//css
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
.captcha-container {
  display: flex;
  align-items: center;
}

.captcha-container img {
  cursor: pointer;
  vertical-align: middle; /* 确保图片在垂直方向上居中对齐 */
}

.captcha-container input {
  /* 根据需要调整宽度，这里使用auto让输入框宽度自适应 */
  width: auto;
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
</style>


<script>
export default {
  name: 'register',
  props: {
    msg: String
  },
  data() {
    return {
      name: "",
      password: "",
      // 验证码图片URL
      captchaImageUrl: '',
      // 用户输入的验证码
      captchaInput: '',
      mail: "",
      tel: ""
    };
  }, methods: {
    goHome() {
    // 这里可以是路由跳转或者页面刷新
    // 如果使用Vue Router，可以使用 this.$router.push('/') 来跳转
    // 如果不使用Vue Router，可以刷新页面或者跳转到主页
    window.location.href = '/';
  },
    //点击完成按钮触发handlefinish
    handlefinish: function () {
      const reg = /^1[3456789]\d{9}$/;//中国大陆手机号码的格式
      // 校验是数字
      const regex1 = /^\d+$/
      // 校验字母
      const regex2 = /^[A-Za-z]+$/
      // 校验符号
      // const regex3 = /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]+$/
      const regex3 = /^[A-Za-z]+$/

      if (localStorage['name'] === this.name) {
        alert("用户名已存在");//如果用户名已存在则无法注册
      }
      else if (this.name === '') {
        alert("用户名不能为空");
      }
      else if (this.password === '') {
        alert('请输入密码');
      }
      else if (this.mail === '') {
        alert('请输入邮箱');
      }
      else if (this.tel === '') {
        alert('请输入手机号码');
      }
      else if (localStorage['tel'] !== this.tel) {
        alert("手机号格式不正确");
      }




      else {//将新用户信息存储到localStorage
        localStorage.setItem('name', this.name);
        localStorage.setItem('password', this.password);
        localStorage.setItem('mail', this.mail);
        localStorage.setItem('tel', this.tel);

        localStorage.setItem('s', "false");
        alert("注册成功");
        this.$router.replace('/Login');//完成注册后跳转至登录页面
      }
    }
  }
};
</script>
