<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	// todo: convert to import like others are
	import Form from '$lib/components/ui/form/Form.svelte';
	import { Button } from '$lib/components/ui/button';
	import { mediaQuery } from 'svelte-legos';

	let open = false;
	const isDesktop = mediaQuery('(min-width: 768px)');
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
				<Form />
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
				<Form drawer={true} />
				<Drawer.Footer class="pt-2">
					<Drawer.Close asChild let:builder>
						<Button variant="outline" builders={[builder]}>Otkaži Izmene</Button>
					</Drawer.Close>
				</Drawer.Footer>
			</Drawer.Content>
		</Drawer.Root>
	{/if}
</div>
