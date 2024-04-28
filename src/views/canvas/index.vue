<template>
  <canvas id="stockGraph" width="150" height="150">
    current stock price: $3.15 +0.15
  </canvas>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'

onMounted(() => {
  // getCanvas()
  // setTriangle()
  // setSmiley()
  setSquare()
})

function getCanvas() {
  const canvas = document.getElementById('stockGraph') as HTMLCanvasElement
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    console.log(ctx)

    // 绘制一个填充的矩形
    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect(30, 30, 55, 50);

    // 绘制一个矩形的边框
    // ctx.strokeStyle = "rgba(0, 0, 200, 0.5)";
    ctx.strokeRect(0, 0, 60, 60)

    // 清除指定矩形区域，让清除部分完全透明。
    ctx.clearRect(35, 35, 40, 40)

    ctx.rect(40, 40, 20, 20)
  }
}

// 三角形
function setTriangle() {
  const canvas = document.getElementById('stockGraph') as HTMLCanvasElement
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();

    // 填充三角形
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(130, 50);
    ctx.lineTo(50, 130);
    ctx.fill();

    // 描边三角形
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.lineTo(150, 70);
    ctx.lineTo(70, 150);
    ctx.closePath();
    ctx.stroke();
    console.log(ctx)
  }
}

// 笑脸
function setSmiley() {
  const canvas = document.getElementById('stockGraph') as HTMLCanvasElement
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false);   // 口 (顺时针)
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // 左眼
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // 右眼
    ctx.stroke();
  }
}

// 方形
function setSquare() {
  const canvas = document.getElementById('stockGraph') as HTMLCanvasElement
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    // 画背景
    ctx.fillStyle = '#FD0';
    ctx.fillRect(0, 0, 75, 75);
    ctx.fillStyle = '#6C0';
    ctx.fillRect(75, 0, 75, 75);
    ctx.fillStyle = '#09F';
    ctx.fillRect(0, 75, 75, 75);
    ctx.fillStyle = '#F30';
    ctx.fillRect(75, 75, 75, 75);
    ctx.fillStyle = '#FFF';
    ctx.globalAlpha = 0.2;

    // 画半透明圆
    for (var i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);
      ctx.fill();
    }
  }
}


</script>
<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
