<script lang="ts">
	import { log } from "$lib/stores";

	$effect(() => {
		console.log($log);
	});
</script>

{#each $log as { text }}
	<div class="text-right">
		<div
			class="inline-block max-w-xs rounded-lg bg-blue-500 px-4 py-2 text-white"
		>
			{text}
		</div>
	</div>

	<div class="text-left">
		<div
			class="inline-block max-w-xs rounded-lg bg-gray-200 px-4 py-2 text-gray-800"
		>
			Hello! How can I assist you today?
		</div>
	</div>
{/each}
