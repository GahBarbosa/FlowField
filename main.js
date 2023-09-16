import './style.css'
import  Effect  from './Effect.js'

document.querySelector('#app').innerHTML = `
  <div>
  
    <canvas id="canvas1"></canvas>
  </div>
`

const canvas = document.querySelector('#canvas1')
const ctx = canvas.getContext('2d')

canvas.width = 1500;
canvas.height = 500;


ctx.fillStyle = 'white'
ctx.strokeStyle = 'white'
ctx.lineWidth = 1

const effect =  new Effect(canvas, ctx)

function animate(){
    ctx.clearRect(0,0, canvas.width,canvas.height)
    effect.render()
    requestAnimationFrame(animate)
}
animate()