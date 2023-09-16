import Particle from './Particle.js';

export default class Effect {
    constructor(canvas, ctx){
        this.context = ctx
        this.canvas = canvas
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.particles = []
        this.numberOfParticles = 1000
        this.cellSize = 10
        this.rows;
        this.cols;
        this.flowField = []
        this.grid = false;
        this.text = false;

        this.init()

        window.addEventListener('keydown', e =>{
            if (e.key ==='d') this.grid = !this.grid
            if (e.key ==='f') this.text = !this.text
        })

        window.addEventListener('resize', e => {
            // this.resize( e.target.innerWidth, e.target.innerHeight )
        })
    }
    init(){
        // flow field
        this.rows = Math.floor(this.height / this.cellSize)
        this.cols = Math.floor(this.width / this.cellSize)
        this.flowField = []
        // text
        this.drawText()

        // scan pixel data

        const pixels = this.context.getImageData(0, 0, this.width, this.height).data
        for (let y = 0; y < this.height; y += this.cellSize) {
            for (let x = 0; x < this.width; x += this.cellSize) {
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
        this.particles = []
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this))
        }
    }

    drawText(){
        this.context.font = '350px Impact'
        this.context.textAlign = 'center'
        this.context.textBaseline = 'middle'

        const gradient1 = this.context.createLinearGradient(0,0,this.width,this.height)
        gradient1.addColorStop(0.3, 'rgb(255,0,0)')
        gradient1.addColorStop(0.4, 'rgb(0,255,0)')
        gradient1.addColorStop(0.6, 'rgb(150,100,100)')
        gradient1.addColorStop(0.8, 'rgb(0,255,255)')

        const gradient2 = this.context.createLinearGradient(0,0,this.width,this.height)
        gradient2.addColorStop(0.3, 'rgb(255,0,0)')
        gradient2.addColorStop(0.4, 'rgb(0,255,0)')
        gradient2.addColorStop(0.6, 'rgb(150,100,100)')
        gradient2.addColorStop(0.8, 'rgb(0,255,255)')

        this.context.fillStyle = gradient2
        this.context.fillText('AA', this.width * 0.5, this.height * 0.5, this.width * 0.8, this.height * 0.8)
    }

    drawGrid(){
        this.context.save();
        this.context.strokeStyle = 'red'
        for (let c = 0; c < this.cols; c++) {
            this.context.beginPath()
            this.context.moveTo(this.cellSize * c, 0);          
            this.context.lineTo(this.cellSize * c, this.height);
            this.context.stroke();           
        }
        for (let r = 0; r < this.rows; r++) {
            this.context.beginPath()
            this.context.moveTo(0, this.cellSize * r);          
            this.context.lineTo(this.width, this.cellSize * r);
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
        if(this.grid) this.drawGrid()
        if(this.text) this.drawText()
        this.particles.forEach(particle => {
            particle.draw(this.context)
            particle.update()
        })
    }
}
