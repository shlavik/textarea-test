<script lang="ts">
	import { autoResize } from "$lib/actions";
	import { chatStore, setPrompt, submit } from "$lib/stores.svelte";
	import type { Snippet } from "svelte";

	interface PromptAreaProps {
		height?: number;
		children?: Snippet;
		send?: Snippet;
	}

	let {
		height = $bindable(),
		children,
		send: sendPlace,
	}: PromptAreaProps = $props();

	function onkeydown(event: KeyboardEvent) {
		if (event.key !== "Enter" || event.shiftKey) return;
		event.preventDefault();
		if (!prompt) return;
		submit();
	}
</script>

<label
	class="pointer-events-auto relative flex flex-grow flex-col items-stretch justify-center gap-4 rounded-[30px] border border-white/10 bg-input-inactive p-6 pb-3 pr-3 shadow-lg shadow-primary focus-within:border-border-active focus-within:bg-input hover:bg-input"
	bind:clientHeight={height}
>
	<textarea
		class="h-full w-full resize-none overflow-y-hidden border-none bg-transparent text-sm text-gray-300 placeholder:text-gray-400 focus:outline-none"
		placeholder="Ask anything"
		value={chatStore.prompt}
		oninput={(e) => setPrompt(e.currentTarget.value)}
		{onkeydown}
		use:autoResize={{ maxRows: 7 }}
	></textarea>

	{#if children || sendPlace}
		<div class="flex flex-row">
			<div class="-ml-3 mr-4 flex flex-grow gap-2">
				{@render children?.()}
			</div>

			<div class="flex-shrink-0 gap-2">
				{@render sendPlace?.()}
			</div>
		</div>
	{/if}
</label>
