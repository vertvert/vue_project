<template>
  <div id="background">
    <div id="contain">
      <h1>Register</h1>

      <div class="form">
        <label>用户名：</label>
        <input type="text" v-model.trim="name" @blur="validateUsername">
        <div v-if="showUsrWarning" class="warning">
          请输入6-12位用户名，包括数字、大小写字母、特殊字符（不包括空格）。
        </div>
      </div>
      <div class="form">
        <label>密码：</label>
        <input type="password" v-model.trim="password" @blur="validatePassword">
        <div v-if="showPwdWarning" class="warning">
          请输入6-12位密码，包括数字、大小写字母、特殊字符（不包括空格）。
        </div>
      </div>
      <div class="form">
        <label>确认密码：</label>
        <input type="password" v-model.trim="confirmPassword" @blur="validatePasswordMatch">
        <div v-if="passwordMismatch" class="warning">
          请确认两次输入的密码一致。
        </div>
      </div>
      <div class="form">
        <label>手机号：</label>
        <input type="tel" id="phone" v-model.trim="tel" @blur="validatePhoneNumber">
        <!-- 发送验证码按钮放在手机号输入框之后 -->
        <button class="normal_button" @click="sendSmsCode">发送验证码</button>
        <div v-if="showTelWarning" class="warning">
          请输入有效的手机号码。
        </div>
      </div>
      <div class="form">
        <label>短信验证：</label>
        <input type="text" v-model.trim="smsCode" @blur="validateSmsCode" placeholder="请输入短信验证码">
        <div v-if="showSmsCodeWarning" class="warning">
          验证码错误或已过期，请重新获取。
        </div>
      </div>
      <div class="form captcha-container">
        <label>图形验证：</label>
        <input type="text" v-model.trim="captchaInput" placeholder="请输入验证码" style="width: auto;">
        <img :src="captchaImageUrl" alt="图片验证码" @click="refreshCaptcha" style="margin-left: 5px; cursor: pointer;">
      </div>
      <div class="text_form" style="display: block;">
        <label>
          <input type="checkbox" id="admin" v-model="isAdmin">
          需要管理员身份请勾选
        </label>
        <input type="checkbox" id="agree" v-model="isAgreed">
        <label for="agree">我已阅读并同意用户协议</label>
        <label>

        </label>
      </div>
      <!-- <div class="form">
        <label>
          <input type="checkbox" id="admin" v-model="isAdmin">
          需要管理员身份请勾选
        </label>
        <input type="checkbox" id="agree" v-model="isAgreed">
        <label for="agree">我已阅读并同意用户协议</label>
        <label>

        </label>
      </div> -->


      <!-- <div>
        <input type="checkbox" id="agree" v-model="isAgreed">
        <label for="agree">我已阅读并同意用户协议</label>
      </div> -->
      <div class="buttons">
        <button @click="handlefinish">提交注册</button>
        <button @click="goHome">返回主页</button>
      </div>
    </div>
  </div>
</template>

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
      confirmPassword: "",
      captchaImageUrl: '',
      captchaInput: '',
      mail: "",
      tel: "",
      showUsrWarning: false,
      showPwdWarning: false,
      passwordMismatch: false,
      showTelWarning: false,
      isAdmin: false,
      isAgreed: false
    };
  },
  methods: {
    validateUsername() {
      const regex = /^(?=\S*[A-Za-z])(?=\S*\d)(?=\S*[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、])\S{6,12}$/;
      this.showUsrWarning = !regex.test(this.name);
    },
    validatePassword() {
      const regex = /^(?=\S*[A-Za-z])(?=\S*\d)(?=\S*[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、])\S{6,12}$/;
      this.showPwdWarning = !regex.test(this.password);
    },
    validatePasswordMatch() {
      this.passwordMismatch = this.password !== this.confirmPassword;
    },
    validatePhoneNumber() {
      const validPhoneNumber = /^1[3456789]\d{9}$/.test(this.tel);
      this.showTelWarning = !validPhoneNumber;
    },
    fetchCaptcha() {
      fetch('http://localhost:3000/api/captcha')
        .then(response => {
          if (response.ok) {
            return response.blob();
          }
          throw new Error('Network response was not ok.');
        })
        .then(blob => {
          this.captchaImageUrl = window.URL.createObjectURL(blob);
        })
        .catch(error => {
          console.error('Error fetching captcha:', error);
          this.captchaImageUrl = ''; // 指向一个错误图片URL
        });
    },
    refreshCaptcha() {
      this.fetchCaptcha();
    },
    goHome() {
      window.location.href = '/';
    },
    handlefinish() {
      const reg = /^1[3456789]\d{9}$/;
      if (localStorage.getItem('name') === this.name) {
        alert("用户名已存在");
      } else if (!this.name) {
        alert("用户名不能为空");
      } else if (!this.password) {
        alert('密码不能为空');
      } else if (!this.confirmPassword) {
        alert('请确认密码');
      } else if (!this.tel) {
        alert('手机号码不能为空');
      } else if (!reg.test(this.tel)) {
        alert("手机号格式不正确");
      } else if (!this.isAgreed) {
        alert('请先阅读并同意用户协议');
      } else {
        localStorage.setItem('name', this.name);
        localStorage.setItem('password', this.password);
        localStorage.setItem('mail', this.mail);
        localStorage.setItem('tel', this.tel);
        localStorage.setItem('s', "false");
        alert("注册成功");
        this.$router.replace('/Login');
      }
    }
  },
  mounted() {
    this.fetchCaptcha();
  }
};
</script>

<style scoped>
#background {
  width: 100%;
  height: 100%;
  background: url("../assets/background.png");
  background-size: 100% 100%;
  position: fixed;
  top: 0;
  left: 0;
}

#contain {
  width: 580px;
  height: 560px;
  position: relative;
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


.text_form {
  color: white;
  margin-left: 20%;
  /* 将文本表单元素的字体大小设置为20px */
  font-size: 10px;
  text-align: left;
  position: absolute;
  /* 将文本表单元素设置为绝对定位 */
  bottom: 0;
  /* 将文本表单元素的底部与容器的底部对齐 */
  width: 100%;
  /* 使文本表单元素宽度充满整个容器宽度 */
  display: block;
}

.form {
  color: white;
  margin-left: 20%;
  margin-top: 20px;
  /* 减少垂直间距 */
  font-size: 20px;
  text-align: left;
}

.form input#phone {
  width: 150px;
}

.captcha-container {
  display: flex;
  align-items: center;
}

.captcha-container img {
  cursor: pointer;
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

.checkboxes {
  display: flex;
  flex-direction: space-between;
  margin-left: 20%;
  margin-top: 10px;
}

.checkbox {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.checkbox input {
  margin-left: 0;
  margin-right: 5px;
}

.button-container {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
}

button {
  height: 33px;
  width: 150px;
  background: rgba(35, 19, 252, 0.425);
  border-radius: 10px;
  color: white;
  box-shadow: none;
  cursor: pointer;
  border: none;
  /* 通常按钮没有边框，如果需要可以添加 */
  padding: 5px 10px;
  /* 如果需要，可以添加内边距 */
  margin-left: 5px;
  /* 如果需要，可以添加外边距 */
}

::v-deep button.normal_button {
  margin-left: 5px;
  padding: 3px 8px;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333;
  font-size: 12px;
  line-height: 1.4;
}

::v-deep button.normal_button:hover {
  background-color: #f5f5f5;
}

::v-deep button.normal_button:focus {
  outline: none;
  border-color: #66afe9;
  box-shadow: 0 0 8px rgba(102, 175, 233, 0.6);
}

.warning {
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
}
</style>