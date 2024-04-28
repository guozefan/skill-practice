<template>
  <div ref="pixiDom" class="pixi"> </div>
</template>
<script setup lang="ts">
import * as PIXI from 'pixi.js';
import { reactive, ref, onMounted } from 'vue'
import { OutlineFilter, GlowFilter } from 'pixi-filters'


const pixiDom= ref<HTMLElement  | null>(null)
let pixi = null as any

onMounted(()=>{
  instPixi()
})

const instPixi =()=>{
  console.log(pixiDom.value?.offsetHeight)
  pixi = new PIXI.Application({
    width:pixiDom.value?.offsetWidth,
    height: pixiDom.value?.offsetHeight,
    backgroundColor:0x1099bb,
    resolution:window.devicePixelRatio || 1,

  })
  pixiDom.value?.appendChild(pixi.view)

  // 创建一个矩形
  const rectanfle = new PIXI.Graphics();
  rectanfle.beginFill(0x66ccff);// 填充颜色
  rectanfle.drawRect(200,200,64,64);// 绘制矩形
  rectanfle.endFill();// 结束填充
  rectanfle.position.set(300,200) // 改变位置
  rectanfle.rotation = 0.5 // 旋转
  rectanfle.pivot.set(82,82) //
  rectanfle.lineStyle(4,0xff0000,1) // 线宽，线颜色，透明度

  // 创建一个圆形
  const circle = new PIXI.Graphics();
  circle.beginFill(0xff0000);// 填充颜色
  // circle.drawCircle(100,100,32);
  // circle.drawRoundedRect(100,100,164,64,10)
  // circle.drawEllipse(150,150,64,24)
  // circle.drawPolygon([0,0,50,0,100,100,0,100])
  circle.arc(0,0,32,0,Math.PI,false)
  circle.endFill();// 结束填充
  circle.position.set(300,200) // 改变位置
  pixi.stage.addChild(rectanfle)
  pixi.stage.addChild(circle)


  // 绘制线段
  const line =  new PIXI.Graphics();
  line.lineStyle(4,0xff0000,1)
  line.moveTo(0,0)
  line.lineTo(100,100)
  line.position.set(300,300)
  pixi.stage.addChild(line)


  // 创建一个纹理
  const texture = PIXI.Texture.from('./image/luffy.jpg')

  // 创建一个精灵
  const sprice = new PIXI.Sprite(texture)
  // sprice.anchor.set(0.8,0.6) // 锚点
  sprice.x = 520
  sprice.y = 180
  // sprice.rotation = Math.PI / 4 // 旋转
  sprice.scale.set(0.5,0.5) // 缩放
  sprice.alpha = 0.5
  pixi.stage.addChild(sprice)
  // pixi.ticker.add((delta:number)=>{
  //   // console.log(delta)
  //   sprice.rotation += 0.01 * delta
  // })




  // 为精灵添加交互事件
  sprice.interactive = true
  sprice.on('click',()=>{
      console.log('click')
  })

  // 创建模糊滤镜
  // const blurFilter = new PIXI.BlurFilter();

  // // 设置模糊滤镜的模糊程度
  // blurFilter.blur =1
  // // 将模糊滤镜添加到精灵上
  // sprice.filters = [blurFilter]

  // 参数1：为轮廓宽度，参数2为轮廓颜色
  const outlineFilter = new OutlineFilter(5,0xfff00);
  sprice.filters = [outlineFilter]

  // 创建发光滤镜GlowFilter
  const glowFilter = new GlowFilter({
    distance:15,
    outerStrength:5,
    innerStrength:0,
    color:0xff0000,
    quality:0.5
  })

  sprice.filters = [outlineFilter,glowFilter]


  const text = new PIXI.Text('欢迎光临异世界',{
    fontFamily:'Arial',
    fontSize:66,
    fill:0xff9530,
    align:'center'
  })

  text.x = pixi.screen.width / 2;
  text.y = pixi.screen.height / 2;
  text.anchor.set(0.5)
  // pixi.stage.addChild(text)

    // 创建一个精灵
    const bunny = PIXI.Sprite.from('./image/skys.jpg')
    bunny.width = pixi.screen.width
    bunny.height = pixi.screen.height
    // 使用文字作为精灵的遮罩
    bunny.mask = text
    pixi.stage.addChild(bunny)


}




</script>
<style lang="scss" scoped>
.pixi{
  width: 100%;
  height: 100%;
}
</style>
