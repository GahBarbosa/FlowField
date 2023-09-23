import { particle } from './options.js';


export default class Particle {
    constructor(effect){
        this.effect = effect;
        this.x = Math.floor(Math.random() * this.effect.width );
        this.y = Math.floor(Math.random() * this.effect.height);
        this.speedX;
        this.speedY;
        this.speedModifier = Math.random() * particle.speedModifier[1] + particle.speedModifier[0];
        this.history = [{ x: this.x, y: this.y }];
        this.maxLength = Math.floor(Math.random() * particle.length[1] + particle.length[0]);
        this.angle = 0;
        this.newAngle = 0;
        this.angleCorrector = Math.random() * particle.curve[1] + particle.curve[0];
        this.timer = this.maxLength * 2;
        this.colors = particle.colors;
        this.color = this.colors[ Math.floor(Math.random() * this.colors.length) ]

    }
    draw(context){
        context.beginPath();
        context.moveTo(this.history[0].x,this.history[0].y);
        for(let i = 0; i < this.history.length; i++){
            context.lineTo(this.history[i].x,this.history[i].y);
        }
        context.strokeStyle = this.color;
        context.stroke();
    }
    render(){
        this.timer--;
        if (this.timer >= 1 ){
            let x = Math.floor(this.x / this.effect.options.cell);
            let y = Math.floor(this.y / this.effect.options.cell);
            let index = y * this.effect.cols + x ;
            
            if(this.effect.flowField[index]){
                this.newAngle = this.effect.flowField[index].colorAngle;
                if(this.angle > this.newAngle) {
                    this.angle -= this.angleCorrector
                } else if (this.angle < this.newAngle){
                    this.angle += this.angleCorrector
                } else {
                    this.angle = this.newAngle
                }
                if(this.effect.flowField[index].alpha > 0){
                    this.color = this.effect.flowField[index].color
                }
            }
    
            this.speedX = Math.cos(this.angle);
            this.speedY = Math.sin(this.angle);
            this.x += this.speedX * this.speedModifier;
            this.y += this.speedY * this.speedModifier;

            this.history.push({x: this.x, y: this.y});
            if(this.history.length > this.maxLength){
                this.history.shift()
            }
        } else if (this.history.length > 1){
            this.history.shift()
        } else {
            this.reset()
        }

    }
    reset(){
        let attempts = 0;
        let resetSuccess = false;
        while (attempts < particle.attempt && !resetSuccess){
            attempts++
            let testIndex = Math.floor(Math.random() * this.effect.flowField.length )
            if(this.effect.flowField[testIndex].alpha > 0){
                this.x = this.effect.flowField[testIndex].x
                this.y = this.effect.flowField[testIndex].y
                this.history = [{ x: this.x, y: this.y }];
                this.timer = this.maxLength * 2;
                resetSuccess = true
            }
        }
        if(!resetSuccess){
            this.x = Math.floor(Math.random() * this.effect.width );
            this.y = Math.floor(Math.random() * this.effect.height);
            this.history = [{ x: this.x, y: this.y }];
            this.timer = this.maxLength * 2;
        }
            
    }
}