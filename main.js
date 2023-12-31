import './style.css'
import  Effect  from './src/Effect.js'
import { 
    setupMenu
  , options
  , particle
  , text
  , grid
} from './src/options'

const textHtml = `
<div>
  <div class="input-container">
    <label for="text-show">Show Text</label>
    <input type="checkbox" id="text-show">
  </div>
  <br/>
  <div class="input-container">
    <label for="text-content">Text</label>
    <input id="text-content" class="text-input">
  </div>
  <br/>
  <div class="input-container">
    <label for="text-size">Tamanho</label>
    <input class="slider" id="text-size" type="range" value="0.5" step="0.1" min="0.1" max="1" />
  </div>
  <br/>
  <div class="input-container">
    <label for="text-font">Text Font</label>
    <select id="text-font">
      <option value="Impact" selected>Impact</option>
      <option value="Arial" >Arial </option>
      <option value="Verdana">Verdana</option>
    </select> 
  </div>
  <br/>
  <div class="input-container">
    <label for="text-x">Posição texto X</label>
    <input class="slider" id="text-x" type="range" value="0.5" step="0.1" min="0.1" max="1" />
  </div>
  <br/>
  <div class="input-container">
    <label for="text-y">Posição texto Y</label>
    <input class="slider" id="text-y" type="range" value="0.5" step="0.1" min="0.1" max="1" />
  </div>
  <br/>
  <div class="input-container">
    <label for="text-limit-min">Limite do texto X</label>
    <input class="slider" id="text-limit-min" type="range" value="0.8" step="0.1" min="0.1" max="1" />
  </div>
  <br/>
  <div>
    <label>Gradient</label>
    <br/><br/>
    <div class="input-container">
      <input type="color" id="text-gradient1" value="#ff0000">
      <input class="slider" id="text-gradient1-stop1" type="range" value="0.1" step="0.1" min="0.1" max="1" />
    </div>
    <div class="input-container">
      <input type="color" id="text-gradient2" value="#ff0000">
      <input class="slider" id="text-gradient1-stop2" type="range" value="0.5" step="0.1" min="0.1" max="1" />
    </div>
    <div class="input-container">
      <input type="color" id="text-gradient3" value="#ff0000">
      <input class="slider" id="text-gradient1-stop3" type="range" value="0.8" step="0.1" min="0.1" max="1" />
    </div>
  </div>
<br/>
</div>
`
  
const particleHtml = `
<div>
  <div class="input-container">
    <label for="particle-number">Quantidade de particulas</label>
    <input class="slider" id="particle-number" type="range" value="1000" step="1" min="1" max="3000" />
  </div>
  <div class="input-container">
    <label for="particle-line">Espessura da linha</label>
    <input class="slider" id="particle-line" type="range" value="1" step="0.1" min="0.1" max="5" />
  </div>
  <div class="input-container">
    <label for="particle-color1">Cores</label>
    <input type="color" id="particle-color1" value="#b582b5">
    <input type="color" id="particle-color2" value="#800080">
    <input type="color" id="particle-color3" value="#FFFFFF">
  </div>
  <div class="input-container">
    <label for="particle-speed-min">Velocidade</label>
    <input class="slider" id="particle-speed-min" type="range" value="1" step="0.1" min="0.1" max="5" />
    <input class="slider" id="particle-speed-max" type="range" value="1" step="0.1" min="0.1" max="5" />
  </div>
  <div class="input-container">
    <label for="particle-length-min">Tamanho da linha</label>
    <input class="slider" id="particle-length-min" type="range" value="1" step="1" min="1" max="500" />
    <input class="slider" id="particle-length-max" type="range" value="100" step="1" min="1" max="500" />
  </div>
  <div class="input-container">
    <label for="particle-curve-min">Curva da linha</label>
    <input class="slider" id="particle-curve-min" type="range" value="0.01" step="0.01" min="0.01" max="3" />
    <input class="slider" id="particle-curve-max" type="range" value="3" step="0.01" min="0.01" max="3" />
  </div>
  <div class="input-container">
    <label for="particle-attempt">Tentativas de nascer no texto</label>
    <input class="slider" id="particle-attempt" type="range" value="10" step="1" min="0" max="50" />
  </div>
</div>
`

const gridHtml = `
<div>
  <div>
    <label for="grid-show">Show Grid</label>
    <input type="checkbox" id="grid-show">
  </div>
  <div>
    <label for="grid-cell">Pixels por celula</label>
    <input class="slider" id="grid-cell" type="range" value="10" step="1" min="0" max="50" />
  </div>
  <div>
    <label for="grid-color">Cor do grid</label>
    <input type="color" id="grid-color" value="#FF0000">
  </div>
</div>
`

const imgHtml = `
<div class='input-container'>
  <label for="image-show">Mostrar Imagem
    <input type="checkbox" id="image-show">
  </label>
  <input accept="image/*" type='file' id="imgInp" />
</div>
`

