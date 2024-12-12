<script lang="ts">
	import { autoresize } from "$lib/actions";
	import { prompt } from "$lib/stores";
	import type { Snippet } from "svelte";

	interface PromptAreaProps {
		onkeydown?: (event: KeyboardEvent) => void;
		height?: number;
		children?: Snippet;
		send?: Snippet;
	}

	let {
		height = $bindable(),
		onkeydown,
		children,
		send,
	}: PromptAreaProps = $props();

	let value: string = $state("");

	export function clear() {
		value = "";
	}

	$effect(() => prompt.set(value));
</script>

<label
	class="pointer-events-auto relative flex flex-grow flex-col items-stretch justify-center gap-4 rounded-[30px] border border-white/10 bg-input-inactive p-6 pb-3 pr-3 shadow-lg shadow-primary focus-within:border-border-active focus-within:bg-input hover:bg-input"
	bind:clientHeight={height}
>
	<textarea
		class="h-full w-full resize-none overflow-y-hidden border-none bg-transparent text-sm text-gray-300 placeholder:text-gray-400 focus:outline-none"
		placeholder="Ask anything"
		{onkeydown}
		use:autoresize={{ maxRows: 7 }}
		bind:value
	></textarea>

	{#if children || send}
		<div class="flex flex-row">
			<div class="flex flex-grow">
				{@render children?.()}
			</div>

			<div class="flex-shrink-0">
				{@render send?.()}
			</div>
		</div>
	{/if}
</label>
