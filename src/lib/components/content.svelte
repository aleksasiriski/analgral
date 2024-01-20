<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
</script>

<div class="flex items-center justify-center">
	<Carousel.Root class="w-full max-w-[98dvw] sm:max-w-[85dvw]">
		<Carousel.Content>
			<Carousel.Item>
				<div class="p-1">
					<Card.Root class="h-[83dvh] w-[100%]">
						<Card.Content class="flex flex-col h-[96%] items-center justify-center p-6">
							<span class="text-4xl font-semibold mb-5">Ekvidistantni Podintervali</span>
							<div id="plotEvenly"></div>
							<span id="integralEvenly"></span>
        					<span id="riemannEvenly"></span>
        					<span id="deltaEvenly"></span>
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
							<span class="text-4xl font-semibold mb-5">Nasumični Podintervali</span>
							<div id="plotRandomly"></div>
							<span id="integralRandomly"></span>
        					<span id="riemannRandomly"></span>
        					<span id="deltaRandomly"></span>
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