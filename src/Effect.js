import Particle from './Particle.js';
import { options, size, text, grid, particle } from './options.js';

export default class Effect {
    constructor(canvas, ctx){
        this.context = ctx
        this.canvas = canvas
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.particles = []
        this.rows;
        this.cols;
        this.flowField = []
        this.options = options
        this.size = size;
        this.text = text;
        this.grid = grid
        this.particle = particle

        this.init()

        window.addEventListener('keydown', e =>{
            if (e.code === 'Enter') { this.update()}
        })
       
        window.addEventListener('resize', e => {
            this.resize( Math.floor(e.target.innerWidth / this.options.cell) * this.options.cell, Math.floor(e.target.innerHeight / this.options.cell) * this.options.cell ) 
        })
    }
    
    init(){
        // text
        this.drawText()

        this.context.lineWidth = this.particle.line

        // flow field
        this.rows = Math.floor(this.height / this.options.cell)
        this.cols = Math.floor(this.width / this.options.cell)
        this.flowField = []

        // scan pixel data
        const pixels = this.context.getImageData(0, 0, this.width, this.height).data
        for (let y = 0; y < this.height; y += this.options.cell) {
            for (let x = 0; x < this.width; x += this.options.cell) {
                const index = ( y * this.width + x ) * 4;
                const red = pixels[index];
                const green = pixels[index + 1];
                const blue = pixels[index] + 2;
                const alpha = pixels[index + 3];
                const grayscale = ( red + green + blue ) / 3;
                const colorAngle = Number( (( grayscale / 255 ) * 6.28).toFixed(2) );
                this.flowField.push({
                    x: x,
                    y: y,
                    alpha: alpha,
                    colorAngle: colorAngle 
                })
            }            
        }

        // particles
        for (let i = 0; i < this.particles.length; i++) {
            delete this.particles[i]
        }
        this.particles = []
        for (let i = 0; i < this.particle.number; i++) {
            this.particles.push(new Particle(this))
        }
    }

    update(){
        this.options = options
        this.size = size;
        this.text = text;
        this.grid = grid;
        this.particle = particle;
        // this.drawText()

        this.init()
    }

    drawText(){
        this.context.font = `${this.text.size} ${this.text.font}`
        this.context.textAlign = this.text.align
        this.context.textBaseline = this.text.baseAlign

        const gradient = this.context.createLinearGradient(0,0,this.width,this.height)
        this.text.gradient.forEach(color => {
            gradient.addColorStop(color.stop,color.hex )
        });

        this.context.fillStyle = gradient
        this.context.fillText(
                this.text.content
              , this.width * this.text.position[0]
              , this.height * this.text.position[1]
              , this.width * this.text.limit[0]
              , this.height * this.text.limit[1]
            )
    }

    drawGrid(){
        this.context.save();
        this.context.strokeStyle = this.grid.color
        for (let c = 0; c < this.cols; c++) {
            this.context.beginPath()
            this.context.moveTo(this.options.cell * c, 0);          
            this.context.lineTo(this.options.cell * c, this.height);
            this.context.stroke();           
        }
        for (let r = 0; r < this.rows; r++) {
            this.context.beginPath()
            this.context.moveTo(0, this.options.cell * r);          
            this.context.lineTo(this.width, this.options.cell * r);
            this.context.stroke();           
        }
        this.context.restore();
    }

    resize(width, height){
        this.canvas.width = width
        this.canvas.height = height
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.init()
    }

    render(){
        if(this.grid.show) this.drawGrid()
        if(this.text.show) this.drawText()
        this.particles.forEach(particle => {
            particle.draw(this.context)
            particle.render()
        })

    }
}