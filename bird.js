class Bird {

    constructor(x){
        this.x = x;
        this.velocity = 0;
        this.y = HEIGHT / 2;
        this.brain = new NeuralNetwork(4, 4, 1);
    }

    update(pipes){
        this.velocity += GRAVITY * deltaTime;
        this.y += this.velocity * deltaTime;
        if(this.velocity > 1){
            this.velocity = 1;
        }
        if(this.y > HEIGHT){
            this.y = HEIGHT;
        }
        if(this.y < 0){
            this.y = 0;
        }

        let closest = null;
        let closestD = Infinity;
        pipes.forEach(pipe => {
            const distance = pipe.x - this.x;
            if(distance < closestD && distance > 0 && !pipe.isFlipped){
                closest = pipe;
                closestD = distance;
            }
        });
        const inputs = [this.x, this.y, closest.x, closest.height];
        const outputs = this.brain.predict(inputs);

        if(outputs[0] > 0.5){
            this.up();
        }
    }

    draw(){
        circle(this.x, this.y, 30);
    }

    up(){
        this.velocity = -0.2;
    }

}