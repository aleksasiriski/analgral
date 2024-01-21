<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { analyze } from '$lib/components/graph/analyze';

	export let drawer: boolean = false;

	const defaultN = 10;
	const defaultA = 0;
	const defaultB = 10;
	const defaultF = 'x^2';

	let valueN: number;
	let valueA: number;
	let valueB: number;
	let valueF: string;

	function submit() {
		console.log('Analyzing...');

		const N = valueN != null ? valueN : defaultN;
		const A = valueA != null ? valueA : defaultA;
		const B = valueB != null ? valueB : defaultB;
		const F = valueF != null ? valueF : defaultF;

		analyze(N, A, B, F);
	}
</script>

<form class="grid items-start gap-4 {drawer ? 'px-4' : ''}">
	<div class="grid gap-2">
		<Label for="N">Broj podintervala:</Label>
		<Input type="number" id="N" placeholder={defaultN.toString()} bind:value={valueN} />
	</div>
	<div class="grid gap-2">
		<Label for="A">Donja granica:</Label>
		<Input type="number" id="A" placeholder={defaultA.toString()} bind:value={valueA} />
	</div>
	<div class="grid gap-2">
		<Label for="B">Gornja granica:</Label>
		<Input type="number" id="B" placeholder={defaultB.toString()} bind:value={valueB} />
	</div>
	<div class="grid gap-2">
		<Label for="F">Funkcija za obrađivanje:</Label>
		<Input type="text" id="F" placeholder={defaultF} bind:value={valueF} />
	</div>
	<Button type="submit" on:click={() => submit()}>Generiši Grafove</Button>
</form>
