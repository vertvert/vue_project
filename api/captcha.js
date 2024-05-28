const express = require('express');
const { createCanvas, render } = require('canvas');
const app = express();

// 导出一个异步函数用于生成验证码图片的数据 URL
module.exports = async function generateCaptcha() {
  // 生成随机的6位数字验证码
  const captchaText = Array(6)
    .fill(null)
    .map(() => Math.floor(Math.random() * 10))
    .join('');

  const canvas = createCanvas(150, 50);
  const ctx = canvas.getContext('2d');
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // 绘制验证码文本到画布上
  ctx.fillText(captchaText, canvas.width / 2, canvas.height / 2);

  // 将canvas转换为图片数据URL
  return canvas.toBuffer();
};