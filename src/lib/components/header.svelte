<script type="js">
    import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { mediaQuery } from 'svelte-legos';
	let open = false;
	const isDesktop = mediaQuery('(min-width: 768px)');

    // ovako sam prvo napisao ali vrv ne ide ovako (pogledaj dole kako je povezano, nisam probao)?
    function submit() {
        // analyze();
        // analyze() i originalni kod su privremeno u static-u
    }
</script>

<div class="w-full flex items-center justify-center pt-1">
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
					<Label for="N">Broj podintervala: </Label>
					<Input type="number" id="N" value=10 />
				</div>
				<div class="grid gap-2">
					<Label for="A">Donja granica:</Label>
					<Input type="number" id="A" value=0 />
				</div>
                <div class="grid gap-2">
					<Label for="B">Gornja granica:</Label>
					<Input type="number" id="B" value=10 />
				</div>
                <div class="grid gap-2">
					<Label for="F">Funkcija za obrađivanje:</Label>
					<Input type="text" id="F" value="x^2" />
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
					<Label for="N">Broj podintervala: </Label>
					<Input type="number" id="N" value=10 />
				</div>
				<div class="grid gap-2">
					<Label for="A">Donja granica:</Label>
					<Input type="number" id="A" value=0 />
				</div>
                <div class="grid gap-2">
					<Label for="B">Gornja granica:</Label>
					<Input type="number" id="B" value=10 />
				</div>
                <div class="grid gap-2">
					<Label for="F">Funkcija za obrađivanje:</Label>
					<Input type="text" id="F" value="x^2" />
				</div>
				<Button type="submit" on:click={() => submit()} >Generiši Grafove</Button>
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