const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const durationInput = document.querySelector('#duration');

const circle = document.querySelector('circle');
const perimeter = circle.getAttribute('r') * Math.PI * 2;

circle.setAttribute('stroke-dasharray', perimeter);
let duration;
const time = new Timer(startBtn, pauseBtn, durationInput, {
	onStart(tottalDuration) {
		duration = tottalDuration;
	},
	onTick(timeRemaining) {
		circle.getAttribute('stroke-dashoffset') - 1;
		circle.setAttribute('stroke-dashoffset', perimeter * timeRemaining / duration - perimeter);
	},
	onComplete() {
		console.log('timer completed');
	}
});
