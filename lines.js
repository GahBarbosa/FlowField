const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight


const patternImage = document.getElementById("pattern")
const pattern1 = ctx.createPattern(patternImage, 'no-repeat')

ctx.strokeStyle = pattern1

class Line {
    constructor(canvas){
        this.canvas = canvas
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.history = [{ x: this.x, y: this.y }];
        this.lineWidth = Math.floor(Math.random() * 15 + 1)
        this.hue = Math.floor(Math.random() * 360)
        this.maxLength = Math.floor(Math.random() * 150 + 10)
        this.speedX = Math.floor(Math.random() * 1 - 0.5 )
        this.speedY = 2
        this.lifeSpan = this.maxLength * 3
        this.timer = 0
        this.angle = 0
        this.curve = 15
    }

    draw(context){
        // context.strokeStyle = 'hsl('+ this.hue +', 100%, 50%)'
        context.lineWidth = this.lineWidth
        context.beginPath()
        context.moveTo(this.history[0].x,this.history[0].y)
      
        for(let i = 0; i < this.history.length; i++){
            context.lineTo(this.history[i].x,this.history[i].y)
        }
        context.stroke()
    }

    update(){
        this.timer ++;
        this.angle += 0.1
        if(this.timer < this.lifeSpan){
            this.x += Math.sin(this.angle) * this.curve 
            this.y += this.speedY 
            this.history.push({x: this.x, y: this.y})
            if(this.history.length > this.maxLength){
                this.history.shift()
            }
        } else if( this.history.length <= 1 ) {
            this.reset()
        } else {
            this.history.shift()
        }
    }

    reset(){
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.history = [{ x: this.x, y: this.y }];
        this.timer = 0;
    }

}

const linesArray = []
const numbersOfLines = 100
for(let i=0; i < numbersOfLines; i++){
    linesArray.push(new Line(canvas))
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    linesArray.forEach(line => {
        line.draw(ctx)
        line.update()

    })
    requestAnimationFrame(animate)
}
animate()