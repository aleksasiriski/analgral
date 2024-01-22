<script>
	import '../app.pcss';

	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
</script>

<header><Header /></header>
<slot />
<footer><Footer /></footer>