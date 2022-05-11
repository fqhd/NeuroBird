let loggedIndex = 0;

class Bird {
	constructor(brain) {
		this.x = BIRD_POS;
		this.velocity = 0;
		this.y = HEIGHT / 2;
		if (brain) {
			this.brain = brain;
		} else {
			this.brain = new NeuralNetwork(5, 8, 1);
		}
		this.score = 0;
		this.fitness = 0;
	}

	update(pipes) {
		this.score++;
		this.velocity += GRAVITY * deltaTime;
		this.y += this.velocity * deltaTime;
		if (this.velocity > 1) {
			this.velocity = 1;
		}

		let closest = null;
		let closestD = Infinity;
		pipes.forEach((pipe) => {
			const distance = pipe.x + PIPE_WIDTH - this.x;
			if (distance < closestD && distance > 0 && !pipe.isFlipped) {
				closest = pipe;
				closestD = distance;
			}
		});

		const inputs = [];
		inputs.push(this.y / HEIGHT);
		inputs.push(closest.x / WIDTH); // Distance to next pipe
		inputs.push(closest.y / HEIGHT); // Bottom pos of pipe
		inputs.push((closest.y - GAP_HEIGHT) / HEIGHT); // Top pos of pipe
		inputs.push(this.velocity / 2); // Velocity

		const outputs = this.brain.predict(inputs);
		loggedIndex++;
		if (loggedIndex == 30000) {
			loggedIndex = 0;
		}
		if (outputs[0] > 0.5) {
			this.up();
		}
	}

	draw() {
		fill(255, 100);
		circle(this.x, this.y, BIRD_SIZE);
	}

	up() {
		this.velocity = -0.2;
	}
}
