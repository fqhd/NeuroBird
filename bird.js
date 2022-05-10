class Bird {

    constructor(brain){
        this.x = BIRD_POS;
        this.velocity = 0;
        this.y = HEIGHT / 2;
        if(brain){
            this.brain = brain;
        }else{
            this.brain = new NeuralNetwork(3, 4, 1);
        }
        this.score = 0;
        this.fitness = 0;
    }

    update(pipes){
        this.score++;
        this.velocity += GRAVITY * deltaTime;
        this.y += this.velocity * deltaTime;
        if(this.velocity > 1){
            this.velocity = 1;
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
        
        const inputs = [];
        inputs.push(this.y / HEIGHT);
        inputs.push((closest.x - this.x) / STEP);
        if(inputs[1] > 1){
            inputs[1] = 1;
        }
        inputs.push((closest.y - GAP_HEIGHT) / (HEIGHT - GAP_HEIGHT));
        const outputs = this.brain.predict(inputs);

        if(outputs[0] > 0.5){
            this.up();
        }
    }

    draw(){
        fill(255, 100);
        circle(this.x, this.y, BIRD_SIZE);
    }

    up(){
        this.velocity = -0.2;
    }

}