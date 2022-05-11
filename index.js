let pipes = [];
const birds = [];
let savedBirds = [];
let clouds = [];
const CLOUD_WIDTH = 100;
const CLOUD_HEIGHT = 50;
const NUM_CLOUDS = 10;
const NUM_PIPES = 2;
const WIDTH = 800;
const HEIGHT = 600;
const GAP_HEIGHT = 150;
const PIPE_WIDTH = 60;
const GRAVITY = 0.0005;
const STEP = (WIDTH + PIPE_WIDTH) / NUM_PIPES;
const TOTAL = 200;
const BIRD_SIZE = 40;
const BIRD_POS = 100;
let slider;
let assets;

function preload() {
	assets = {
		bird: {
			up: loadImage("frame-1.png"),
			down: loadImage("frame-2.png"),
		},
		pipe: {
			top: loadImage("pipe-top.png"),
			bottom: loadImage("pipe-bottom.png"),
			left: loadImage("pipe-left.png"),
			right: loadImage("pipe-right.png"),
		},
		cloud: loadImage("Cloud.png"),
	};
}

function setup() {
	createClouds();
	createCanvas(WIDTH, HEIGHT);
	createPipes();
	createPopulation();
	slider = createSlider(1, 100, 1);
}

function draw() {
	for (let i = 0; i < slider.value(); i++) {
		clear();
		background("#03cafc");

		drawClouds();
		updateClouds();
		updatePipes();
		drawPipes();
		updateBirds();
		drawBirds();

		if (birds.length == 0) {
			nextGeneration();
			console.log("next Generation");
			resetSimulation();
		}
	}
}

function resetSimulation() {
	pipes = [];
	createPipes();
}

function createClouds() {
	for (let i = 0; i < NUM_CLOUDS; i++) {
		clouds.push({
			x: random(WIDTH + CLOUD_WIDTH),
			y: random(HEIGHT * 0.3),
			scale: random(0.8, 1.2),
			speed: random(0.02, 0.05),
		});
	}
}

function updateClouds() {
	clouds.forEach((c) => {
		c.x -= deltaTime * c.speed;
		if (c.x + CLOUD_WIDTH < 0) {
			c.x = WIDTH;
		}
	});
}

function drawClouds() {
	clouds.forEach((c) => {
		image(
			assets.cloud,
			c.x,
			c.y,
			CLOUD_WIDTH * c.scale,
			CLOUD_HEIGHT * c.scale
		);
	});
}

function checkAlive() {
	pipes.forEach((pipe) => {
		for (let i = birds.length - 1; i >= 0; i--) {
			if (pipe.hit(birds[i])) {
				savedBirds.push(birds[i]);
				birds.splice(i, 1);
			}
		}
	});
	for (let i = birds.length - 1; i >= 0; i--) {
		if (birds[i].y > HEIGHT || birds[i].y < 0) {
			savedBirds.push(birds[i]);
			birds.splice(i, 1);
		}
	}
}

function updateBirds() {
	birds.forEach((b) => {
		b.update(pipes);
	});
	checkAlive();
}

function drawBirds() {
	birds.forEach((b) => {
		b.draw(assets);
	});
}

function updatePipes() {
	pipes.forEach((p) => {
		p.update();
	});
	let shouldCreate = false;
	for (let i = pipes.length - 1; i >= 0; i--) {
		if (pipes[i].x + pipes[i].width < 0) {
			pipes.splice(i, 1);
			shouldCreate = true;
		}
	}
	if (shouldCreate) {
		createPipePair(WIDTH);
	}
}

function drawPipes() {
	pipes.forEach((p) => {
		p.draw(assets);
	});
}

function createPipes() {
	let currentOffset = WIDTH;
	for (let i = 0; i < NUM_PIPES; i++) {
		createPipePair(currentOffset);
		currentOffset += STEP;
	}
}

function createPipePair(offset) {
	const randomHeight = floor(random(0, HEIGHT - GAP_HEIGHT));

	const p1 = new Pipe(offset, PIPE_WIDTH, randomHeight, false);
	const p2 = new Pipe(
		offset,
		PIPE_WIDTH,
		HEIGHT - randomHeight - GAP_HEIGHT,
		true
	);

	pipes.push(p1);
	pipes.push(p2);
}

function createPopulation() {
	for (let i = 0; i < TOTAL; i++) {
		const bird = new Bird();
		birds.push(bird);
	}
}
