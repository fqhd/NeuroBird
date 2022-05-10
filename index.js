const pipes = [];
const NUM_PIPES = 3;
const WIDTH = 800;
const HEIGHT = 600;
const GAP_HEIGHT = 100;
const PIPE_WIDTH = 60;
const GRAVITY = 0.0005;
const bird = new Bird(100);

function setup(){
    createCanvas(WIDTH, HEIGHT);
    createPipes();
}

function draw(){
    clear();
    background(200);

    updatePipes();
    drawPipes();
    bird.update();
    bird.draw();

}

function keyPressed(e){
    if(e.key == ' '){
        bird.up();
    }
}

function updatePipes(){
    pipes.forEach(p => {
        p.update();
    });
    let shouldCreate = false;
    for(let i = pipes.length - 1; i >= 0; i--){
        if(pipes[i].x + pipes[i].width < 0){
            pipes.splice(i, 1);
            shouldCreate = true;
        }
    }
    if(shouldCreate){
        createPipePair(WIDTH);
    }
}

function drawPipes(){
    pipes.forEach(p => {
        p.draw();
    });
}

function createPipes(){
    const step = (WIDTH + PIPE_WIDTH) / NUM_PIPES;
    let currentOffset = WIDTH;
    for(let i = 0; i < NUM_PIPES; i++){
        createPipePair(currentOffset);
        currentOffset += step;
    }
}

function createPipePair(offset){
    const randomHeight = floor(random(0, HEIGHT - GAP_HEIGHT));

    const p1 = new Pipe(offset, PIPE_WIDTH, randomHeight, false);
    const p2 = new Pipe(offset, PIPE_WIDTH, (HEIGHT - randomHeight) - GAP_HEIGHT, true);

    pipes.push(p1);
    pipes.push(p2);
}