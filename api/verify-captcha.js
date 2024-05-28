const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.text()); // 用于解析文本数据

app.post('/api/verify-captcha', async (req, res) => {
  const { captcha } = req.body; // 获取前端提交的验证码
  const expectedCaptcha = '这里是生成的验证码，长度为6位数字'; // 根据实际情况生成预期的验证码

  if (captcha === expectedCaptcha) {
    // 验证成功
    res.status(200).send('验证码正确！');
  } else {
    // 验证失败
    res.status(400).send('验证码错误！');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});