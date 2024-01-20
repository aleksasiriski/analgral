import type { EvalFunction } from 'mathjs';

import { range, abs, round } from 'mathjs';

import {
	fOfX,
	partitionIntervalEvenly,
	partitionIntervalRandomly,
	choosePoints,
	generateIntervalsArray,
	generatePointsArray,
	calculateRiemannSum,
	calculateDefiniteIntegral
} from './calculate';

import { newPlot } from 'plotly';

export async function drawGraph(
	N: number,
	A: number,
	B: number,
	F: EvalFunction,
	Fdx: EvalFunction,
	evenly = true
) {
	try {
		// evaluate the expression repeatedly for different values of x
		const xValues = range(A, B + 0.5, 0.5).toArray();
		const yValues = xValues.map(function (x) {
			return fOfX(x, F);
		});

		const subIntervals = evenly
			? await partitionIntervalEvenly(N, A, B)
			: await partitionIntervalRandomly(N, A, B);
		const points = await choosePoints(subIntervals);

		const xValuesIntervals = await generateIntervalsArray(subIntervals);
		const yValuesIntervals = xValuesIntervals.map(function (x) {
			return 0;
		});

		const xValuesPoints = await generatePointsArray(points);
		const yValuesPoints = xValuesPoints.map(function (x) {
			return 0;
		});

		// render the plot using plotly
		const trace = {
			x: xValues,
			y: yValues,
			type: 'lines',
			fill: 'tonexty',
			name: 'F(x)',
			line: {
				color: 'rgb(213, 125, 61)'
			}
		};

		const traceIntervals = {
			x: xValuesIntervals,
			y: yValuesIntervals,
			type: 'lines',
			line: {
				color: 'rgb(61, 144, 213)'
			},
			name: 'Podintervali'
		};

		const tracePoints = {
			x: xValuesPoints,
			y: yValuesPoints,
			type: 'markers',
			marker: {
				color: 'rgb(219, 64, 82)',
				size: 12
			},
			line: {
				width: 0
			},
			name: 'Tačke'
		};

		const data = [trace, traceIntervals, tracePoints];
		const riemannSum = await calculateRiemannSum(points, F);
		const integral = await calculateDefiniteIntegral(A, B, Fdx);
		const delta = abs(riemannSum - integral);

		if (evenly) {
			let layout = {
				title: 'Ekvidistantni podintervali'
			};
			newPlot('plotEvenly', data, layout, { scrollZoom: true, displayModeBar: false });
			document.getElementById('integralEvenly').innerHTML =
				'Integral funkcije: ' + round(integral * 100000) / 100000;
			document.getElementById('riemannEvenly').innerHTML =
				'Rimanova suma: ' + round(riemannSum * 100000) / 100000;
			document.getElementById('deltaEvenly').innerHTML =
				'Greška Rimanove sume: ' + round(delta * 100000) / 100000;
		} else {
			let layout = {
				title: 'Nasumični podintervali'
			};
			newPlot('plotRandomly', data, layout, { scrollZoom: true, displayModeBar: false });
			document.getElementById('integralRandomly').innerHTML =
				'Integral funkcije: ' + round(integral * 100000) / 100000;
			document.getElementById('riemannRandomly').innerHTML =
				'Rimanova suma: ' + round(riemannSum * 100000) / 100000;
			document.getElementById('deltaRandomly').innerHTML =
				'Greška Rimanove sume: ' + round(delta * 100000) / 100000;
		}
	} catch (err) {
		console.error(err);
		alert(err);
	}
}
