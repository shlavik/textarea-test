<script lang="ts">
	import "../app.css";

	let { children } = $props();
</script>

<main class="flex min-h-screen items-center justify-center pl-2">
	{@render children()}
</main>
