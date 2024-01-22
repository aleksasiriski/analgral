// CommonJS import
import nerdamer from 'nerdamer';
import 'nerdamer/Algebra';
import 'nerdamer/Calculus';
import 'nerdamer/Solve';
import 'nerdamer/Extra';

// ES import
import { compile } from 'mathjs';
import { drawGraph } from '$lib/components/graph/draw';

export async function analyze(N: number, A: number, B: number, FStr: string) {
	// caclulate fdxStr
	const nerdFdx = nerdamer('integrate(' + FStr + ', x)');
	const fdxStr = nerdFdx.toString();

	// print f and fdx
	console.log(`f: ${FStr} => fdx: ${fdxStr}`);

	// compile the expression once
	const F = compile(FStr);
	const Fdx = compile(fdxStr);

	// draw the graphs
	const graphsPromises: Promise<void>[] = [];
	graphsPromises.push(drawGraph(N, A, B, F, Fdx, true));
	graphsPromises.push(drawGraph(N, A, B, F, Fdx, false));
	await Promise.all(graphsPromises);
}
