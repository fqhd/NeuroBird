class Bird {

    constructor(x){
        this.x = x;
        this.velocity = 0;
        this.y = HEIGHT / 2;
    }

    update(){
        this.velocity += GRAVITY * deltaTime;
        this.y += this.velocity * deltaTime;
        if(this.velocity > 1){
            this.velocity = 1;
        }
        if(this.y > HEIGHT){
            this.y = HEIGHT;
        }
    }

    draw(){
        circle(this.x, this.y, 30);
    }

    up(){
        this.velocity = -0.2;
    }

}