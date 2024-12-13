<script lang="ts">
	import "../app.css";

	let { children } = $props();
</script>

<main
	class="ml-2 flex min-h-screen flex-col items-center justify-center text-secondary"
>
	{@render children()}
</main>
