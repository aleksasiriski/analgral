<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { mediaQuery } from 'svelte-legos';

	import { analyze } from '$lib/components/graph/analyze';

	let open = false;
	const isDesktop = mediaQuery('(min-width: 768px)');

	let dialogN: number;
	let dialogA: number;
	let dialogB: number;
	let dialogF: string;

	let drawerN: number;
	let drawerA: number;
	let drawerB: number;
	let drawerF: string;

	// ovako sam prvo napisao ali vrv ne ide ovako (pogledaj dole kako je povezano, nisam probao)?
	function submit() {
		
		console.log("Logged!");
		
		let N:number = dialogN != null ? dialogN : drawerN;
		let A:number = dialogA != null ? dialogA : drawerA;
		let B:number = dialogB != null ? dialogB : drawerB;
		let F:string = dialogF != null ? dialogF : drawerF;
		
		analyze(N, A, B, F);
		
	}
</script>

<div class="flex w-full items-center justify-center pt-1">
	{#if $isDesktop}
		<Dialog.Root bind:open>
			<Dialog.Trigger asChild let:builder>
				<Button variant="outline" builders={[builder]}>Opcije za generisanje grafova</Button>
			</Dialog.Trigger>
			<Dialog.Content class="sm:max-w-[425px]">
				<Dialog.Header>
					<Dialog.Title>Opcije za generisanje grafova</Dialog.Title>
					<Dialog.Description>
						Upišite varijable po kojima će da se generišu grafovi.
					</Dialog.Description>
				</Dialog.Header>
				<form class="grid items-start gap-4">
					<div class="grid gap-2">
						<Label for="N">Broj podintervala:</Label>
						<Input type="number" id="N" placeholder="10" bind:value="{ dialogN }" />
					</div>
					<div class="grid gap-2">
						<Label for="A">Donja granica:</Label>
						<Input type="number" id="A" placeholder="0" bind:value="{ dialogA }" />
					</div>
					<div class="grid gap-2">
						<Label for="B">Gornja granica:</Label>
						<Input type="number" id="B" placeholder="10" bind:value="{ dialogB }" />
					</div>
					<div class="grid gap-2">
						<Label for="F">Funkcija za obrađivanje:</Label>
						<Input type="text" id="F" placeholder="x^2" bind:value="{ dialogF }" />
					</div>
					<Button type="submit" on:click={() => submit()}>Generiši Grafove</Button>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	{:else}
		<Drawer.Root bind:open>
			<Drawer.Trigger asChild let:builder>
				<Button variant="outline" builders={[builder]}>Opcije za generisanje grafova</Button>
			</Drawer.Trigger>
			<Drawer.Content>
				<Drawer.Header class="text-left">
					<Drawer.Title>Opcije za generisanje grafova</Drawer.Title>
					<Drawer.Description>
						Upišite varijable po kojima će da se generišu grafovi.
					</Drawer.Description>
				</Drawer.Header>
				<form class="grid items-start gap-4 px-4">
					<div class="grid gap-2">
						<Label for="N">Broj podintervala:</Label>
						<Input type="number" id="N" placeholder="10" bind:value="{ drawerN }" />
					</div>
					<div class="grid gap-2">
						<Label for="A">Donja granica:</Label>
						<Input type="number" id="A" placeholder="0" bind:value="{ drawerA }" />
					</div>
					<div class="grid gap-2">
						<Label for="B">Gornja granica:</Label>
						<Input type="number" id="B" placeholder="10" bind:value="{ drawerB }" />
					</div>
					<div class="grid gap-2">
						<Label for="F">Funkcija za obrađivanje:</Label>
						<Input type="text" id="F" placeholder="x^2" bind:value="{ drawerF }" />
					</div>
					<Button type="submit" on:click={() => submit()}>Generiši Grafove</Button>
				</form>
				<Drawer.Footer class="pt-2">
					<Drawer.Close asChild let:builder>
						<Button variant="outline" builders={[builder]}>Otkaži Izmene</Button>
					</Drawer.Close>
				</Drawer.Footer>
			</Drawer.Content>
		</Drawer.Root>
	{/if}
</div>
