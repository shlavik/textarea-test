<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		text?: string;
		disabled?: boolean;
		onclick?: (event: MouseEvent) => void;
		children?: Snippet;
	}

	let { text, disabled = false, onclick, children }: Props = $props();

	function handleClick(event: MouseEvent) {
		if (!disabled) onclick?.(event);
	}
</script>

<button
	{disabled}
	class="flex h-10 items-center justify-center text-pretty rounded-full bg-button-light px-5 py-2 transition-colors hover:bg-secondary"
	class:cursor-not-allowed={disabled}
	class:opacity-50={disabled}
	onclick={handleClick}
>
	{@render children?.()}

	{#if text}<span class="pl-2">{text}</span>{/if}
</button>
