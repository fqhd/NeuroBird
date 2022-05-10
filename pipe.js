class Pipe{
    constructor(x, w, h, isFlipped){
        this.x = x;
        if(isFlipped){
            this.y = 0;
        }else{
            this.y = HEIGHT - h;
        }
        this.isFlipped = isFlipped;
        this.height = h;
        this.width = w;
    }

    update(){
        this.x -= deltaTime * 0.1;
    }

    draw(){
        rect(this.x, this.y, this.width, this.height);
    }
}