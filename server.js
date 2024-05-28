const express = require('express');
const cors = require('cors');
const generateCaptcha = require('./api/captcha.js'); // 导入修改后的 captcha.js
const app = express();

app.use(cors()); // 启用跨域资源共享

// 验证码路由
app.get('/api/captcha', async (req, res) => {
    try {
        // 使用导入的函数生成验证码图片的数据 URL
        const imageBuffer = await generateCaptcha();
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.send(imageBuffer);
      } catch (error) {
        console.error('Error generating captcha:', error);
        res.status(500).send('Internal Server Error');
      }
    });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});