import { integrate } from 'nerdamer';
import { compile } from 'mathjs';
import { drawGraph } from './draw';

export async function analyze(N: number, A: number, B: number, FStr: string) {
	// caclulate fdxStr
	const fdxStr = integrate(FStr, 'x').toString();

	// print f and fdx
	console.log('f: ' + FStr + ' => fdx: ' + fdxStr);

	// compile the expression once
	const F = compile(FStr);
	const Fdx = compile(fdxStr);

	await drawGraph(N, A, B, F, Fdx, true);
	await drawGraph(N, A, B, F, Fdx, false);
}
