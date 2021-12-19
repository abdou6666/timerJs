class Timer {
	constructor(startButton, pauseButton, durationInput, callbacks) {
		this.durationInput = durationInput;
		this.startButton = startButton;
		this.pauseButton = pauseButton;

		if (callbacks) {
			this.onStart = callbacks.onStart;
			this.onTick = callbacks.onTick;
			this.onComplete = callbacks.onComplete;
		}
		this.startButton.addEventListener('click', this.start);
		this.pauseButton.addEventListener('click', this.pause);
		this.durationInput.addEventListener('click', this.pause);
	}

	start = () => {
		if (!this.verifyInput()) return false;

		this.tick();
		if (this.onStart) {
			this.onStart(this.timeRemaining);
		}
		this.intervalId = setInterval(this.tick, 50);
	};
	tick = () => {
		if (this.timeRemaining <= 0) {
			this.pause();
			if (this.onComplete) {
				this.onComplete();
			}
		} else {
			this.timeRemaining = this.timeRemaining - 0.05;
			if (this.onTick) {
				this.onTick(this.timeRemaining);
			}
		}
	};
	pause = () => {
		clearInterval(this.intervalId);
	};
	get timeRemaining() {
		return parseFloat(this.durationInput.value);
	}

	set timeRemaining(time) {
		this.durationInput.value = time.toFixed(2);
	}
	verifyInput = () => {
		if (parseInt(this.durationInput.value) <= 0 || this.durationInput.value == NaN) {
			const errorMessage = 'Enter Positive Number !';
			const h3 = document.createElement('h3');
			h3.textContent = errorMessage;
			document.body.appendChild(h3);
			const interval = setInterval(() => {
				document.body.removeChild(h3);
				clearInterval(interval);
			}, 1500);

			return false;
		}
		return true;
	};
}
