function clamp(min, max, value) {
	return Math.max(min, Math.min(max, value));
}

class Pipe {
	constructor(x, w, h, isFlipped) {
		this.x = x;
		if (isFlipped) {
			this.y = 0;
		} else {
			this.y = HEIGHT - h;
		}
		this.isFlipped = isFlipped;
		this.height = h;
		this.width = w;
	}

	hit(obj) {
		const x = clamp(this.x, this.x + this.width, obj.x);
		const y = clamp(this.y, this.y + this.height, obj.y);
		const d = Math.sqrt(Math.pow(x - obj.x, 2) + Math.pow(y - obj.y, 2));
		if (d < BIRD_SIZE / 2) {
			return true;
		}
		return false;
	}

	update() {
		this.x -= deltaTime * 0.2;
	}

	draw(assets) {
		fill(255);
		// rotate(90);

		if (this.isFlipped) {
			image(assets.pipe.left, this.x, this.y, this.width, this.height);
			image(assets.pipe.bottom, this.x, this.height - 80, this.width, 80);
		}else{
			image(assets.pipe.right, this.x, this.y, this.width, this.height);
			image(assets.pipe.top, this.x, this.y, this.width, 80);
		}

	}
}
