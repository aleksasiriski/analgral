import { random, type EvalFunction } from 'mathjs';

function randomNumber(A: number, B: number) {
	return random() * (B - A) + A;
}

export function fOfX(x: number, F: any) {
	return F.evaluate({ x: x });
}

type NumberPair = [number, number];

export async function partitionIntervalEvenly(N: number, A: number, B: number) {
	let sizeOfInterval = (B - A) / N;
	let nextInterval = A;
	let subIntervals: NumberPair[] = [];

	for (let i = 0; i < N - 1; i++) {
		var newIntervalLimit = nextInterval + sizeOfInterval;
		subIntervals.push([nextInterval, newIntervalLimit]);
		nextInterval = newIntervalLimit;
	}

	subIntervals.push([newIntervalLimit, B]);
	return subIntervals;
}

export async function partitionIntervalRandomly(N: number, A: number, B: number) {
	let nextInterval = A;
	let subIntervals: NumberPair[] = [];

	for (let i = 0; i < N - 1; i++) {
		var newIntervalLimit = randomNumber(nextInterval, B);
		subIntervals.push([nextInterval, newIntervalLimit]);
		nextInterval = newIntervalLimit;
	}

	subIntervals.push([newIntervalLimit, B]);
	return subIntervals;
}

export async function choosePoints(subIntervals: NumberPair[]) {
	let points: NumberPair[] = [];

	for (let i = 0; i < subIntervals.length - 1; i++) {
		let subInterval = subIntervals[i];
		let c = randomNumber(subInterval[0], subInterval[1]);
		let delta = subInterval[1] - subInterval[0];
		points.push([c, delta]);
	}

	return points;
}

export async function generateIntervalsArray(subIntervals: NumberPair[]) {
	let combined = [];

	for (let i = 0; i < subIntervals.length - 1; i++) {
		let subInterval = subIntervals[i];
		combined.push(subInterval[0]);
		combined.push(subInterval[1]);
	}

	let unique = combined
		.filter(function (elem, index, self) {
			return index === self.indexOf(elem);
		})
		.sort();

	return unique;
}

export async function generatePointsArray(points: NumberPair[]) {
	let combined = [];

	for (let i = 0; i < points.length - 1; i++) {
		let point = points[i];
		combined.push(point[0]);
	}

	let unique = combined
		.filter(function (elem, index, self) {
			return index === self.indexOf(elem);
		})
		.sort();

	return unique;
}

export async function calculateRiemannSum(points: NumberPair[], F: EvalFunction) {
	let sum = 0;

	for (let i = 0; i < points.length - 1; i++) {
		let point = points[i];
		sum += fOfX(point[0], F) * point[1];
	}

	return sum;
}

export async function calculateDefiniteIntegral(A: number, B: number, Fdx: any) {
	return Fdx.evaluate({ x: B }) - Fdx.evaluate({ x: A });
}
