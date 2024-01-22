<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	
	import { onMount } from 'svelte';
	import { analyze } from '$lib/components/graph/analyze';

	onMount(() => {
		analyze(10, 0, 10, 'sec(x)^2');
	});
</script>

<div class="flex items-center justify-center">
	<Carousel.Root class="w-full max-w-[98dvw] sm:max-w-[85dvw]">
		<Carousel.Content>
			<Carousel.Item>
				<div class="p-1">
					<Card.Root class="h-[83dvh] w-[100%]">
						<Card.Content class="flex flex-col h-[96%] items-center justify-center p-6">
							<!--<span class="text-4xl font-semibold mb-5">Ekvidistantni Podintervali</span>-->
							<div class="w-[70%]" id="plotEvenly"></div>
							<div class="h-[10%] flex flex-col items-center gap-1 select-none">
								<span id="integralEvenly"></span>
								<span id="riemannEvenly"></span>
								<span id="deltaEvenly"></span>
							</div>
						</Card.Content>
						<Card.Footer class="flex h-[4%] items-center justify-center sm:hidden">
							<span class="text-xs text-balance">prevlačenjem menjate tip grafa</span>
						</Card.Footer>
					</Card.Root>
				</div>
			</Carousel.Item>
			<Carousel.Item>
				<div class="p-1">
					<Card.Root class="h-[83dvh] w-[100%]">
						<Card.Content class="flex flex-col h-[96%] items-center justify-center p-6">
							<!--<span class="text-4xl font-semibold mb-5">Nasumični Podintervali</span>-->
							<div class="w-[80%]" id="plotRandomly"></div>
							<div class="h-[10%] flex flex-col items-center gap-1 select-none">
								<span id="integralRandomly"></span>
								<span id="riemannRandomly"></span>
								<span id="deltaRandomly"></span>	
							</div>
						</Card.Content>
						<Card.Footer class="flex h-[4%] items-center justify-center sm:hidden">
							<span class="text-xs text-balance">prevlačenjem menjate tip grafa</span>
						</Card.Footer>
					</Card.Root>
				</div>
			</Carousel.Item>
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>	
</div>