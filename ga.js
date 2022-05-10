function mutate(x) {
    if (random(1) < 0.1) {
        let offset = randomGaussian() * 0.5;
        let newx = x + offset;
        return newx;
    } else {
        return x;
    }
}

function comp(a, b){
    if(a.fitness > b.fitness){
        return 1;
    }
    return -1;
}

function nextGeneration(){
    calculateFitness();

    savedBirds.sort(comp);

    for(let i = 0; i < TOTAL; i++){
        const chosenBird = pickOne();
        chosenBird.brain.mutate(mutate);
        birds.push(new Bird(chosenBird.brain.copy()));
    }

    savedBirds = [];
}

function pickOne(){
    let index = 0;
    let r = random();
    while(r > 0){
        r = r - savedBirds[index].fitness;
        index++;
    }
    index--;
    let bird = savedBirds[index];
    let child = new Bird(bird.brain);
    return child;
}

function calculateFitness(){
    let sum = 0;
    savedBirds.forEach(b => {
        sum += Math.pow(b.score, 2);
    });

    savedBirds.forEach(b => {
        b.fitness = Math.pow(b.score, 2) / sum;
        b.score = 0;
    });
}