document.querySelector('#app').innerHTML = `
  <div id="container">
    <button id="menu-btn">
    <img 
      src='./assets/gear.svg' 
      class="svg"
      alt="some file"  
      height='40px' 
      width='40px' 
    />
    </button>
    <div>
    <canvas id="canvas1"></canvas>
    </div>
    <div id="menu" class="hidden">
    <p>Para as particulas atualizarem, tire os input de foco clicando fora deles,</p>
    <p> e aperte 'Enter'</p>
    <br/>
      ${imgHtml}
      <hr>
      ${textHtml}
      <hr>
      ${particleHtml}
      <hr>
      ${gridHtml}
    </div>
  </div>
`

const canvas = document.querySelector('#canvas1')
const ctx = canvas.getContext('2d', { willReadFrequently: true });
canvas.width = options.width;
canvas.height = options.height;
ctx.lineWidth = particle.line ;

const effect = new Effect(canvas, ctx)

function animate(){
    ctx.clearRect(0,0, canvas.width,canvas.height)
    effect.render()
    requestAnimationFrame(animate)
}
animate()

setupMenu(document.querySelector('#menu-btn'))

changeImage(document.querySelector('#imgInp'),options, 'photo')
changeCheckbox(document.querySelector('#image-show'),options,'photoShow')


changeCheckbox(document.querySelector('#text-show'),text,'show')
changeInput(document.querySelector('#text-content'),text,'content','string')
changeInput(document.querySelector('#text-font'),text,'font','string')
changeInput(document.querySelector('#text-size'),text,'size','number')
changeArray(document.querySelector('#text-x'),text,'position','number',0)
changeArray(document.querySelector('#text-y'),text,'position','number',1)
changeArray(document.querySelector('#text-limit-min'),text,'limit','number',0)
changeArrayObject(document.querySelector('#text-gradient1'),text,'gradient','string',0,'hex')
changeArrayObject(document.querySelector('#text-gradient1-stop1'),text,'gradient','string',0,'stop')
changeArrayObject(document.querySelector('#text-gradient2'),text,'gradient','string',1,'hex')
changeArrayObject(document.querySelector('#text-gradient1-stop2'),text,'gradient','string',1,'stop')
changeArrayObject(document.querySelector('#text-gradient3'),text,'gradient','string',2,'hex')
changeArrayObject(document.querySelector('#text-gradient1-stop3'),text,'gradient','string',2,'stop')

changeInput(document.querySelector('#particle-number'),particle,'number','number')
changeInput(document.querySelector('#particle-line'),particle,'line','number')
changeArray(document.querySelector('#particle-color1'),particle,'colors','string',0)
changeArray(document.querySelector('#particle-color2'),particle,'colors','string',1)
changeArray(document.querySelector('#particle-color3'),particle,'colors','string',2)
changeArray(document.querySelector('#particle-speed-min'),particle,'speedModifier','number',0)
changeArray(document.querySelector('#particle-speed-max'),particle,'speedModifier','number',1)
changeArray(document.querySelector('#particle-length-min'),particle,'length','number',0)
changeArray(document.querySelector('#particle-length-max'),particle,'length','number',1)
changeArray(document.querySelector('#particle-curve-min'),particle,'curve','number',0)
changeArray(document.querySelector('#particle-curve-max'),particle,'curve','number',1)
changeInput(document.querySelector('#particle-attempt'),particle,'attempt','number')

changeCheckbox(document.querySelector('#grid-show'),grid,'show')
changeInput(document.querySelector('#grid-cell'),options,'cell','number')
changeInput(document.querySelector('#grid-color'),grid,'color','string')


function changeArrayObject(element, object, property, type, index, secProperty) {
  element.addEventListener('change', () => {console.log(object,property); object[property][index][secProperty] = normalizeType(type,element.value) })
}

function changeArray(element, object, property, type, index) {
  element.addEventListener('change', () => {console.log(object,property);  object[property][index] = normalizeType(type,element.value) })
}

function changeCheckbox(element, object, property) {
  element.addEventListener('change', () =>  object[property] = !object[property])
}

function changeInput(element, object, property, type) {
  element.addEventListener('change', () => {console.log(object,property);  object[property] = normalizeType(type,element.value) })
}

function changeImage(element) {
  element.addEventListener('change', (evt) => {
    const file = evt.target.files[0]
    reader(file)
  })
}

function normalizeType(type, value){
  switch (type) {
    case 'string':
      return String(value)
    case 'number':
      return Number(value)
    default:
      return value
  }  
}

function reader(file, gray = true) {
  const reader = new FileReader()
  reader.onload = (evt) => {
      const image = new Image()
      image.onload = (evt) => {
        options.photo = image
      }
      image.src = evt.target.result
  }
  reader.readAsDataURL(file)
}
