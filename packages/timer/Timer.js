// [How to use]::
//
// timer.wait({
// 	time: 5000,
// 	onComplete: ()=> {
// 		console.log('hello');
// 	}
// });
//
// timer.chain([
// 	{
// 		time: 5000,
// 		onComplete: () => {
// 			console.log(1);
// 		}
// 	},
// 	{
// 		time: 2000,
// 		onComplete: () => {
// 			console.log(2);
// 		}
// 	},
// 	{
// 		time: 2000,
// 		onComplete: () => {
// 			console.log(3);
// 		}
// 	}
// ]);

/**
 * @type {FTimer}
 */
export function Timer() {
	/**
	 * @type {TTimeouts}
	 */
	const timeouts = {};

	/**
	 * @type {TChainedTimeouts}
	 */
	const chainedTimeouts = {};

	let totalTimeoutsUID = 0;
	let totalCTimeoutsUID = 0;
	let paused = false;

	function update() {
		paused = false;
		updateTimeouts();
		updateChainedTimeouts();
	}

	function updateTimeouts() {
		for (let i in timeouts) {
			const t = timeouts[i];
			const currentTime = Date.now();
			const elapsed = currentTime - t.startTime;

			if (t.onStart) t.onStart();

			if (elapsed >= t.time) {
				killWait(Number(i));
				t.onComplete();
			}
		}
	}

	function updateChainedTimeouts() {
		for (let i in chainedTimeouts) {
			const timers = chainedTimeouts[i];

			Object.values(timers).forEach(t => {
				if (t.ended) {
					return;
				}

				const currentTime = Date.now();
				const elapsed = currentTime - t.startTime;

				if (t.onStart) t.onStart();

				if (elapsed >= t.time) {
					t.onComplete();
					t.ended = true;
				}
			});

			const hasEnded = Object.values(timers).every(v => v.ended);

			if (hasEnded) killChain(Number(i));
		}
	}

	/**
	 * @param {number} time
	 * @returns {void}
	 */
	function pause(time) {
		if (paused) {
			updatePausedTimeouts(time);
			updatePausedChainedTimeouts(time);
			return;
		}

		paused = true;

		pauseTimeouts();
		pauseChainedTimeouts();
	}

	/**
	 * @param {number} time
	 * @returns {void}
	 */
	function updatePausedTimeouts(time) {
		for (let i in timeouts) {
			const t = timeouts[i];
			t.startTime = time;
		}
	}	

	/**
	 * @param {number} time
	 * @returns {void}
	 */
	function updatePausedChainedTimeouts(time) {
		for (let i in chainedTimeouts) {
			const timers = chainedTimeouts[i];

			Object.values(timers).forEach(t => {
				if (t.ended) {
					return;
				}
				t.startTime = time;
			});
		}
	}

	function pauseTimeouts() {
		for (let i in timeouts) {
			const t = timeouts[i];
			const elapsed = Date.now() - t.startTime;
			let dt = t.time;
			dt -= elapsed;
			t.time = dt;
		}

		// console.log('pause: timeouts', JSON.stringify(timeouts));
	}

	function pauseChainedTimeouts() {
		for (let i in chainedTimeouts) {
			const timers = chainedTimeouts[i];

			Object.values(timers).forEach(t => {
				if (t.ended) {
					return;
				}
				const elapsed = Date.now() - t.startTime;
				let dt = t.time;
				dt -= elapsed;
				t.time = dt;
			});
		}

		// console.log('pause: chainedTimeouts', JSON.stringify(chainedTimeouts));
	}

	/**
	 * @type {FTimerWait}
	 */
	function wait(options) {
		totalTimeoutsUID +=1;

		if (timeouts[totalTimeoutsUID]) {
			return;
		}

		timeouts[totalTimeoutsUID] = {
			startTime: Date.now(),
			time: options.time,
			onStart: options.onStart,
			onComplete: options.onComplete
		};

		// console.log('create timer->wait:', JSON.stringify(timeouts));
		return totalTimeoutsUID;
	}

	/**
	 * @type {FTimerChain}
	 */
	function chain(timers) {
		totalCTimeoutsUID +=1;

		if (chainedTimeouts[totalCTimeoutsUID]) {
			return;
		}

		chainedTimeouts[totalCTimeoutsUID] = {};

		timers.forEach((props, i) => {
			const time = timers
				.filter((_, _i) => _i <= i)
				.reduce((n, {time}) => n + time, 0);

			chainedTimeouts[totalCTimeoutsUID][i] = {
				startTime: Date.now(),
				time,
				onStart: props.onStart,
				onComplete: props.onComplete
			};
		});

		// console.log('create timer->chain:', JSON.stringify(chainedTimeouts));
		return totalCTimeoutsUID;
	}

	/**
	 * @type {FKillTime}
	 */
	function killWait(id) {
		if (timeouts[id]) {
			delete timeouts[id];
			return;
		}
	}

	/**
	 * @type {FKillTime}
	 */
	function killChain(id) {
		if (chainedTimeouts[id]) {
			removeChainedTimeouts(id);
			return;
		}
	}

	/**
	 * @param {number} key
	 */
	function removeChainedTimeouts(key) {
		const timers = chainedTimeouts[key]; 
		for (let _id in timers) {
			delete timers[_id];
		}
		delete chainedTimeouts[key];
	}

	function kill() {
		for (let t in timeouts) {
			delete timeouts[t];
		} 

		for (let t in chainedTimeouts) {
			removeChainedTimeouts(Number(t));
		}
	}

	return {
		wait,
		chain,
		kill,
		killWait,
		killChain,
		update,
		pause
	};
}
